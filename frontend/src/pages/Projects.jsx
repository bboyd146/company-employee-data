import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import { formatDate, formatCurrency } from "../utils/FormatFunctions";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = "http://localhost:5002/api/projects";

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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Projects</h1>

          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 text-lg">Loading projects...</p>
            </div>
          ) : showForm ? (
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <Form
                entity="Project"
                apiUrl={apiUrl}
                fields={[
                  { name: "project_name", label: "Project Name", type: "text", required: true },
                  { name: "description", label: "Description", type: "text", required: false },
                  { name: "start_date", label: "Start Date", type: "date", required: true },
                  { name: "end_date", label: "End Date", type: "date", required: true },
                  { name: "budget", label: "Budget", type: "number", required: true },
                ]}
                initialData={editingProject}
                onSuccess={() => {
                  fetchProjects();
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : projects.length > 0 ? (
            <div className="space-y-4">
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200">Name</th>
                      <th className="px-4 py-3 border-b border-gray-200">Start Date</th>
                      <th className="px-4 py-3 border-b border-gray-200">End Date</th>
                      <th className="px-4 py-3 border-b border-gray-200">Budget</th>
                      <th className="px-4 py-3 border-b border-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((proj) => (
                      <tr
                        key={proj.id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">{proj.id}</td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">{proj.project_name}</td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {formatDate(proj.start_date)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {formatDate(proj.end_date)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {formatCurrency(proj.budget)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800 flex gap-2">
                          <button
                            onClick={() => handleEdit(proj)}
                            className="p-1.5 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(proj.id)}
                            className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Project button below table */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Plus size={18} /> Add Project
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500">No projects found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Plus size={18} /> Add Project
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
