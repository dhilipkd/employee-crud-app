using EmployeeApi.Modals;
using EmployeeApi.Modals.EmployeeApi.Modals;

namespace EmployeeApi.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<GetEmployeeResponseDto> GetEmployeesAsync(GetEmployeeRequestDto request);
        Task<MasterInfoResponseDto<T>> GetMasterAsync<T>(string module, int? id);
        Task<BaseResponse> SaveEmployeeAsync(SaveEmployeeRequestDto request);
        Task<BaseResponse> UpdateEmployeeAsync(UpdateEmployeeRequestDto request);
        Task<BaseResponse> DeleteEmployeeAsync(int employeeId);
    }
}
