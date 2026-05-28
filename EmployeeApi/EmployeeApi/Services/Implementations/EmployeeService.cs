using EmployeeApi.Constants;
using EmployeeApi.Data;
using EmployeeApi.Modals;
using EmployeeApi.Modals.EmployeeApi.Modals;
using EmployeeApi.Services.Interfaces;

namespace EmployeeApi.Services.Implementations
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IUnitOfWork _unitOfWork;

        public EmployeeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // =========================
        // GET EMPLOYEES
        // =========================
        public async Task<GetEmployeeResponseDto> GetEmployeesAsync(GetEmployeeRequestDto request)
        {
            var result = await _unitOfWork.ExecuteProcedureAsync<GetEmployeeResponseDto>(
                        SPConstants.GetEmployees,
                        new
                        {
                            p_employeeid = request.EmployeeId,
                        },
                        outParamCount: 3,
                        hasResultSet: true
                    );

            return result.Data ?? new GetEmployeeResponseDto();
        }

        // =========================
        // MASTER
        // =========================
        public async Task<MasterInfoResponseDto<T>> GetMasterAsync<T>(string module, int? id)
        {
            var result = await _unitOfWork.ExecuteFunctionAsync<MasterInfoResponseDto<T>>(
                        SPConstants.GetMasterInfo,
                        new
                        {
                            p_module = module,
                            p_id = id
                        }
                    );

            return result;
        }

        // =========================
        // SAVE EMPLOYEE
        // =========================
        public async Task<BaseResponse> SaveEmployeeAsync(SaveEmployeeRequestDto request)
        {
            return await _unitOfWork.ExecuteNonQueryAsync(
                SPConstants.InsertEmployee,
                new
                {
                    p_employeename = request.EmployeeName,
                    p_email = request.Email,
                    p_departmentid = request.DepartmentId,
                    p_designationid = request.DesignationId,
                    p_salary = request.Salary
                }
            );
        }

        // =========================
        // UPDATE EMPLOYEE
        // =========================
        public async Task<BaseResponse> UpdateEmployeeAsync(UpdateEmployeeRequestDto request)
        {
            return await _unitOfWork.ExecuteNonQueryAsync(
                SPConstants.UpdateEmployee,
                new
                {
                    p_employeeid = request.EmployeeId,
                    p_employeename = request.EmployeeName,
                    p_email = request.Email,
                    p_departmentid = request.DepartmentId,
                    p_designationid = request.DesignationId,
                    p_salary = request.Salary
                }
            );
        }

        // =========================
        // DELETE EMPLOYEE
        // =========================
        public async Task<BaseResponse> DeleteEmployeeAsync(int employeeId)
        {
            return await _unitOfWork.ExecuteNonQueryAsync(
                SPConstants.DeleteEmployee,
                new
                {
                    p_employeeid = employeeId
                }
            );
        }
    }
}