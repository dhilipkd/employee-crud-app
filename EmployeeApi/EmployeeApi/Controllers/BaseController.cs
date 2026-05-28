using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using EmployeeApi.Modals;

namespace EmployeeApi.Controllers
{
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        protected IActionResult GetResponse(object? data, string message = "Success")
        {
            return Ok(new ApiResponse<object?>
            {
                Status = true,
                Message = message,
                Data = data
            });
        }

        protected IActionResult CreatedResponse(object? data = null, string message = "Created successfully")
        {
            return StatusCode(201, new ApiResponse<object?>
            {
                Status = true,
                Message = message,
                Data = data
            });
        }

        protected IActionResult UpdatedResponse(object? data = null, string message = "Updated successfully")
        {
            return Ok(new ApiResponse<object?>
            {
                Status = true,
                Message = message,
                Data = data
            });
        }

        protected IActionResult DeletedResponse(string message = "Deleted successfully")
        {
            return Ok(new ApiResponse<object?>
            {
                Status = true,
                Message = message
            });
        }

        protected IActionResult NotFoundResponse(string message = "Not found")
        {
            return NotFound(new ApiResponse<object?>
            {
                Status = false,
                Message = message
            });
        }

        protected IActionResult Error(string message)
        {
            return BadRequest(new ApiResponse<object?>
            {
                Status = false,
                Message = message
            });
        }
    }
}