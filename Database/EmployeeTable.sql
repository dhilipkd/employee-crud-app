CREATE TABLE Employees
(
    EmployeeId SERIAL PRIMARY KEY,

    EmployeeName VARCHAR(100) NOT NULL,

    Email VARCHAR(100) NOT NULL,

    DepartmentId INT NOT NULL,

    DesignationId INT NOT NULL,

    Salary DECIMAL(10,2),

    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UpdatedDate TIMESTAMP,

    CONSTRAINT fk_employee_department
    FOREIGN KEY (DepartmentId)
    REFERENCES Departments(DepartmentId),

    CONSTRAINT fk_employee_designation
    FOREIGN KEY (DesignationId)
    REFERENCES Designations(DesignationId)
);

SELECT * FROM Employees;