import {React, useEffect, useState} from 'react';
import axios from 'axios';
import Form from '../components/Form';


export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = "http://localhost:5002/api/locations";

  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setLocations(res.data);
    }
    catch (err) {
      console.error("Error fetching locations:", err);
    }
    finally {
      setLoading(false);
    }
  }

  const handleAdd = () => {
    setEditingLocation(null);
    setShowForm(true);
  };

  const handleEdit = (loc) => {
    setEditingLocation(loc);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this location?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchLocations();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading locations...</p>;
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Menu */}
      <div style={{ width: "250px", borderRight: "1px solid #ddd", padding: "1rem" }}>
        <h3>Locations</h3>
        <button
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginBottom: "1rem",
            width: "100%",
          }}
          onClick={handleAdd}
        >
          Add Location
        </button>
</div>

{/* Main Content */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <h2>Locations</h2>

        {showForm ? (
          <Form
            entity="location"
            apiUrl={apiUrl}
            fields={[
              { name: "city", label: "City", type: "text", required: true },
              { name: "state", label: "State", type: "text", required: true },
              { name: "country", label: "Country", type: "text", required: true },
            ]}
            initialData={editingLocation}
            onSuccess={() => {
              setShowForm(false);
              fetchLocations();
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
locations.length > 0 ? (
          <table
            border="1"
            cellPadding="8"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => (
                <tr key={loc.id}>
                  <td>{loc.id}</td>
                  <td>{loc.city}</td>
                  <td>{loc.state}</td>
                  <td>{loc.country}</td>
                  <td>
                    <button onClick={() => handleEdit(loc)}>Edit</button>
                    <button onClick={() => handleDelete(loc.id)} style={{background: "red", color: "#fff"}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No locations found.</p>
        )
        )}
      </div>
    </div>
  );
}

