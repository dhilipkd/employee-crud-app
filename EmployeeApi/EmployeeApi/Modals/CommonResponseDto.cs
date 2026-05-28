namespace EmployeeApi.Modals
{
    public class CommonResponseDto<T>
    {
        public int Status { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
    }

    public class BaseResponse
    {
        public int Status { get; set; }
        public string Message { get; set; } = "";
    }
}
