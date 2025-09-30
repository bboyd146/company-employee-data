import { useState, useEffect } from "react";
import axios from "axios";

export default function Form({
entity,
fields,
apiUrl,
initialData,
onSuccess,
onCancel,
}) {
const [formData, setFormData] = useState({});

useEffect(() => {
    if (initialData) {
    setFormData(initialData);
    } else {
    setFormData(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );
    }
}, [initialData, fields]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    if (initialData?.id) {
        await axios.put(`${apiUrl}/${initialData.id}`, formData);
    } else {
        await axios.post(apiUrl, formData);
    }
    onSuccess();
    } catch (err) {
    console.error(err);
    alert("Something went wrong!");
    }
};

return (
    <form
    onSubmit={handleSubmit}
    className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
    <h2 className="text-xl font-semibold text-gray-800">
        {initialData ? `Edit ${entity}` : `Add ${entity}`}
    </h2>

    {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
            {field.label}
        </label>
        <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        </div>
    ))}

    <div className="flex space-x-2">
        <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
        {initialData ? "Update" : "Create"}
        </button>
        {onCancel && (
        <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
            Cancel
        </button>
        )}
    </div>
    </form>
);
}
