CREATE OR REPLACE FUNCTION public.sp_getmasterinfo(
    p_module character varying,
    p_id integer DEFAULT NULL::integer)
    RETURNS json
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    v_data JSON;
    v_result JSON;
BEGIN
    ---------------------------------------------------
    -- DEPARTMENT
    ---------------------------------------------------
    IF p_module = 'DEPARTMENT' THEN
        SELECT COALESCE(
            json_agg(json_build_object('id', DepartmentId, 'name', DepartmentName)),
            '[]'::json
        )
        INTO v_data
        FROM Departments;

    ---------------------------------------------------
    -- DESIGNATION
    ---------------------------------------------------
    ELSIF p_module = 'DESIGNATION' THEN
        SELECT COALESCE(
            json_agg(json_build_object('id', DesignationId, 'name', DesignationName, 'departmentId', DepartmentId)),
            '[]'::json
        )
        INTO v_data
        FROM Designations
        WHERE (p_id IS NULL OR DepartmentId = p_id);

    ELSE
        v_data := '[]'::json;
    END IF;

    v_result := json_build_object(
        'status', true,
        'message', '',
        'data', v_data
    );

    RETURN v_result;
END;
$BODY$;