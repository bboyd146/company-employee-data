import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import Modal from "../components/Modal";
import { Plus, Edit2, Trash2 } from "lucide-react";

  const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modal, setModal] = useState({
    open: false,
    type: "success", // success | error | confirm
    message: "",
    confirmAction: null,
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/locations`);
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

  const handleDelete = (id) => {
    setModal({
      open: true,
      type: "confirm",
      message: "Are you sure you want to delete this location?",
      confirmAction: async () => {
        try {
          await axios.delete(`${apiUrl}/${id}`);
          fetchLocations();
          setModal({
            open: true,
            type: "success",
            message: "Location deleted successfully.",
          });
        } catch (err) {
          console.error("Delete failed:", err);
          setModal({
            open: true,
            type: "error",
            message: "Failed to delete location.",
          });
        }
      },
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex flex-col dark:text-gray-200">
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Locations</h1>

          {loading ? (
            <div className="flex items-center justify-center h-64 animate-pulse">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Loading locations...</p>
            </div>
          ) : showForm ? (
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
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
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">ID</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">City</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">State</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">Country</th>
                      <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((loc) => (
                      <tr
                        key={loc.id}
                        className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                          {loc.id}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                          {loc.city}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                          {loc.state}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                          {loc.country}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100 flex gap-2">
                          <button
                            onClick={() => handleEdit(loc)}
                            className="p-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(loc.id)}
                            className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition"
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
                className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow hover:bg-green-700 dark:hover:bg-green-800 transition"
              >
                <Plus size={18} /> Add Location
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">No locations found.</p>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow hover:bg-green-700 dark:hover:bg-green-800 transition"
              >
                <Plus size={18} /> Add Location
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
