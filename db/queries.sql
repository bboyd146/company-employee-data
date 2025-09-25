-- SQL Queries for Employee Management System

-- Query to retrieve all employees
SELECT * FROM employee;
-- Query to retrieve all departments
SELECT * FROM department;
-- Query to retrieve all locations
SELECT * FROM location;
-- Query to retrieve all roles
SELECT * FROM roles;
-- Query to retrieve all projects
SELECT * FROM project;
-- Query to retrieve all employee-project assignments
SELECT * FROM employee_project;
-- Query to retrieve employees along with their roles and departments
SELECT e.first_name, e.last_name, r.title AS role, d.dep_name AS department
FROM employee e
    JOIN roles r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id;

-- Query to retrieve employees with a specific job title
SELECT e.first_name, e.last_name
FROM employee e
    JOIN roles r ON e.role_id = r.id
WHERE
    r.title = 'Software Engineer';
-- Query to retrieve employees hired after a specific date
SELECT * FROM employee WHERE hire_date > '2023-01-01';

-- Query to retrieve employees by department
SELECT e.first_name, e.last_name, d.name AS department
FROM employee e
    JOIN department d ON e.department_id = d.id
WHERE
    d.name = 'Engineering';

-- Query to update an employee's salary
UPDATE roles SET salary = 85000.00 WHERE title = 'Software Engineer';
-- Query to update an employee's role
UPDATE employee SET role_id = 2 WHERE id = 1; -- Change role of employee with ID 1 to role ID 2

-- Query to delete an employee by ID
DELETE FROM employee WHERE id = 3;

-- Query to add a new employee
INSERT INTO employee (first_name, last_name, role_id, manager_id, hire_date)
VALUES ('John', 'Doe', 1, NULL, '2024-06-01');

-- Query to add a new department
INSERT INTO department (dep_name, location_id)
VALUES ('Research and Development', 1); 
-- Query to add a new location
INSERT INTO location (address, city, state, country)
VALUES ('123 Main St', 'Springfield', 'IL', 'USA');
-- Query to add a new role
INSERT INTO roles (title, salary, department_id)
VALUES ('Data Scientist', 95000.00, 1);
-- Query to add a new project
INSERT INTO project (project_name, start_date, end_date, budget, department_id)
VALUES ('AI Development', '2024-07-01', '2025-07-01', 500000.00, 1);
-- Query to assign an employee to a project
INSERT INTO employee_project (employee_id, project_id, role_in_project)
VALUES (1, 1, 'Lead Developer');        

-- Query to retrieve projects along with their departments
SELECT p.project_name, d.dep_name AS department
FROM project p
    JOIN department d ON p.department_id = d.id;
-- Query to retrieve employees along with their assigned projects
SELECT e.first_name, e.last_name, p.project_name
FROM employee e
    JOIN employee_project ep ON e.id = ep.employee_id
    JOIN project p ON ep.project_id = p.id;
-- Query to retrieve employees working on a specific project
SELECT e.first_name, e.last_name
FROM employee e
    JOIN employee_project ep ON e.id = ep.employee_id
    JOIN project p ON ep.project_id = p.id
WHERE
    p.project_name = 'AI Development';
-- Query to retrieve projects with a budget greater than a specific amount
SELECT * FROM project WHERE budget > 100000.00;
-- Query to update a project's budget
UPDATE project SET budget = 600000.00 WHERE project_name = 'AI Development';
-- Query to delete a project by ID
DELETE FROM project WHERE id = 1;   

-- Query to retrieve all data joined together for comprehensive view
SELECT e.first_name, e.last_name, r.title AS role, d.dep_name AS department, l.city AS location, p.project_name
FROM employee e
    JOIN roles r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    JOIN location l ON d.location_id = l.id
    LEFT JOIN employee_project ep ON e.id = ep.employee_id
    LEFT JOIN project p ON ep.project_id = p.id;    
    