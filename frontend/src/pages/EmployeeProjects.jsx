import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "../components/Form";
import Modal from "../components/Modal";
import { formatDate } from "../utils/FormatFunctions";
import { Plus, Edit2, Trash2 } from "lucide-react";

  const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export default function EmployeeProjects() {
  const [employeeProjects, setEmployeeProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployeeProject, setEditingEmployeeProject] = useState(null);

  // Modal state
  const [modal, setModal] = useState({
    open: false,
    type: "success", // success | error | confirm
    message: "",
    confirmAction: null,
  });


  useEffect(() => {
    fetchEmployeeProjects();
  }, []);

  async function fetchEmployeeProjects() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/employee-projects`);
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

  const handleDelete = (id) => {
    setModal({
      open: true,
      type: "confirm",
      message: "Are you sure you want to delete this employee project assignment?",
      confirmAction: async () => {
        try {
          await axios.delete(`${apiUrl}/${id}`);
          fetchEmployeeProjects();
          setModal({
            open: true,
            type: "success",
            message: "Assignment deleted successfully.",
          });
        } catch (err) {
          console.error("Delete failed:", err);
          setModal({
            open: true,
            type: "error",
            message: "Failed to delete assignment.",
          });
        }
      },
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6 dark:text-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Employee Projects
          </h1>

          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Loading employee project assignments...
              </p>
            </div>
          ) : showForm ? (
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
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
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                        Employee ID
                      </th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                        Project ID
                      </th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                        Role
                      </th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeProjects.map((empProj) => (
                      <tr
                        key={empProj.id}
                        className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          {empProj.id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          {empProj.employee_id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          {empProj.project_id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          {empProj.role_in_project}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 flex gap-2">
                          <button
                            onClick={() => handleEdit(empProj)}
                            className="p-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(empProj.id)}
                            className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition"
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
                className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow hover:bg-green-700 dark:hover:bg-green-800 transition"
              >
                <Plus size={18} /> Add Assignment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">No employee project assignments found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow hover:bg-green-700 dark:hover:bg-green-800 transition"
              >
                <Plus size={18} /> Add Assignment
              </button>
            </div>
          )}

          {modal.open && (
            <Modal
              type={modal.type}
              message={modal.message}
              onClose={() => setModal({ ...modal, open: false })}
              onConfirm={modal.confirmAction}
            />
          )}
        </main>
      </div>
    </div>
  );
}
