import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import { formatDate } from "../utils/FormatFunctions";
import { Menu, Plus, Edit2, Trash2 } from "lucide-react";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const apiUrl = "http://localhost:5002/api/employees";

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchEmployees();
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Employees</h1>

          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 text-lg">Loading employees...</p>
            </div>
          ) : showForm ? (
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
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
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200">First</th>
                      <th className="px-4 py-3 border-b border-gray-200">Last</th>
                      <th className="px-4 py-3 border-b border-gray-200">Role</th>
                      <th className="px-4 py-3 border-b border-gray-200">Manager</th>
                      <th className="px-4 py-3 border-b border-gray-200">Hire Date</th>
                      <th className="px-4 py-3 border-b border-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr
                        key={emp.id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">{emp.id}</td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">{emp.first_name}</td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">{emp.last_name}</td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">{emp.role_id}</td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">{emp.manager_id || "—"}</td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {formatDate(emp.hire_date)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800 flex gap-2">
                          <button
                            onClick={() => handleEdit(emp)}
                            className="p-1.5 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(emp.id)}
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

              {/* Add Employee button below table */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Plus size={18} /> Add Employee
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500">No employees found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Plus size={18} /> Add Employee
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
