import axiosInstance from "./axiosInstance";

// =========================
// COMMON API RESPONSE
// =========================
export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T;
}

// =========================
// GET
// =========================
export const getRequest = async <T>(
    url: string,
    params?: any
): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.get<ApiResponse<T>>(url, { params, });
    return response.data;
};

// =========================
// POST
// =========================
export const postRequest = async <T, B>(
    url: string,
    body?: B
): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.post<ApiResponse<T>>(url, body);
    return response.data;
};

// =========================
// PUT
// =========================
export const putRequest = async <T, B>(
    url: string,
    body?: B
): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.put<ApiResponse<T>>(url, body);
    return response.data;
};

// =========================
// DELETE
// =========================
export const deleteRequest = async <T>(
    url: string
): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.delete<ApiResponse<T>>(url);
    return response.data;
};