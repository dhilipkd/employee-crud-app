CREATE OR REPLACE PROCEDURE sp_getemployeedetails(
    IN p_departmentid INT,
    OUT status INT,
    OUT message TEXT,
    OUT resultset JSON
)
LANGUAGE plpgsql
AS
$$
BEGIN

    SELECT COALESCE(
        json_agg(
            json_build_object(
                'employeeId', e.EmployeeId,
                'employeeName', e.EmployeeName,
                'email', e.Email,
                'departmentId', d.DepartmentId,
                'departmentName', d.DepartmentName,
                'designationId', des.DesignationId,
                'designationName', des.DesignationName,
                'salary', e.Salary
            )
            ORDER BY e.EmployeeId
        ),
        '[]'::json
    )
    INTO resultset
    FROM Employees e
    LEFT JOIN Departments d ON d.DepartmentId = e.DepartmentId
    LEFT JOIN Designations des ON des.DesignationId = e.DesignationId
    WHERE (p_departmentid IS NULL OR e.DepartmentId = p_departmentid);

    status := 1;
    message := 'Success';

EXCEPTION
    WHEN OTHERS THEN
        status := 0;
        message := SQLERRM;
        resultset := '[]'::json;

END;
$$;

CALL sp_getemployeedetails(
    NULL,
    NULL,
    NULL,
    NULL
);