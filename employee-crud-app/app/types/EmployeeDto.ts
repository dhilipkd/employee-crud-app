export interface GetEmployeeRequestDto {
    employeeId?: number | null;
}

export interface EmployeeListDto {
    employeeId: number;
    employeeName: string;
    email: string;
    departmentId: number;
    departmentName: string;
    designationId: number;
    designationName: string;
    salary: number;
}

export interface GetEmployeeResponseDto {
    employees: EmployeeListDto[];
}

export interface MasterItemDto {
    id: number;
    name: string;
    departmentId?: number;
}

export interface MasterInfoResponseDto<T> {
    status: boolean;
    message: string;
    data: T[];
}