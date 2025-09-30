import {React, useEffect, useState} from 'react';
import axios from 'axios';
import Form from '../components/Form';
import { formatDate, formatCurrency } from '../utils/FormatFunctions';

export default function Payroll() {
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

  if (loading) return <p>Loading payroll data...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Menu */}
      <div style={{ width: "250px", borderRight: "1px solid #ddd", padding: "1rem" }}>
        <h3>Payroll</h3>
        <button
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
          onClick={handleAdd}
        >
          + Add Payroll
        </button>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: "2rem" }}>
          <h1>Payroll</h1>

          {showForm ? (
            <Form
              entity="payroll"
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
          ) : payrolls.length > 0 ? (
            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee ID</th>
                  <th>Pay Date</th>
                  <th>Gross Salary</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                  <th>Payment Method</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map((pay) => (
                  <tr key={pay.id}>
                    <td>{pay.id}</td>
                    <td>{pay.employee_id}</td>
                    <td>{formatDate(pay.pay_date)}</td>
                    <td>{formatCurrency(pay.gross_salary)}</td>
                    <td>{formatCurrency(pay.deductions)}</td>
                    <td>{formatCurrency(pay.net_salary)}</td>
                    <td>{pay.payment_method}</td>
                    <td>
                      <button onClick={() => handleEdit(pay)}>Edit</button>
                      <button onClick={() => handleDelete(pay.id)} style={{ marginLeft: "0.5rem", color: "#fff", background: "red" }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No payroll records found.</p>
          )}
        </div>  
    </div>
  );
}

