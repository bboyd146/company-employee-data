import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import Modal from "../components/Modal";
import { formatCurrency } from "../utils/FormatFunctions";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // Modal state
  const [modal, setModal] = useState({
    open: false,
    type: "success", // success | error | confirm
    message: "",
    confirmAction: null,
  });

  const apiUrl = "http://localhost:5002/api/roles";

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

  const handleDelete = (id) => {
    setModal({
      open: true,
      type: "confirm",
      message: "Are you sure you want to delete this role?",
      confirmAction: async () => {
        try {
          await axios.delete(`${apiUrl}/${id}`);
          fetchRoles();
          setModal({
            open: true,
            type: "success",
            message: "Role deleted successfully.",
          });
        } catch (err) {
          console.error("Delete failed:", err);
          setModal({
            open: true,
            type: "error",
            message: "Failed to delete role.",
          });
        }
      },
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex flex-col dark:text-gray-200">
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Roles</h1>

          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Loading roles...</p>
            </div>
          ) : showForm ? (
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <Form
                entity="Role"
                apiUrl={apiUrl}
                fields={[
                  { name: "title", label: "Title", type: "text", required: true },
                  { name: "salary", label: "Salary", type: "number", required: true },
                  { name: "department_id", label: "Department ID", type: "number", required: true },
                ]}
                initialData={editingRole}
                onSuccess={() => {
                  fetchRoles();
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : roles.length > 0 ? (
            <div className="space-y-4">
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Title</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Salary</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Department ID</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role) => (
                      <tr
                        key={role.id}
                        className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-300">
                          {role.id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-300">
                          {role.title}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-300">
                          {formatCurrency(role.salary)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-300">
                          {role.department_id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 flex gap-2 dark:text-gray-300">
                          <button
                            onClick={() => handleEdit(role)}
                            className="p-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(role.id)}
                            className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Role button below table */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow hover:bg-green-700 dark:hover:bg-green-800 transition"
              >
                <Plus size={18} /> Add Role
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">No roles found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow hover:bg-green-700 dark:hover:bg-green-800 transition"
              >
                <Plus size={18} /> Add Role
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
