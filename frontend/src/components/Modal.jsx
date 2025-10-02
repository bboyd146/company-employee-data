import React from "react";
import { X, CheckCircle2, AlertTriangle } from "lucide-react";

export default function Modal({ type = "success", message, onClose }) {
    const icon =
        type === "success" ? (
            <CheckCircle2 className="text-green-500 w-10 h-10" />
        ) : (
            <AlertTriangle className="text-red-500 w-10 h-10" />
        );

    const title = type === "success" ? "Success" : "Error";

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fadeIn">
                <div className="flex items-start gap-4">
                    {icon}
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                        <p className="text-gray-600 mt-1">{message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
