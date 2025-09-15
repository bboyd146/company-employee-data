INSERT INTO location(address, city, state, country) VALUES
('123 Main St', 'Springfield', 'IL', 'USA'),
('456 Elm St', 'Metropolis', 'NY', 'USA'),
('789 Oak St', 'Gotham', 'NJ', 'USA'),
('101 Pine St', 'Star City', 'CA', 'USA'),
('202 Maple St', 'Central City', 'MO', 'USA'),
('303 Birch St', 'Coast City', 'CA', 'USA'),
('404 Cedar St', 'Smallville', 'KS', 'USA'),
('505 Walnut St', 'Blüdhaven', 'NJ', 'USA'),
('606 Chestnut St', 'Fawcett City', 'MD', 'USA'),
('707 Ash St', 'Ivy Town', 'MA', 'USA');

INSERT INTO department(dep_name, location_id) VALUES
('Engineering', 1),
('Marketing', 2),
('Sales', 3),
('HR', 4),
('Finance', 5),
('IT', 6),
('Customer Support', 7),
('R&D', 8),
('Operations', 9),
('Legal', 10);

INSERT INTO roles(title, salary, department_id) VALUES
('Software Engineer', 80000.00, 1),
('Marketing Manager', 90000.00, 2),
('Sales Representative', 70000.00, 3),
('HR Specialist', 60000.00, 4),
('Financial Analyst', 85000.00, 5),
('IT Support', 55000.00, 6),
('Customer Service Rep', 50000.00, 7),
('R&D Scientist', 95000.00, 8),
('Operations Manager', 92000.00, 9),
('Legal Advisor', 110000.00, 10);

INSERT INTO employee(first_name, last_name, role_id, manager_id, hire_date) VALUES
('John', 'Doe', 1, NULL, '2020-01-15'),
('Jane', 'Smith', 2, 1, '2019-03-22'),
('Jim', 'Brown', 3, 1, '2021-07-30'),
('Emily', 'Davis', 4, 2, '2018-11-12'),
('Michael', 'Wilson', 5, 2, '2022-05-19'),
('Sarah', 'Johnson', 6, 3, '2020-09-25'),
('David', 'Lee', 7, 3, '2019-12-05'),
('Laura', 'Garcia', 8, 4, '2021-04-14'),
('Robert', 'Martinez', 9, 5, '2017-08-23'),
('Linda', 'Harris', 10, 6, '2016-02-17');

INSERT INTO project(project_name, start_date, end_date, budget, department_id) VALUES
('Project Alpha', '2023-01-01', '2023-06-30', 500000.00, 1),
('Project Beta', '2023-02-15', '2023-08-15', 300000.00, 2),
('Project Gamma', '2023-03-01', '2023-12-31', 750000.00, 3),
('Project Delta', '2023-04-10', '2024-04-10', 600000.00, 4),
('Project Epsilon', '2023-05-20', '2024-05-20', 450000.00, 5),
('Project Zeta', '2023-06-15', '2024-06-15', 800000.00, 6),
('Project Eta', '2023-07-01', '2024-07-01', 350000.00, 7),
('Project Theta', '2023-08-05', '2024-08-05', 400000.00, 8),
('Project Iota', '2023-09-10', '2024-09-10', 550000.00, 9),
('Project Kappa', '2023-10-20', '2024-10-20', 700000.00, 10);

INSERT INTO employee_project(employee_id, project_id, role_in_project) VALUES
(1, 1, 'Lead Developer'),
(2, 2, 'Project Coordinator'),
(3, 1, 'Sales Consultant'),
(3, 2, 'Marketing Support'),
(4, 3, 'HR Advisor'),
(5, 4, 'Financial Consultant'),
(6, 5, 'IT Specialist'),
(7, 6, 'Customer Support Lead'),
(8, 7, 'R&D Analyst'),
(9, 8, 'Operations Supervisor'),
(10, 9, 'Legal Consultant');

INSERT INTO payroll(employee_id, pay_date, amount, payment_method) VALUES
(1, '2023-01-31', 6666.67, 'Direct Deposit'),
(2, '2023-01-31', 7500.00, 'Check'),
(3, '2023-01-31', 5833.33, 'Direct Deposit'),
(4, '2023-01-31', 5000.00, 'Check'),
(5, '2023-01-31', 7083.33, 'Direct Deposit'),
(6, '2023-01-31', 4583.33, 'Check'),
(7, '2023-01-31', 4166.67, 'Direct Deposit'),
(8, '2023-01-31', 7916.67, 'Check'),
(9, '2023-01-31', 7666.67, 'Direct Deposit'),
(10, '2023-01-31', 9166.67, 'Check');
-- End of db/seeds.sql