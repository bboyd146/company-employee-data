import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployeeOverview() {
      try {
        const res = await axios.get("http://localhost:5001/api/reports/employee-overview");
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employee overview:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEmployeeOverview();
  }, []);

  if (loading) return <p>Loading employee overview...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Employee Overview</h1>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Role</th>
            <th>Department</th>
            <th>Location</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.first_name}</td>
              <td>{emp.last_name}</td>
              <td>{emp.role}</td>
              <td>{emp.department}</td>
              <td>{emp.location}</td>
              <td>{emp.project_name || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
