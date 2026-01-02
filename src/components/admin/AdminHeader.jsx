import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { BsBriefcase } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function AdminHeader() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar sx={{ background: "#020617", borderBottom: "4px solid #1e293b"}} elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BsBriefcase size={22} color="#2563eb" />
          <Typography sx={{ fontWeight: 600 }}>
            Admin Panel
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/admin/dashboard" sx={{ color: "#fff" }}>
            Dashboard
          </Button>
          <Button component={Link} to="/admin/add-job" sx={{ color: "#fff" }}>
            Add Job
          </Button>
          <Button component={Link} to="/admin/applicants" sx={{ color: "#fff" }}>
            Applicants
          </Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
