"use client";

import TInputField from "../TInputField";
import TDropdown from "../TDropdown";

type EmployeeFormProps = {
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    departmentOptions: any[];
    designationOptions: any[];
    onDepartmentChange: (deptId: any) => void;
};

export default function EmployeeForm({
    form,
    setForm,
    departmentOptions,
    designationOptions,
    onDepartmentChange
}: EmployeeFormProps) {

    return (
        <div className="space-y-4">

            <TInputField
                label="Employee Name"
                value={form.employeeName}
                placeholder="Enter Name"
                onChange={(e) =>
                    setForm((prev: any) => ({
                        ...prev,
                        employeeName: e.target.value
                    }))
                }
            />

            <TInputField
                label="Email"
                value={form.email}
                placeholder="Enter Email"
                onChange={(e) =>
                    setForm((prev: any) => ({
                        ...prev,
                        email: e.target.value
                    }))
                }
            />

            <TDropdown
                label="Department"
                value={form.departmentId}
                options={departmentOptions}
                placeholder="Select Department"
                onChange={(e) => onDepartmentChange(e.value)}
            />

            <TDropdown
                label="Designation"
                value={form.designationId}
                options={form.departmentId ? designationOptions : []}
                placeholder={
                    form.departmentId
                        ? "Select Designation"
                        : "Select Department first"
                }
                onChange={(e) =>
                    setForm((prev: any) => ({
                        ...prev,
                        designationId: e.value
                    }))
                }
            />

            <TInputField
                label="Salary"
                value={form.salary}
                placeholder="Enter Salary"
                onChange={(e) =>
                    setForm((prev: any) => ({
                        ...prev,
                        salary: e.target.value
                    }))
                }
            />

        </div>
    );
}