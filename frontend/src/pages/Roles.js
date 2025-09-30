import {React, useEffect, useState} from 'react';
import axios from 'axios';
import Form from '../components/Form';
import { formatDate } from '../utils/FormatDate';

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const apiUrl = "http://localhost:5001/api/roles";

  useEffect(() => {
    fetchRoles();
  }, []);

  async function fetchRoles() {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setRoles(res.data);
    } catch (err) {
      console.error("Error fetching roles:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = () => {
    setEditingRole(null);
    setShowForm(true);
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchRoles();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading roles...</p>;
  
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Menu */}
      <div style={{ width: "250px", borderRight: "1px solid #ddd", padding: "1rem" }}>
        <h3>Roles</h3>
        <button
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
          onClick={handleAdd}
        >
          Add Role
        </button>
</div>

{/* Main Content Area */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1>Roles</h1>

        {showForm ? (
          <Form
            entity="role"
            apiUrl={apiUrl}
            fields={[
              { name: "title", label: "Title", type: "text" },
              { name: "salary", label: "Salary", type: "number" },
              { name: "department_id", label: "Department ID", type: "number" },
            ]}
            initialData={editingRole}
            onSuccess={() => {
              fetchRoles();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : ( roles.length > 0 ? (
          <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Salary</th>
                <th>Department ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.title}</td>
                  <td>{role.salary}</td>
                  <td>{role.department_id}</td>
                  <td>
                    <button onClick={() => handleEdit(role)}>Edit</button>
                    <button onClick={() => handleDelete(role.id)} style={{ marginLeft: "0.5rem", color: "#fff", background: "red" }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No roles found. Click "Add Role" to create one.</p>
        ))}
      </div>
    </div>
  );
}

