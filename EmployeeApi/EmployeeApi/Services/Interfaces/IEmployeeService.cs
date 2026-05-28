using EmployeeApi.Modals;

namespace EmployeeApi.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<GetEmployeeResponseDto> GetEmployeesAsync(GetEmployeeRequestDto request);
        Task<MasterInfoResponseDto<T>> GetMasterAsync<T>(string module, int? id);
    }
}
