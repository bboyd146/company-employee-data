
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const apiUrl = "http://localhost:5001/api/employees";

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Menu */}
      <div style={{ width: "250px", borderRight: "1px solid #ddd", padding: "1rem" }}>
        <h3>Employees</h3>
        <button
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            width: "100%",
            marginBottom: "1rem",
            cursor: "pointer",
          }}
          onClick={handleAdd}
        >
          + Add Employee
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1>Employees</h1>

        {showForm ? (
          <Form
            entity="Employee"
            apiUrl={apiUrl}
            fields={[
              { name: "first_name", label: "First Name", type: "text", required: true },
              { name: "last_name", label: "Last Name", type: "text", required: true },
              { name: "role_id", label: "Role ID", type: "number", required: true },
              { name: "manager_id", label: "Manager ID", type: "number", required: false },
              { name: "hire_date", label: "Hire Date", type: "date", required: true },
            ]}
            initialData={editingEmployee}
            onSuccess={() => {
              fetchEmployees();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : employees.length > 0 ? (
          <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>First</th>
                <th>Last</th>
                <th>Role</th>
                <th>Manager</th>
                <th>Hire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.first_name}</td>
                  <td>{emp.last_name}</td>
                  <td>{emp.role_id}</td>
                  <td>{emp.manager_id || "—"}</td>
                  <td>{emp.hire_date ? new Date(emp.hire_date).toLocaleDateString() : "—"}</td>
                  <td>
                    <button
                      style={{ marginRight: "0.5rem" }}
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ background: "red", color: "#fff" }}
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No employees found</p>
        )}
      </div>
    </div>
  );
}


