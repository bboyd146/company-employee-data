import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import Modal from "../components/Modal";
import { formatDate, formatCurrency } from "../utils/FormatFunctions";
import { Plus, Edit2, Trash2 } from "lucide-react";

  const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState(null);

  // Modal state
  const [modal, setModal] = useState({
    open: false,
    type: "success", // success | error | confirm
    message: "",
    confirmAction: null,
  });

  useEffect(() => {
    fetchPayrolls();
  }, []);

  async function fetchPayrolls() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/payroll`);
      setPayrolls(res.data);
    } catch (err) {
      console.error("Error fetching payrolls:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = () => {
    setEditingPayroll(null);
    setShowForm(true);
  };

  const handleEdit = (payroll) => {
    setEditingPayroll(payroll);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setModal({
      open: true,
      type: "confirm",
      message: "Are you sure you want to delete this payroll entry?",
      confirmAction: async () => {
        try {
          await axios.delete(`${apiUrl}/${id}`);
          fetchPayrolls();
          setModal({
            open: true,
            type: "success",
            message: "Payroll entry deleted successfully.",
          });
        } catch (err) {
          console.error("Delete failed:", err);
          setModal({
            open: true,
            type: "error",
            message: "Failed to delete payroll entry.",
          });
        }
      },
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6 dark:text-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Payroll</h1>

          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Loading payroll data...</p>
            </div>
          ) : showForm ? (
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <Form
                entity="Payroll"
                apiUrl={apiUrl}
                fields={[
                  { name: "employee_id", label: "Employee ID", type: "number" },
                  { name: "salary", label: "Salary", type: "number" },
                  { name: "bonus", label: "Bonus", type: "number" },
                  { name: "deductions", label: "Deductions", type: "number" },
                  { name: "pay_date", label: "Pay Date", type: "date" },
                ]}
                initialData={editingPayroll}
                onSuccess={() => {
                  fetchPayrolls();
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : payrolls.length > 0 ? (
            <div className="space-y-4">
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Employee ID</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Pay Date</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Gross Salary</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Deductions</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Net Salary</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Payment Method</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrolls.map((pay) => (
                      <tr
                        key={pay.id}
                        className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          {pay.id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          {pay.employee_id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          {formatDate(pay.pay_date)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          {formatCurrency(pay.gross_salary)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          {formatCurrency(pay.deductions)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          {formatCurrency(pay.net_salary)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                          {pay.payment_method}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 flex gap-2">
                          <button
                            onClick={() => handleEdit(pay)}
                            className="p-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(pay.id)}
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

              {/* Add Payroll button below table */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
              >
                <Plus size={18} /> Add Payroll
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">No payroll records found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
              >
                <Plus size={18} /> Add Payroll
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
