"use client";

import { useEffect, useState } from "react";

import TDataTable from "../components/TDataTable";
import TOffCanvas from "../components/TOffCanvas";

import EmployeeForm from "../components/employee/EmployeeForm";

import "../styles/employee.css";

import { getEmployeeDetails, getEmployeeMasters } from "../services/EmployeeService";

export default function EmployeePage() {

    const [showSidebar, setShowSidebar] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [departmentOptions, setDepartmentOptions] = useState<any[]>([]);
    const [designationOptions, setDesignationOptions] = useState<any[]>([]);

    const [form, setForm] = useState({
        employeeId: 0,
        employeeName: "",
        email: "",
        departmentId: "",
        designationId: "",
        salary: "",
    });

    // =========================
    // LOAD EMPLOYEES
    // =========================
    const loadEmployees = async () => {

        const response: any =
            await getEmployeeDetails({
                employeeId: undefined
            });
        console.log("FULL RESPONSE:", response);

        const employeeList =
            response?.employees || [];

        const formatted =
            employeeList.map((x: any) => ({
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
    // LOAD DROPDOWNS
    // =========================
    const loadDropdowns = async () => {

        const [
            departmentRes,
            designationRes
        ] = await Promise.all([
            getEmployeeMasters("Department"),
            getEmployeeMasters("Designation")
        ]);

        console.log("departmentRes:", departmentRes);
        console.log("designationRes:", designationRes);

        const formattedDepartments =
            (departmentRes?.data || []).map((x: any) => ({
                label: x.name,
                value: x.id
            }));

        const formattedDesignations =
            (designationRes?.data || []).map((x: any) => ({
                label: x.name,
                value: x.id
            }));

        setDepartmentOptions(
            formattedDepartments
        );

        setDesignationOptions(
            formattedDesignations
        );
    };

    useEffect(() => {
        loadEmployees();
        loadDropdowns();
    }, []);

    const handleDepartmentChange = async (deptId: any) => {

        setForm((prev: any) => ({
            ...prev,
            departmentId: deptId,
            designationId: ""
        }));

        const res = await getEmployeeMasters("Designation", deptId);

        const formatted = (res?.data || []).map((x: any) => ({
            label: x.name,
            value: x.id
        }));

        setDesignationOptions(formatted);
    };

    // =========================
    // EDIT
    // =========================
    const handleEdit = async (row: any) => {
        const response: any =
            await getEmployeeDetails({
                employeeId: row.employeeId
            });

        const employee =
            response?.employees?.[0];

        if (!employee) return;

        setForm({
            employeeId: employee.employeeId,
            employeeName: employee.employeeName,
            email: employee.email,
            departmentId: employee.departmentId,
            designationId: employee.designationId,
            salary: employee.salary
        });

        setShowSidebar(true);
    };

    // =========================
    // DELETE
    // =========================
    const handleDelete = (row: any) => {

        const updatedEmployees =
            employees.filter(
                (employee) =>
                    employee.employeeId !== row.employeeId
            );

        setEmployees(updatedEmployees);
    };

    // =========================
    // SAVE
    // =========================
    const handleSave = async () => {
        console.log(form);
        setShowSidebar(false);
        await loadEmployees();
    };

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
                onAdd={() => setShowSidebar(true)}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <TOffCanvas
                visible={showSidebar}
                onHide={() => setShowSidebar(false)}
                header="Add Employee"
                primaryLabel="Save"
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

        </div>
    );
}