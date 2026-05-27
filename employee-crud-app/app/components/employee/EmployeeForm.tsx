"use client";

import { useState } from "react";
import TInputField from "../TInputField";
import TDropdown from "../TDropdown";

export default function EmployeeForm() {

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        department: "",
        salary: "",
        status: ""
    });

    const departmentOptions = [
        { label: "IT", value: "IT" },
        { label: "HR", value: "HR" },
        { label: "Finance", value: "Finance" }
    ];

    const statusOptions = [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" }
    ];

    return (
        <div className="space-y-4">

            <TInputField
                label="Name"
                value={employee.name}
                placeholder="Enter Name"
                onChange={(e) =>
                    setEmployee({
                        ...employee,
                        name: e.target.value
                    })
                }
            />

            <TInputField
                label="Email"
                value={employee.email}
                placeholder="Enter Email"
                onChange={(e) =>
                    setEmployee({
                        ...employee,
                        email: e.target.value
                    })
                }
            />

            <TDropdown
                label="Department"
                value={employee.department}
                options={departmentOptions}
                placeholder="Select Department"
                onChange={(e) =>
                    setEmployee({
                        ...employee,
                        department: e.value
                    })
                }
            />

            <TDropdown
                label="Designation"
                value={employee.status}
                options={statusOptions}
                placeholder="Select Designation"
                onChange={(e) =>
                    setEmployee({
                        ...employee,
                        status: e.value
                    })
                }
            />

            <TInputField
                label="Salary"
                value={employee.salary}
                placeholder="Enter Salary"
                onChange={(e) =>
                    setEmployee({
                        ...employee,
                        salary: e.target.value
                    })
                }
            />

        </div>
    );
}