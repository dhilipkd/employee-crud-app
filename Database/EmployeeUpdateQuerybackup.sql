CREATE OR REPLACE PROCEDURE sp_updateemployeedetails(
    IN p_employeeid INT,
    IN p_employeename VARCHAR,
    IN p_email VARCHAR,
    IN p_departmentid INT,
    IN p_designationid INT,
    IN p_salary NUMERIC,
    OUT status INT,
    OUT message TEXT
)
LANGUAGE plpgsql
AS
$$
BEGIN

    ---------------------------------------------------
    -- VALIDATION
    ---------------------------------------------------
    IF p_employeeid IS NULL THEN
        status := 0;
        message := 'EmployeeId is required';
        RETURN;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM Employees WHERE EmployeeId = p_employeeid) THEN
        status := 0;
        message := 'Employee not found';
        RETURN;
    END IF;

    ---------------------------------------------------
    -- UPDATE (SAFE NULL HANDLING)
    ---------------------------------------------------
    UPDATE Employees
    SET
        EmployeeName  = COALESCE(p_employeename, EmployeeName),
        Email         = COALESCE(p_email, Email),
        DepartmentId  = COALESCE(p_departmentid, DepartmentId),
        DesignationId = COALESCE(p_designationid, DesignationId),
        Salary        = COALESCE(p_salary, Salary)
    WHERE EmployeeId = p_employeeid;

    status := 1;
    message := 'Employee updated successfully';

EXCEPTION
    WHEN OTHERS THEN
        status := 0;
        message := SQLERRM;

END;
$$;

CALL sp_updateemployeedetails(
    1,
    'Ravi Kumar',
    'ravi@gmail.com',
    2,
    3,
    35000,
    NULL,
    NULL
);