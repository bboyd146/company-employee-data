import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency, formatDate } from "../utils/FormatFunctions";
import { Menu } from "lucide-react"; // for hamburger menu

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Desktop + Mobile) */}
      <aside
        className={`fixed md:static z-20 inset-y-0 left-0 transform md:translate-x-0 w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Reports</h3>
        </div>
        <ul className="p-2 space-y-1">
          {reportsList.map((report) => (
            <li key={report.key}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                  report.key === selectedReport
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
                onClick={() => {
                  setSelectedReport(report.key);
                  setSidebarOpen(false);
                }}
              >
                {report.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-blue-600 text-white px-4 py-3 shadow-md">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Company Database Portal</h1>
          <div></div>
        </header>

        {/* Report Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 text-lg">
                Loading {reportsList.find((r) => r.key === selectedReport)?.label}...
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {reportsList.find((r) => r.key === selectedReport)?.label}
              </h2>

              {data.length > 0 ? (
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                      <tr>
                        {Object.keys(data[0]).map((col) => (
                          <th key={col} className="px-4 py-3 border-b border-gray-200">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-blue-50 transition-colors duration-150"
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
                              <td
                                key={j}
                                className="px-4 py-2 border-b border-gray-100 text-gray-800"
                              >
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
                <p className="text-gray-500">No data available</p>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
