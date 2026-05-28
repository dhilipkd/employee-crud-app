"use client";

import { useEffect, useState } from "react";

import TDataTable from "../components/TDataTable";
import TOffCanvas from "../components/TOffCanvas";
import EmployeeForm from "../components/employee/EmployeeForm";
import { ConfirmDialog } from "primereact/confirmdialog";

import "../styles/employee.css";

import {
    getEmployeeDetails,
    getEmployeeMasters,
    saveEmployee,
    updateEmployee,
    deleteEmployee
} from "../services/EmployeeService";

export default function EmployeePage() {

    // =========================
    // STATE
    // =========================
    const [showSidebar, setShowSidebar] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [departmentOptions, setDepartmentOptions] = useState<any[]>([]);
    const [designationOptions, setDesignationOptions] = useState<any[]>([]);

    const [form, setForm] = useState({
        employeeId: 0,
        employeeName: "",
        email: "",
        departmentId: 0,
        designationId: 0,
        salary: "",
    });

    // =========================
    // LOAD EMPLOYEES
    // =========================
    const loadEmployees = async () => {

        const response: any = await getEmployeeDetails({
            employeeId: undefined
        });

        const employeeList = response?.employees || [];

        const formatted = employeeList.map((x: any) => ({
            employeeId: x.employeeId,
            Employee_Name: x.employeeName,
            Email: x.email,
            Department: x.departmentName,
            Designation: x.designationName,
            Salary: x.salary
        }));

        setEmployees(formatted);
    };

    // =========================
    // LOAD MASTER DATA
    // =========================
    const loadDepartments = async () => {

        const res = await getEmployeeMasters("Department");

        const formatted = (res?.data || []).map((x: any) => ({
            label: x.name,
            value: x.id
        }));

        setDepartmentOptions(formatted);
    };

    // =========================
    // LOAD DESIGNATION BASED ON DEPARTMENT
    // =========================
    const handleDepartmentChange = async (deptId: any) => {

        setForm((prev) => ({
            ...prev,
            departmentId: deptId,
            designationId: 0
        }));

        const res = await getEmployeeMasters("Designation", deptId);

        const formatted = (res?.data || []).map((x: any) => ({
            label: x.name,
            value: x.id
        }));

        setDesignationOptions(formatted);
    };

    // =========================
    // LOAD ALL INITIAL DATA
    // =========================
    useEffect(() => {
        loadEmployees();
        loadDepartments();
    }, []);

    // =========================
    // ADD NEW
    // =========================
    const handleAdd = () => {
        setForm({
            employeeId: 0,
            employeeName: "",
            email: "",
            departmentId: 0,
            designationId: 0,
            salary: "",
        });

        setDesignationOptions([]);
        setShowSidebar(true);
    };

    // =========================
    // EDIT
    // =========================
    const handleEdit = async (row: any) => {

        const response: any = await getEmployeeDetails({
            employeeId: row.employeeId
        });

        const emp = response?.employees?.[0];
        if (!emp) return;

        // load designations for selected department
        const desRes = await getEmployeeMasters("Designation", emp.departmentId);

        const formattedDes = (desRes?.data || []).map((x: any) => ({
            label: x.name,
            value: x.id
        }));

        setDesignationOptions(formattedDes);

        setForm({
            employeeId: emp.employeeId,
            employeeName: emp.employeeName,
            email: emp.email,
            departmentId: emp.departmentId,
            designationId: emp.designationId,
            salary: emp.salary
        });

        setShowSidebar(true);
    };

    // =========================
    // DELETE (LOCAL UI ONLY)
    // =========================
    const handleDelete = async (row: any) => {
        await deleteEmployee(row.employeeId);
        await loadEmployees();
    };

    // =========================
    // SAVE / UPDATE (AUTO DETECT)
    // =========================
    const handleSave = async () => {

        const payload = {
            employeeName: form.employeeName,
            email: form.email,
            departmentId: Number(form.departmentId),
            designationId: Number(form.designationId),
            salary: Number(form.salary)
        };

        if (form.employeeId > 0) {

            await updateEmployee({
                employeeId: form.employeeId,
                ...payload
            });

        } else {

            await saveEmployee(payload);
        }

        setShowSidebar(false);
        await loadEmployees();

        // reset form
        setForm({
            employeeId: 0,
            employeeName: "",
            email: "",
            departmentId: 0,
            designationId: 0,
            salary: "",
        });
    };

    // =========================
    // UI
    // =========================
    return (
        <div className="p-5">

            <h2 className="text-2xl font-semibold mb-4">
                Employee Management
            </h2>

            <TDataTable
                value={employees}
                dataKey="employeeId"
                excludedFields={["employeeId"]}
                showAdd={true}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <TOffCanvas
                visible={showSidebar}
                onHide={() => setShowSidebar(false)}
                header={form.employeeId ? "Edit Employee" : "Add Employee"}
                primaryLabel={form.employeeId ? "Update" : "Save"}
                primaryAction={handleSave}
            >
                <EmployeeForm
                    form={form}
                    setForm={setForm}
                    departmentOptions={departmentOptions}
                    designationOptions={designationOptions}
                    onDepartmentChange={handleDepartmentChange}
                />
            </TOffCanvas>

            <ConfirmDialog />

        </div>
    );
}