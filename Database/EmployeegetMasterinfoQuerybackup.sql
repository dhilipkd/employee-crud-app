CREATE OR REPLACE FUNCTION sp_getmasterinfo(
    p_module VARCHAR,
    p_id INT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
AS
$$
DECLARE
    v_result JSON;
BEGIN

    ---------------------------------------------------
    -- DEPARTMENT
    ---------------------------------------------------
    IF p_module = 'DEPARTMENT' THEN

        SELECT COALESCE(
            json_agg(
                json_build_object(
                    'id', DepartmentId,
                    'name', DepartmentName
                )
            ),
            '[]'::json
        )
        INTO v_result
        FROM Departments;

    ---------------------------------------------------
    -- DESIGNATION (FILTER BY DEPARTMENT)
    ---------------------------------------------------
    ELSIF p_module = 'DESIGNATION' THEN

        SELECT COALESCE(
            json_agg(
                json_build_object(
                    'id', DesignationId,
                    'name', DesignationName,
                    'departmentId', DepartmentId
                )
            ),
            '[]'::json
        )
        INTO v_result
        FROM Designations
        WHERE (p_id IS NULL OR DepartmentId = p_id);

    ELSE
        v_result := '[]'::json;
    END IF;

    RETURN v_result;

END;
$$;

SELECT sp_getmasterinfo('DEPARTMENT');
SELECT sp_getmasterinfo('DESIGNATION');