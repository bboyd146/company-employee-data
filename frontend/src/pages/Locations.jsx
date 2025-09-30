import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function LocationsPage() {
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
    } catch (err) {
      console.error("Error fetching locations:", err);
    } finally {
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

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Locations</h1>

          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 text-lg">Loading locations...</p>
            </div>
          ) : showForm ? (
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <Form
                entity="Location"
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
            </div>
          ) : locations.length > 0 ? (
            <div className="space-y-4">
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200">City</th>
                      <th className="px-4 py-3 border-b border-gray-200">State</th>
                      <th className="px-4 py-3 border-b border-gray-200">Country</th>
                      <th className="px-4 py-3 border-b border-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((loc) => (
                      <tr
                        key={loc.id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {loc.id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {loc.city}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {loc.state}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800">
                          {loc.country}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 text-gray-800 flex gap-2">
                          <button
                            onClick={() => handleEdit(loc)}
                            className="p-1.5 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(loc.id)}
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

              {/* Add Location button below table */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                <Plus size={18} /> Add Location
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500">No locations found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                <Plus size={18} /> Add Location
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
