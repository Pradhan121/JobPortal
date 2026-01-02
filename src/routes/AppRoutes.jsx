import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Jobs from "../pages/Jobs";
import AppliedJobs from "../pages/AppliedJobs";
import AdminRoute from "../components/admin/AdminRoute";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../components/admin/AdminLayout";
import Applicants from "../pages/admin/Applicants";
import Add_EditJob from "../pages/admin/Add_EditJob";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/applied" element={<AppliedJobs />} />
        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-job"
          element={
            <AdminRoute>
              <AdminLayout>
                <Add_EditJob />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/applicants"
          element={
            <AdminRoute>
              <Applicants />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}
