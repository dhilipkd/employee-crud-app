CREATE OR REPLACE PROCEDURE sp_deleteemployeedetails(
    IN p_employeeid INT,
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
    -- DELETE
    ---------------------------------------------------
    DELETE FROM Employees
    WHERE EmployeeId = p_employeeid;

    status := 1;
    message := 'Employee deleted successfully';

EXCEPTION
    WHEN OTHERS THEN
        status := 0;
        message := SQLERRM;

END;
$$;

CALL sp_deleteemployeedetails(
    1,
    NULL,
    NULL
)