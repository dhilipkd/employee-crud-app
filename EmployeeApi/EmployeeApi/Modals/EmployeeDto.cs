namespace EmployeeApi.Modals
{
    public class GetEmployeeRequestDto
    {
        public int? EmployeeId { get; set; }
    }

    public class GetEmployeeResponseDto
    {
        public List<EmployeeListDto> Employees { get; set; } = new();
    }

    public class EmployeeListDto
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public int DesignationId { get; set; }
        public string DesignationName { get; set; } = string.Empty;
        public decimal Salary { get; set; }
    }


    public class MasterItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? DepartmentId { get; set; }
    }

    public class MasterInfoResponseDto<T>
    {
        public bool Status { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<T> Data { get; set; }
    }

    // COMMON API RESPONSE
    public class ApiResponse<T>
    {
        public bool Status { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
    }
}
