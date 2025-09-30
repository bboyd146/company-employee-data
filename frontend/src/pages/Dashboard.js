import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency, formatDate } from "../utils/FormatFunctions";

const reportsList = [
  { key: "employee-overview", label: "Employee Overview" },
  { key: "salary-by-department", label: "Salary by Department" },
  { key: "employee-managers", label: "Employees & Managers" },
  { key: "active-projects", label: "Active Projects" },
  { key: "department-budgets", label: "Department Budgets" },
  { key: "payroll-history", label: "Payroll History" },
  { key: "employees-multiple-projects", label: "Employees w/ Multiple Projects" },
  { key: "employees-by-location", label: "Employees by Location" },
  { key: "projects-over-budget", label: "Projects Over Budget" },
  { key: "payroll-by-method", label: "Payroll by Method" },
];

export default function Dashboard() {
  const [selectedReport, setSelectedReport] = useState("employee-overview");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5001/api/reports/${selectedReport}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [selectedReport]);

  if (loading) return <p>Loading {selectedReport}...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Reports Menu */}
      <div style={{ width: "250px", borderRight: "1px solid #ddd", padding: "1rem" }}>
        <h3>Reports</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {reportsList.map((report) => (
            <li key={report.key} style={{ margin: "0.5rem 0" }}>
              <button
                style={{
                  background: report.key === selectedReport ? "#007bff" : "transparent",
                  color: report.key === selectedReport ? "#fff" : "#000",
                  border: "none",
                  padding: "0.5rem 1rem",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedReport(report.key)}
              >
                {report.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Report Data */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1>{reportsList.find((r) => r.key === selectedReport)?.label}</h1>
        {data.length > 0 ? (
          <table
            border="1"
            cellPadding="8"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                {Object.keys(data[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.entries(row).map(([col, val], j) => {
                    let displayValue = val;

                  // format dates
                  if (col.toLowerCase().includes("date")) {
                    displayValue = formatDate(val);
                    }

                  // format salaries, budgets, payroll
                  if (
                  col.toLowerCase().includes("salary") ||
                  col.toLowerCase().includes("budget") ||
                  col.toLowerCase().includes("paid")
                  ) {
                    displayValue = formatCurrency(val);
                    }

                  return (
                  <td key={j}>
                    {displayValue !== null ? displayValue.toString() : "—"}
                  </td>
                  );
})}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
