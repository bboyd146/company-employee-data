import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import { formatDate, formatCurrency } from "../utils/FormatFunctions";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState(null);

  const apiUrl = "http://localhost:5002/api/payroll";

  useEffect(() => {
    fetchPayrolls();
  }, []);

  async function fetchPayrolls() {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payroll entry?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchPayrolls();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Payroll</h1>

          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 text-lg">Loading payroll data...</p>
            </div>
          ) : showForm ? (
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
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
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200">Employee ID</th>
                      <th className="px-4 py-3 border-b border-gray-200">Pay Date</th>
                      <th className="px-4 py-3 border-b border-gray-200">Gross Salary</th>
                      <th className="px-4 py-3 border-b border-gray-200">Deductions</th>
                      <th className="px-4 py-3 border-b border-gray-200">Net Salary</th>
                      <th className="px-4 py-3 border-b border-gray-200">Payment Method</th>
                      <th className="px-4 py-3 border-b border-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrolls.map((pay) => (
                      <tr
                        key={pay.id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {pay.id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {pay.employee_id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {formatDate(pay.pay_date)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {formatCurrency(pay.gross_salary)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {formatCurrency(pay.deductions)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {formatCurrency(pay.net_salary)}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {pay.payment_method}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800 flex gap-2">
                          <button
                            onClick={() => handleEdit(pay)}
                            className="p-1.5 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(pay.id)}
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

              {/* Add Payroll button below table */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                <Plus size={18} /> Add Payroll
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500">No payroll records found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                <Plus size={18} /> Add Payroll
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
