# Company-Database-Management

**License:** MIT ![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

## 🌐 Live Application

**Deployed URL:** [https://company-employee-data.onrender.com/](https://company-employee-data.onrender.com/)

---

## 🏢 Description

The **Company Database Management System** is a full-stack web application that visualizes and manages a company’s organizational data.
It connects a **MySQL database** (hosted on AWS RDS) to an **Express/Node.js backend** and a **React frontend**, all deployed on **Render**.

This platform provides interactive reports for:

* Employee management and reporting hierarchy
* Departmental budgets and projects
* Salary distributions across departments
* Payroll and financial insights

The system enforces **referential integrity** through foreign keys, cascading rules, and self-references for hierarchical employee relationships (e.g., employees managed by other employees).

---

## 🚀 Key Features

* **Dynamic Dashboard:** Interactive reports and data visualizations updated directly from the MySQL database.
* **Department Analytics:** Average and total salary breakdowns by department.
* **Organizational Hierarchy:** Employee-to-manager relationships displayed in a clean tabular view.
* **Financial Oversight:** Department budget summaries and active project tracking.
* **Secure Cloud Hosting:** Backend API and database hosted with secure environment variable configuration via Render and AWS RDS.
* **Dark Mode UI:** User interface includes a dark theme for improved readability and modern design.

---

## 📊 Query Output Previews

### 1. Salary by Department

Displays total and average salary data for all departments, providing HR teams a quick financial overview.
**Key Columns:** `DEP_NAME`, `AVG_SALARY`, `TOTAL_SALARY`
**Screenshot:**

![Salary by Department](<img width="1877" height="711" alt="Screenshot 2025-10-06 at 7 30 45 PM" src="https://github.com/user-attachments/assets/14adddfc-0167-4638-9deb-7163d52de686" />) <!-- replace with your screenshot -->

---

### 2. Employees & Managers

Shows employee names with their corresponding managers to map the company hierarchy.
**Key Columns:** `EMPLOYEE_FIRST`, `EMPLOYEE_LAST`, `MANAGER_FIRST`, `MANAGER_LAST`
**Screenshot:**
![Employees and Managers](<img width="1886" height="668" alt="Screenshot 2025-10-06 at 7 30 54 PM" src="https://github.com/user-attachments/assets/085371b1-da9b-4309-ad96-4c75da1094ce" />)


---

### 3. Department Budgets

Summarizes total department budgets and the number of active projects within each department.
**Key Columns:** `DEP_NAME`, `PROJECT_COUNT`, `TOTAL_BUDGET`
**Screenshot:**
![Department Budgets](<img width="1884" height="664" alt="Screenshot 2025-10-06 at 7 31 07 PM" src="https://github.com/user-attachments/assets/0e5a3cab-6f1c-4a03-af9c-2503adda6893" />
)

---

## 🧠 Technical Overview

**Backend:**

* Node.js + Express REST API
* MySQL2 & dotenv for secure database interaction
* Hosted API routes for dynamic frontend requests

**Database:**

* AWS RDS MySQL instance
* Seeded via Workbench and SQL Shell
* Schema includes normalized relationships for departments, employees, roles, projects, and payroll

**Frontend:**

* React + Vite
* TailwindCSS for styling
* Dark mode toggle and responsive layout
* Fetches data dynamically from deployed backend

**Hosting:**

* Render (for both frontend and backend)
* Environment variables configured via Render dashboard
* AWS RDS public access with proper security group permissions

---

## 🛠️ Installation

**Step 1:** Clone this repository

```bash
git clone https://github.com/bboyd146/Company-Database-Management.git
cd Company-Database-Management
```

**Step 2:** Install dependencies

```bash
npm install
```

**Step 3:** Create a `.env` file in the root directory

```
MYSQL_HOST=your-rds-endpoint
MYSQL_USER=your-username
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=your-database
```

**Step 4:** Run the server

```bash
cd server
node index.js
```

**Step 5:** Start the frontend

```bash
cd client
npm run dev
```

---

## 🧩 Usage

Once deployed or running locally, the dashboard allows users to:

* View department financials
* Review employee and manager structures
* Analyze salaries and project budgets

Live Demo: [Company Database Portal](https://company-employee-data.onrender.com/)

---

## 🧑‍💻 Credits

**Developers:**

* **Bradley Boyd** -- Project Lead, Backend & Development
* **Blake Waugh** -- Database Design & Seeding
* **Caidon Buchanan** -- UI/UX & Front-End

---

## 📄 License

**MIT License**
Copyright © 2025 Bradley Boyd

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

---

## 🛡️ Badges

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue.svg)
![Node.js](https://img.shields.io/badge/Backend-Node.js-orange.svg)
![React](https://img.shields.io/badge/Frontend-React-lightblue.svg)

---

## 🤝 How to Contribute

For contributions, please contact:
📧 **[bboyd146@gmail.com](mailto:bboyd146@gmail.com)**

---

## 🧪 Tests

Future development: automated tests for backend routes and database validation.

---

## ❓ Questions

**GitHub:** [bboyd146](https://github.com/bboyd146)
**Email:** [bboyd146@gmail.com](mailto:bboyd146@gmail.com)
**Preferred Contact:** Email
