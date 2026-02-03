import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import background from "../assets/videos/background.mp4";

export default function LandingPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    if (token) return <Navigate to="/dashboard" replace />;

  return (
    <div className="font-inter text-slate-900">
      {/* ================= HERO ================= */}
      <header className="relative min-h-[72vh] flex items-center justify-center overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          src={background}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
        />

        {/* Hue / color overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-slate-900/60 to-indigo-900/70 mix-blend-multiply" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl px-6 text-center text-white">
          <h1 className="font-semibold leading-tight text-4xl sm:text-5xl lg:text-6xl">
            Simple, secure employee data for your team
          </h1>

          <p className="mt-5 text-lg text-slate-200 max-w-2xl mx-auto">
            Manage employee records, permissions, and reports in one lightweight app.
            Fast setup, powerful controls, and privacy-first defaults.
          </p>

          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate("/login")}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg text-base font-medium shadow-lg transition"
            >
              Get started — Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded-lg border border-white/30 text-white bg-white/10 backdrop-blur hover:bg-white/20 transition"
            >
              Sign up
            </button>
          </div>

          <p className="mt-4 text-sm text-slate-300">
            New here?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-teal-300 hover:text-teal-200 underline underline-offset-2"
            >
              Try a demo login
            </button>{" "}
            or{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-teal-300 hover:text-teal-200 underline underline-offset-2"
            >
              create an account
            </button>.
          </p>
        </div>
      </header>

      {/* ================= FEATURES ================= */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
            <strong className="block mb-2 text-slate-900">
              Employee profiles
            </strong>
            <p className="text-slate-600">
              Centralized records for contact details, role, and status.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
            <strong className="block mb-2 text-slate-900">
              Access control
            </strong>
            <p className="text-slate-600">
              Role-based permissions to protect sensitive data.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
            <strong className="block mb-2 text-slate-900">
              Reports & exports
            </strong>
            <p className="text-slate-600">
              Export CSVs or run quick analytics across your org.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
