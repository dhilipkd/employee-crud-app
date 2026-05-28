import { GetEmployeeRequestDto, GetEmployeeResponseDto, MasterInfoResponseDto, MasterItemDto } from "../types/EmployeeDto";

import { getRequest, postRequest } from "./baseService";


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