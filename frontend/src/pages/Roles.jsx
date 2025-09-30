import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import { formatCurrency } from "../utils/FormatFunctions";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchRoles();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Roles</h1>

          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 text-lg">Loading roles...</p>
            </div>
          ) : showForm ? (
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
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
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200">Title</th>
                      <th className="px-4 py-3 border-b border-gray-200">Salary</th>
                      <th className="px-4 py-3 border-b border-gray-200">Department ID</th>
                      <th className="px-4 py-3 border-b border-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role) => (
                      <tr
                        key={role.id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {role.id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {role.title}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {formatCurrency(role.salary)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {role.department_id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800 flex gap-2">
                          <button
                            onClick={() => handleEdit(role)}
                            className="p-1.5 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(role.id)}
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

              {/* Add Role button below table */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                <Plus size={18} /> Add Role
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500">No roles found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                <Plus size={18} /> Add Role
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
