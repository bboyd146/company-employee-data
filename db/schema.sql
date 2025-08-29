DROP DATABASE IF EXISTS new_company_db;
CREATE DATABASE new_company_db;

USE new_company_db;

CREATE TABLE location (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(100) NOT NULL,
    city VARCHAR(30) NOT NULL,
    state VARCHAR(30) NOT NULL,
    country VARCHAR(30) NOT NULL
)

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(30) NOT NULL,
    location_id INT,
    FOREIGN KEY (location_id) 
    REFERENCES location(id) ON DELETE SET NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    hire_date DATE,
    FOREIGN KEY (role_id),
    REFERENCES roles(id),
    FOREIGN KEY (manager_id), 
    REFERENCES employee(id) ON DELETE SET NULL
)

CREATE TABLE project (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(12,2),
    department_id INT,
    FOREIGN KEY (department_id), 
    REFERENCES department(id) ON DELETE SET NULL
)

CREATE TABLE employee_project (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    project_id DATE NOT NULL,
    role_in_project VARCHAR(50),
    FOREIGN KEY (employee_id) 
    REFERENCES employee(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) 
    REFERENCES project(id) ON DELETE CASCADE
)

CREATE TABLE payroll (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    pay_date DATE NOT NULL,
    gross_salary DECIMAL(10,2) NOT NULL,
    deductions DECIMAL(10,2),
    net_salary DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (employee_id) 
    REFERENCES employee(id) ON DELETE CASCADE
)
