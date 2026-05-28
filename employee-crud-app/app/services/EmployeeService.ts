import { GetEmployeeRequestDto, GetEmployeeResponseDto, SaveEmployeeRequestDto, UpdateEmployeeRequestDto, MasterInfoResponseDto, MasterItemDto, ApiResponse } from "../types/EmployeeDto";

import { getRequest, postRequest, putRequest,deleteRequest } from "./baseService";


// =========================
// GET EMPLOYEES
// =========================
export const getEmployeeDetails = async (
    payload: GetEmployeeRequestDto
) => {

    const res = await postRequest<GetEmployeeResponseDto, GetEmployeeRequestDto>(
        `/Employee/GetEmployeeDetails`,
        payload
    );
    return res.data;
};


// =========================
// GET MASTER
// =========================
export async function getEmployeeMasters(
    module: string,
    id?: number
) {

    const url = id
        ? `/Employee/master/${module.toUpperCase()}/${id}`
        : `/Employee/master/${module.toUpperCase()}`;

    const res = await getRequest<MasterInfoResponseDto<MasterItemDto>>(url);
    return res.data;
}

// =========================
// SAVE EMPLOYEE
// =========================
export const saveEmployee = async (
    payload: SaveEmployeeRequestDto
) => {
    const res = await postRequest<ApiResponse<null>, SaveEmployeeRequestDto>(
        `/Employee/save`,
        payload
    );
    return res.data;
};

// =========================
// UPDATE EMPLOYEE
// =========================
export const updateEmployee = async (
    payload: UpdateEmployeeRequestDto
) => {
    const res = await putRequest<ApiResponse<null>, UpdateEmployeeRequestDto>(
        `/Employee/update`,
        payload
    );
    return res.data;
}

// =========================
// DELETE EMPLOYEE
// =========================
export const deleteEmployee = async (id: number) => {
    const res = await deleteRequest<any>(
        `/Employee/delete/${id}`
    );
    return res.data;
};