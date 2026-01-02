import { Box } from "@mui/material";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ minHeight: "100vh", background: "#020617", color: "#fff" }}>
      <AdminHeader/>
      <Box sx={{ pt: 10, px: 3}}>
        {children}
      </Box>
    </Box>
  );
}
