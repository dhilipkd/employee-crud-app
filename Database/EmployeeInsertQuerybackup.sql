CREATE OR REPLACE PROCEDURE sp_insertemployee(
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
DECLARE
    v_employeeid INT;
BEGIN

    ---------------------------------------------------
    -- VALIDATION
    ---------------------------------------------------
    IF p_employeename IS NULL OR trim(p_employeename) = '' THEN
        status := 0;
        message := 'Employee name is required';
        RETURN;
    END IF;

    IF p_email IS NULL OR trim(p_email) = '' THEN
        status := 0;
        message := 'Email is required';
        RETURN;
    END IF;

    IF EXISTS (SELECT 1 FROM Employees WHERE Email = p_email) THEN
        status := 0;
        message := 'Email already exists';
        RETURN;
    END IF;

    ---------------------------------------------------
    -- INSERT
    ---------------------------------------------------
    INSERT INTO Employees
    (
        EmployeeName,
        Email,
        DepartmentId,
        DesignationId,
        Salary
    )
    VALUES
    (
        p_employeename,
        p_email,
        p_departmentid,
        p_designationid,
        p_salary
    )
    RETURNING EmployeeId INTO v_employeeid;

    status := 1;
    message := 'Employee inserted successfully. ID = ' || v_employeeid;

EXCEPTION
    WHEN OTHERS THEN
        status := 0;
        message := SQLERRM;

END;
$$;

CALL sp_insertemployee(
    'Dhilip',
    'dhilip@gmail.com',
    1,
    2,
    30000,
    NULL,
    NULL
);