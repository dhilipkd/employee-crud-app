using EmployeeApi.Modals;
using EmployeeApi.Modals.EmployeeApi.Modals;
using EmployeeApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApi.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : BaseController
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost("GetEmployeeDetails")]
        public async Task<IActionResult> GetEmployeeDetails([FromBody] GetEmployeeRequestDto request)
        {
            var result = await _employeeService.GetEmployeesAsync(request);
            return GetResponse(result);
        }

        [HttpGet("master/{module}/{id?}")]
        public async Task<IActionResult> GetMaster(string module, int? id)
        {
            var result = await _employeeService.GetMasterAsync<object>(module, id);
            return GetResponse(result);
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveEmployee([FromBody] SaveEmployeeRequestDto request)
        {
            var result = await _employeeService.SaveEmployeeAsync(request);
            return CreatedResponse(result);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateEmployee([FromBody] UpdateEmployeeRequestDto request)
        {
            var result = await _employeeService.UpdateEmployeeAsync(request);
            return UpdatedResponse(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var result = await _employeeService.DeleteEmployeeAsync(id);
            return Ok(result);
        }
    }
}