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
          `http://localhost:5002/api/reports/${selectedReport}`
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
// === Generate Metrics from Data ===
const generateMetrics = () => {
  if (!data || data.length === 0) return [];

  const metrics = [];

  // Helper: parse to number safely
  const parseNum = (val) => {
    if (val === null || val === undefined) return 0;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      // Remove $ , and whitespace
      return Number(val.replace(/[^0-9.-]+/g, "")) || 0;
    }
    return 0;
  };

  // Example: salary
  const salaryCol = Object.keys(data[0]).find((c) =>
    c.toLowerCase().includes("salary")
  );
  if (salaryCol) {
    const total = data.reduce((sum, row) => sum + parseNum(row[salaryCol]), 0);
    metrics.push({
      label: "Total Salary",
      value: formatCurrency(total),
    });
  }

  // Count rows
  metrics.push({
    label: "Total Records",
    value: data.length.toLocaleString(),
  });

  // Example: budget
  const budgetCol = Object.keys(data[0]).find((c) =>
    c.toLowerCase().includes("budget")
  );
  if (budgetCol) {
    const total = data.reduce((sum, row) => sum + parseNum(row[budgetCol]), 0);
    metrics.push({
      label: "Total Budget",
      value: formatCurrency(total),
    });
  }

  return metrics;
};
  const metrics = generateMetrics();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Reports</h2>
        <ul className="space-y-2 flex-1">
          {reportsList.map((report) => (
            <li key={report.key}>
              <button
                onClick={() => setSelectedReport(report.key)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                  report.key === selectedReport
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {report.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-semibold mb-6">
          {reportsList.find((r) => r.key === selectedReport)?.label}
        </h1>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading {selectedReport}...</p>
        ) : (
          <>
            {/* Metrics Cards */}
            {metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {metrics.map((m, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-start justify-center"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400">{m.label}</p>
                    <p className="text-2xl font-bold mt-2">{m.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Data Table */}
            {data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse bg-white dark:bg-gray-800 shadow rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                      {Object.keys(data[0]).map((col) => (
                        <th
                          key={col}
                          className="px-6 py-3 text-gray-700 dark:text-gray-200 font-medium"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b dark:border-gray-700 ${
                          i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : ""
                        }`}
                      >
                        {Object.entries(row).map(([col, val], j) => {
                          let displayValue = val;

                          if (col.toLowerCase().includes("date")) {
                            displayValue = formatDate(val);
                          }
                          if (
                            col.toLowerCase().includes("salary") ||
                            col.toLowerCase().includes("budget") ||
                            col.toLowerCase().includes("paid")
                          ) {
                            displayValue = formatCurrency(val);
                          }

                          return (
                            <td key={j} className="px-6 py-4">
                              {displayValue !== null
                                ? displayValue.toString()
                                : "—"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No data available</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
