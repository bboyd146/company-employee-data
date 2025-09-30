import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import { formatDate } from '../utils/FormatFunctions';


export default function EmployeeProjects() {
  const [employeeProjects, setEmployeeProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployeeProject, setEditingEmployeeProject] = useState(null);

  const apiUrl = "http://localhost:5001/api/employee-projects";

  useEffect(() => {
    fetchEmployeeProjects();
  }, []);

  async function fetchEmployeeProjects() {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setEmployeeProjects(res.data);
    } catch (err) {
      console.error("Error fetching employee projects:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = () => {
    setEditingEmployeeProject(null);
    setShowForm(true);
  };

  const handleEdit = (empProj) => {
    setEditingEmployeeProject(empProj);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee project assignment?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchEmployeeProjects();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading employee projects...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Menu */}
      <div style={{ width: "250px", borderRight: "1px solid #ddd", padding: "1rem" }}>
        <h3>Employee Projects</h3>
        <button
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginBottom: "1rem"
          }}
          onClick={handleAdd}
        >
          + Add Assignment
        </button>
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, padding: "1rem" }}>
        <h2>Employee Projects</h2>
        {showForm ? (
          <Form
            entity="employee-project"
            apiUrl={apiUrl}
            fields={[
              { name: "employee_id", label: "Employee ID", type: "number" },
              { name: "project_id", label: "Project ID", type: "number" },
              { name: "role", label: "Role", type: "text" },
              { name: "assigned_date", label: "Assigned Date", type: "date" }
            ]}
            initialData={editingEmployeeProject}
            onSuccess={() => {
              setShowForm(false);
              fetchEmployeeProjects();
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : employeeProjects.length > 0 ? (
          <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee ID</th>
                <th>Project ID</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeProjects.map((empProj) => (
                <tr key={empProj.id}>
                  <td>{empProj.id}</td>
                  <td>{empProj.employee_id}</td>
                  <td>{empProj.project_id}</td>
                  <td>{empProj.role_in_project}</td>
                  <td>
                    <button onClick={() => handleEdit(empProj)}>Edit</button>
                    <button onClick={() => handleDelete(empProj.id)} style={{ marginLeft: '0.5rem', color: '#fff', background: 'red' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No employee project assignments found.</p>
        )}
      </div>
    </div>
  );
}

