import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import Modal from "../components/Modal";
import { formatDate } from "../utils/FormatFunctions";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Modal state
  const [modal, setModal] = useState({
    open: false,
    type: "success", // success | error | confirm
    message: "",
    confirmAction: null, // function to call on confirm
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";


  const apiUrl = `${API_BASE_URL}/employees`;

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setModal({
      open: true,
      type: "confirm",
      message: "Are you sure you want to delete this employee?",
      confirmAction: async () => {
        try {
          await axios.delete(`${apiUrl}/${id}`);
          fetchEmployees();
          setModal({
            open: true,
            type: "success",
            message: "Employee deleted successfully.",
          });
        } catch (err) {
          console.error("Delete failed:", err);
          setModal({
            open: true,
            type: "error",
            message: "Failed to delete employee.",
          });
        }
      },
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col dark:text-gray-200">
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Employees</h2>
          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Loading employees...</p>
            </div>
          ) : showForm ? (
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <Form
                entity="Employee"
                apiUrl={apiUrl}
                fields={[
                  { name: "first_name", label: "First Name", type: "text", required: true },
                  { name: "last_name", label: "Last Name", type: "text", required: true },
                  { name: "role_id", label: "Role ID", type: "number", required: true },
                  { name: "manager_id", label: "Manager ID", type: "number", required: false },
                  { name: "hire_date", label: "Hire Date", type: "date", required: true },
                ]}
                initialData={editingEmployee}
                onSuccess={() => {
                  fetchEmployees();
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : employees.length > 0 ? (
            <div className="space-y-4">
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">First</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Last</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Role</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Manager</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Hire Date</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr
                        key={emp.id}
                        className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-300">{emp.id}</td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-300">{emp.first_name}</td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-300">{emp.last_name}</td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-300">{emp.role_id}</td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-300">{emp.manager_id || "—"}</td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-300">
                          {formatDate(emp.hire_date)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-300 flex gap-2">
                          <button
                            onClick={() => handleEdit(emp)}
                            className="p-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(emp.id)}
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
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Plus size={18} /> Add Employee
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">No employees found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Plus size={18} /> Add Employee
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
