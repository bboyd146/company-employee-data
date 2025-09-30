import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Form from '../components/Form';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = "http://localhost:5001/api/projects";

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (proj) => {
    setEditingProject(proj);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Menu */}
      <div style={{ width: "250px", borderRight: "1px solid #ddd", padding: "1rem" }}>
        <h3>Projects</h3>
        <button
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            width: "100%",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
          onClick={handleAdd}
        >
          Add Project
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1>Projects</h1>

        {showForm ? (
        <Form
          entity="project"
          apiUrl={apiUrl}
          fields={[
            { name: "name", label: "Project Name", type: "text" },
            { name: "description", label: "Description", type: "text" },
            { name: "start_date", label: "Start Date", type: "date" },
            { name: "end_date", label: "End Date", type: "date" },
          ]}
          initialData={editingProject}
          onSuccess={() => {
            fetchProjects();
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
        ) : projects.length > 0 ? (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj.id}>
                <td>{proj.id}</td>
                <td>{proj.project_name}</td>
                <td>{proj.start_date}</td>
                <td>{proj.end_date}</td>
                <td>{proj.budget}</td>
                <td>
                  <button onClick={() => handleEdit(proj)}>Edit</button>
                  <button onClick={() => handleDelete(proj.id)} style={{ background: "red", color: "#fff" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
        <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}

