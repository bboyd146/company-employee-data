import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, Plus, Edit2, Trash2 } from "lucide-react";
import Form from "../components/Form";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Departments</h2>

          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 text-lg">Loading departments...</p>
            </div>
          ) : showForm ? (
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <Form
                entity="Department"
                apiUrl={apiUrl}
                fields={[
                  {
                    name: "dep_name",
                    label: "Department Name",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "location_id",
                    label: "Location ID",
                    type: "number",
                    required: true,
                  },
                ]}
                initialData={editingDepartment}
                onSuccess={() => {
                  fetchDepartments();
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : departments.length > 0 ? (
            <div className="space-y-4">
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200">Department Name</th>
                      <th className="px-4 py-3 border-b border-gray-200">Location ID</th>
                      <th className="px-4 py-3 border-b border-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dep) => (
                      <tr
                        key={dep.id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">{dep.id}</td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">{dep.dep_name}</td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">{dep.location_id}</td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800 flex gap-2">
                          <button
                            onClick={() => handleEdit(dep)}
                            className="p-1.5 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(dep.id)}
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

              {/* Add Department button below the table */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Plus size={18} /> Add Department
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500">No departments found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Plus size={18} /> Add Department
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
