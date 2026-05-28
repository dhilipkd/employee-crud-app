using Dapper;
using Npgsql;
using System.Data;
using System.Text.Json;
using EmployeeApi.Modals;

namespace EmployeeApi.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public UnitOfWork(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString =
                _configuration.GetConnectionString("DefaultConnection")!;
        }

        // =====================================
        // PROCEDURE
        // =====================================
        public async Task<CommonResponseDto<T>> ExecuteProcedureAsync<T>(
            string spName,
            object parameters,
            int outParamCount = 0,
            bool hasResultSet = true
        )
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            var dynamicParams = new DynamicParameters(parameters);

            // OUT PARAMETERS
            dynamicParams.Add("status", dbType: DbType.Int32, direction: ParameterDirection.Output);
            dynamicParams.Add("message", dbType: DbType.String, size: 500, direction: ParameterDirection.Output);
            dynamicParams.Add("resultset", dbType: DbType.String, direction: ParameterDirection.Output);

            await connection.ExecuteAsync(
                spName,
                dynamicParams,
                commandType: CommandType.StoredProcedure
            );

            var status = dynamicParams.Get<int>("status");
            var message = dynamicParams.Get<string>("message");
            var json = dynamicParams.Get<string>("resultset");

            T? data = default;

            if (!string.IsNullOrWhiteSpace(json))
            {
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                if (json.TrimStart().StartsWith("["))
                {
                    var list = JsonSerializer.Deserialize<List<EmployeeListDto>>(json, options);

                    var wrapper = new GetEmployeeResponseDto
                    {
                        Employees = list ?? new List<EmployeeListDto>()
                    };

                    data = (T)(object)wrapper;
                }
                else
                {
                    data = JsonSerializer.Deserialize<T>(json, options);
                }
            }

            return new CommonResponseDto<T>
            {
                Status = status,
                Message = message,
                Data = data
            };
        }

        public async Task<BaseResponse> ExecuteNonQueryAsync(
            string spName,
            object parameters
        )
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            var dynamicParams = new DynamicParameters(parameters);

            dynamicParams.Add("status", dbType: DbType.Int32, direction: ParameterDirection.Output);
            dynamicParams.Add("message", dbType: DbType.String, size: 500, direction: ParameterDirection.Output);

            await connection.ExecuteAsync(
                spName,
                dynamicParams,
                commandType: CommandType.StoredProcedure
            );

            return new BaseResponse
            {
                Status = dynamicParams.Get<int>("status"),
                Message = dynamicParams.Get<string>("message")
            };
        }

        // =====================================
        // FUNCTION
        // =====================================
        public async Task<T> ExecuteFunctionAsync<T>(
            string functionName,
            object parameters
        )
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = $"SELECT {functionName}(@p_module, @p_id)";

            var json = await connection.ExecuteScalarAsync<string>(query, parameters);

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            return JsonSerializer.Deserialize<T>(json ?? "{}", options)!;
        }
    }
}