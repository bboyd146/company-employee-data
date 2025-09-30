import {React, useState, useEffect} from 'react';
import axios from 'axios';
import Form from '../components/Form';


export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = "http://localhost:5002/api/departments";

  useEffect(() => {
    fetchDepartments();
  }, []);

  async function fetchDepartments() {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = () => {
    setEditingDepartment(null);
    setShowForm(true);
  };

  const handleEdit = (dep) => {
    setEditingDepartment(dep);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchDepartments();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading departments...</p>;

  return (
<div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Menu */}
      <div style={{ width: "250px", borderRight: "1px solid #ddd", padding: "1rem" }}>
        <h3>Departments</h3>
        <button
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginBottom: "1rem",
            width: "100%",
          }}
          onClick={handleAdd}
        >
          Add Department
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1>Departments</h1>
        {showForm ? (
          <Form
            entity="Department"
            apiUrl={apiUrl}
            fields={[
              { name: "dep_name", label: "Department Name", type: "text", required: true },
              { name: "location_id", label: "Location ID", type: "number", required: true },
            ]}
            initialData={editingDepartment}
            onSuccess={() => {
              fetchDepartments();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : departments.length > 0 ? (
          <table
            border="1"
            cellPadding="8"
            style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Department Name</th>
                <th>Location ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dep) => (
                <tr key={dep.id}>
                  <td>{dep.id}</td>
                  <td>{dep.dep_name}</td>
                  <td>{dep.location_id}</td>
                  <td>
                    <button onClick={() => handleEdit(dep)}>Edit</button>
                    <button onClick={() => handleDelete(dep.id)} style={{ marginLeft: "0.5rem", color: "red" }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No departments found.</p>
        )}
      </div>
    </div>
  );
}

