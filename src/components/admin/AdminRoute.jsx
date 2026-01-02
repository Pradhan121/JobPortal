import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";

export default function AdminRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ padding: 0,minHeight:'100vh'}}>
      {children}
    </Box>
  );
}
