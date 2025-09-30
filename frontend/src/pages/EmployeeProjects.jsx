import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "../components/Form";
import { formatDate } from "../utils/FormatFunctions";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function EmployeeProjects() {
  const [employeeProjects, setEmployeeProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployeeProject, setEditingEmployeeProject] = useState(null);

  const apiUrl = "http://localhost:5002/api/employee-projects";

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

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Employee Projects
          </h1>

          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 text-lg">
                Loading employee project assignments...
              </p>
            </div>
          ) : showForm ? (
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <Form
                entity="employee-project"
                apiUrl={apiUrl}
                fields={[
                  { name: "employee_id", label: "Employee ID", type: "number" },
                  { name: "project_id", label: "Project ID", type: "number" },
                  { name: "role_in_project", label: "Role", type: "text" },
                  { name: "assigned_date", label: "Assigned Date", type: "date" },
                ]}
                initialData={editingEmployeeProject}
                onSuccess={() => {
                  setShowForm(false);
                  fetchEmployeeProjects();
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : employeeProjects.length > 0 ? (
            <div className="space-y-4">
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200">
                        Employee ID
                      </th>
                      <th className="px-4 py-3 border-b border-gray-200">
                        Project ID
                      </th>
                      <th className="px-4 py-3 border-b border-gray-200">
                        Role
                      </th>
                      <th className="px-4 py-3 border-b border-gray-200">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeProjects.map((empProj) => (
                      <tr
                        key={empProj.id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {empProj.id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {empProj.employee_id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {empProj.project_id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {empProj.role_in_project}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800 flex gap-2">
                          <button
                            onClick={() => handleEdit(empProj)}
                            className="p-1.5 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(empProj.id)}
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

              {/* Add button at bottom */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                <Plus size={18} /> Add Assignment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500">No employee project assignments found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                <Plus size={18} /> Add Assignment
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
