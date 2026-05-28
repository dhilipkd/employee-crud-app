using EmployeeApi.Modals;

namespace EmployeeApi.Data
{
    public interface IUnitOfWork
    {
        Task<CommonResponseDto<T>> ExecuteProcedureAsync<T>(
            string spName,
            object parameters,
            int outParamCount = 0,
            bool hasResultSet = true
        );

        Task<T> ExecuteFunctionAsync<T>(
            string functionName,
            object parameters
        );
    }
}