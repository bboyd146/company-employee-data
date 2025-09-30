import { useState, useEffect } from "react";
import axios from "axios";

export default function Form({ entity, fields, apiUrl, initialData, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
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
        <form onSubmit={handleSubmit}>
            <h2>{initialData ? `Edit ${entity}` : `Add ${entity}`}</h2>

            {fields.map((field) => (
                <label key={field.name}>
                    {field.label}:
                    <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        required={field.required}
                    />
                </label>
            ))}

            <div>
                <button type="submit">{initialData ? "Update" : "Create"}</button>
                {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
            </div>
        </form>
    );
}
