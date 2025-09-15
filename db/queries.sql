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

-- Query to retrieve employees with a specific job title
SELECT * FROM employee WHERE job_title = 'Software Engineer';
-- Query to retrieve employees hired after a specific date
SELECT * FROM employee WHERE hire_date > '2023-01-01';

-- Query to retrieve employees by department
SELECT e.first_name, e.last_name, d.name AS department
FROM employee e
    JOIN department d ON e.department_id = d.id
WHERE
    d.name = 'Engineering';

-- Query to update an employee's salary
UPDATE employee SET salary = 95000.00 WHERE id = 1;

-- Query to delete an employee by ID
DELETE FROM employee WHERE id = 3;