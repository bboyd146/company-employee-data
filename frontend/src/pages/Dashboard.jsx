import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency, formatDate } from "../utils/FormatFunctions";
import { Menu } from "lucide-react"; // Hamburger for mobile sidebar

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

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export default function Dashboard() {
  console.log("API_BASE_URL:", import.meta.env.VITE_API_URL || "/api");

  const [selectedReport, setSelectedReport] = useState("employee-overview");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/reports/${selectedReport}`
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

  // === Generate Metrics ===
  const generateMetrics = () => {
    if (!data || data.length === 0) return [];
    const metrics = [];
    const parseNum = (val) => {
      if (!val) return 0;
      if (typeof val === "number") return val;
      return Number(val.toString().replace(/[^0-9.-]+/g, "")) || 0;
    };

    const salaryCol = Object.keys(data[0]).find((c) =>
      c.toLowerCase().includes("salary")
    );
    if (salaryCol) {
      const total = data.reduce((sum, row) => sum + parseNum(row[salaryCol]), 0);
      metrics.push({ label: "Total Salary", value: formatCurrency(total) });
    }

    metrics.push({ label: "Total Records", value: data.length.toLocaleString() });

    const budgetCol = Object.keys(data[0]).find((c) =>
      c.toLowerCase().includes("budget")
    );
    if (budgetCol) {
      const total = data.reduce((sum, row) => sum + parseNum(row[budgetCol]), 0);
      metrics.push({ label: "Total Budget", value: formatCurrency(total) });
    }

    return metrics;
  };

  const metrics = generateMetrics();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-20 inset-y-0 left-0 transform md:translate-x-0 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Reports</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
        <ul className="p-2 space-y-1">
          {reportsList.map((report) => (
            <li key={report.key}>
              <button
                onClick={() => {
                  setSelectedReport(report.key);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                  report.key === selectedReport
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-700"
                }`}
              >
                {report.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col dark:text-gray-200">
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 md:hidden flex justify-between items-center bg-white dark:bg-gray-800 shadow">
          <h1 className="font-semibold text-lg">{reportsList.find((r) => r.key === selectedReport)?.label}</h1>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Loading {reportsList.find((r) => r.key === selectedReport)?.label}...
              </p>
            </div>
          ) : (
            <>
              {/* Metrics */}
              {metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {metrics.map((m, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition"
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400">{m.label}</p>
                      <p className="text-2xl font-bold mt-2 dark:text-gray-200">{m.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Data Table */}
              {data.length > 0 ? (
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs">
                      <tr>
                        {Object.keys(data[0]).map((col) => (
                          <th key={col} className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150"
                        >
                          {Object.entries(row).map(([col, val], j) => {
                            let displayValue = val;
                            if (col.toLowerCase().includes("date")) displayValue = formatDate(val);
                            if (["salary", "budget", "paid"].some((k) => col.toLowerCase().includes(k))) {
                              displayValue = formatCurrency(val);
                            }
                            return (
                              <td key={j} className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                                {displayValue !== null ? displayValue.toString() : "—"}
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
    </div>
  );
}
