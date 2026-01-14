INSERT INTO users (email, password_hash)
VALUES ('demo@demo.com', '$2b$10$7sq4s./mSVCvsfMrPLRufeMCgO8Q5IUunR1ZKiGC5lxKYQjL2PS82');


INSERT INTO location(user_id, address, city, state, country) VALUES
(1, '123 Main St', 'Springfield', 'IL', 'USA'),
(1, '456 Elm St', 'Metropolis', 'NY', 'USA'),
(1, '789 Oak St', 'Gotham', 'NJ', 'USA'),
(1, '101 Pine St', 'Star City', 'CA', 'USA'),
(1, '202 Maple St', 'Central City', 'MO', 'USA'),
(1, '303 Birch St', 'Coast City', 'CA', 'USA'),
(1, '404 Cedar St', 'Smallville', 'KS', 'USA'),
(1, '505 Walnut St', 'Blüdhaven', 'NJ', 'USA'),
(1, '606 Chestnut St', 'Fawcett City', 'MD', 'USA'),
(1, '707 Ash St', 'Ivy Town', 'MA', 'USA');

INSERT INTO department(user_id, dep_name, location_id) VALUES
(1, 'Engineering', 1),
(1, 'Marketing', 2),
(1, 'Sales', 3),
(1, 'HR', 4),
(1, 'Finance', 5),
(1, 'IT', 6),
(1, 'Customer Support', 7),
(1, 'R&D', 8),
(1, 'Operations', 9),
(1, 'Legal', 10);

INSERT INTO roles(user_id, title, salary, department_id) VALUES
(1, 'Software Engineer', 80000.00, 1),
(1, 'Marketing Manager', 90000.00, 2),
(1, 'Sales Representative', 70000.00, 3),
(1, 'HR Specialist', 60000.00, 4),
(1, 'Financial Analyst', 85000.00, 5),
(1, 'IT Support', 55000.00, 6),
(1, 'Customer Service Rep', 50000.00, 7),
(1, 'R&D Scientist', 95000.00, 8),
(1, 'Operations Manager', 92000.00, 9),
(1, 'Legal Advisor', 110000.00, 10);

INSERT INTO employee(user_id, first_name, last_name, role_id, manager_id, hire_date) VALUES
(1, 'John', 'Doe', 1, NULL, '2020-01-15'),
(1, 'Jane', 'Smith', 2, 1, '2019-03-22'),
(1, 'Jim', 'Brown', 3, 1, '2021-07-30'),
(1, 'Emily', 'Davis', 4, 2, '2018-11-12'),
(1, 'Michael', 'Wilson', 5, 2, '2022-05-19'),
(1, 'Sarah', 'Johnson', 6, 3, '2020-09-25'),
(1, 'David', 'Lee', 7, 3, '2019-12-05'),
(1, 'Laura', 'Garcia', 8, 4, '2021-04-14'),
(1, 'Robert', 'Martinez', 9, 5, '2017-08-23'),
(1, 'Linda', 'Harris', 10, 6, '2016-02-17');

INSERT INTO project(user_id, project_name, start_date, end_date, budget, department_id) VALUES
(1, 'Project Alpha', '2023-01-01', '2023-06-30', 500000.00, 1),
(1, 'Project Beta', '2023-02-15', '2023-08-15', 300000.00, 2),
(1, 'Project Gamma', '2023-03-01', '2023-12-31', 750000.00, 3),
(1, 'Project Delta', '2023-04-10', '2024-04-10', 600000.00, 4),
(1, 'Project Epsilon', '2023-05-20', '2024-05-20', 450000.00, 5),
(1, 'Project Zeta', '2023-06-15', '2024-06-15', 800000.00, 6),
(1, 'Project Eta', '2023-07-01', '2024-07-01', 350000.00, 7),
(1, 'Project Theta', '2023-08-05', '2024-08-05', 400000.00, 8),
(1, 'Project Iota', '2023-9-15', '2999-9-15', 557777.77, 9),
(1, 'Project Kappa', '2999-11-11', '3999-11-11', 777777.77, 1);

INSERT INTO employee_project(user_id, employee_id, project_id, role_in_project) VALUES
(1, 1, 1, 'Lead Developer'),
(1, 2, 2, 'Project Coordinator'),
(1, 3, 3, 'Sales Consultant'),
(1, 4, 4, 'Marketing Support'),
(1, 5, 5, 'HR Advisor'),
(1, 6, 6, 'Financial Consultant'),
(1, 7, 7, 'IT Specialist'),
(1, 8, 8, 'Customer Support Lead'),
(1, 9, 9, 'R&D Analyst'),
(1, 10, 10, 'Operations Supervisor'),
(1, 10, 10, 'Legal Consultant');

INSERT INTO payroll(user_id, employee_id, pay_date, gross_salary, deductions, net_salary, payment_method) VALUES
(1, 1, '2023-01-31', 6666.67, 666.67, 6000.00, 'Direct Deposit'),
(1, 2, '2023-01-31', 7500.00, 750.00, 6750.00, 'Check'),
(1, 3, '2023-01-31', 5833.33, 583.33, 5250.00, 'Direct Deposit'),
(1, 4, '2023-01-31', 5000.00, 500.00, 4500.00, 'Check'),
(1, 5, '2023-01-31', 7083.33, 708.33, 6375.00, 'Direct Deposit'),
(1, 6, '2023-01-31', 4583.33, 458.33, 4125.00, 'Check'),
(1, 7, '2023-01-31', 4166.67, 416.67, 3750.00, 'Direct Deposit'),
(1, 8, '2023-01-31', 7916.67, 791.67, 7125.00, 'Check'),
(1, 9, '2023-01-31', 7666.67, 766.67, 6900.00, 'Direct Deposit'),
(1, 10, '2023-01-31', 9166.67, 916.67, 8250.00, 'Check');