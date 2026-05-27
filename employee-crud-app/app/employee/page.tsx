"use client";

import { useState } from "react";

import TDataTable from "../components/TDataTable";
import TOffCanvas from "../components/TOffCanvas";

import EmployeeForm from "../components/employee/EmployeeForm";

import "../styles/employee.css"

export default function EmployeePage() {

    const [showSidebar, setShowSidebar] = useState(false);

    const [employees, setEmployees] = useState([
        {
            employeeId: 1,
            name: "Ravi",
            email: "ravi@gmail.com",
            department: "IT",
            salary: 30000,
            status: "Active"
        },
        {
            employeeId: 2,
            name: "John",
            email: "john@gmail.com",
            department: "HR",
            salary: 25000,
            status: "Inactive"
        }
    ]);

    const handleEdit = (row: any) => {
        console.log("Edit:", row);

        setShowSidebar(true);
    };

    const handleDelete = (row: any) => {
        console.log("Delete:", row);

        const updatedEmployees =
            employees.filter(
                (employee) =>
                    employee.employeeId !== row.employeeId
            );

        setEmployees(updatedEmployees);
    };

    const handleSave = () => {
        console.log("Save");

        setShowSidebar(false);
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
                <EmployeeForm />
            </TOffCanvas>

        </div>
    );
}