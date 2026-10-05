WITH RECURSIVE EmployeeHierarchy AS (
    -- Base case: Top-level managers (no manager assigned)
    SELECT 
        employee_id, 
        first_name, 
        manager_id, 
        1 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: Subordinates joining parent levels
    SELECT 
        e.employee_id, 
        e.first_name, 
        e.manager_id, 
        eh.level + 1
    FROM employees e
    INNER JOIN EmployeeHierarchy eh ON e.manager_id = eh.employee_id
)
SELECT * 
FROM EmployeeHierarchy
ORDER BY level, manager_id;