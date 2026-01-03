import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { BsBriefcase } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate()
  const open = Boolean(anchorEl);

  const { logout } = useContext(AuthContext);  
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    setAnchorEl(null)
    navigate("/login");
  }; 
  return (
    <AppBar
      sx={{ background: "#020617", borderBottom: "4px solid #1e293b" }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BsBriefcase size={22} color="#2563eb" />
          <Typography fontWeight={600}>Admin Panel</Typography>
        </Box>

        {/* DESKTOP MENU */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button component={Link} to="/admin/dashboard"
            sx={{
                  color: "#e5e7eb",
                  px: 2,
                  borderRadius: "8px",

                  "&:hover": {
                    backgroundColor: "#1e293b",
                  },

                  "&.active": {
                    color: "#38bdf8",
                    backgroundColor: "#0f172a",
                    fontWeight: 600,
                  },
                }}      
          >
            Dashboard
          </Button>
          <Button component={Link} to="/admin/add-job"
            sx={{
                  color: "#e5e7eb",
                  px: 2,
                  borderRadius: "8px",

                  "&:hover": {
                    backgroundColor: "#1e293b",
                  },

                  "&.active": {
                    color: "#38bdf8",
                    backgroundColor: "#0f172a",
                    fontWeight: 600,
                  },
                }}      
          >
            Add Job
          </Button>
          <Button component={Link} to="/admin/applicants"
            sx={{
                  color: "#e5e7eb",
                  px: 2,
                  borderRadius: "8px",

                  "&:hover": {
                    backgroundColor: "#1e293b",
                  },

                  "&.active": {
                    color: "#38bdf8",
                    backgroundColor: "#0f172a",
                    fontWeight: 600,
                  },
                }}      
          >
            Applicants
          </Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Logout
          </Button>
        </Box>

        {/* MOBILE MENU */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Button onClick={handleMenuOpen} sx={{ color: "#fff" }}>
            ☰
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: "#020617",
                color: "#e5e7eb",
                minWidth: 180,
              },
            }}
          >
            <MenuItem
              component={Link}
              to="/admin/dashboard"
              onClick={handleMenuClose}
              sx={{
                  color: "#e5e7eb",
                  px: 2,
                  borderRadius: "8px",

                  "&:hover": {
                    backgroundColor: "#1e293b",
                  },

                  "&.active": {
                    color: "#38bdf8",
                    backgroundColor: "#0f172a",
                    fontWeight: 600,
                  },
                }}      
            >
              Dashboard
            </MenuItem>
            <MenuItem
              component={Link}
              to="/admin/add-job"
              onClick={handleMenuClose}
              sx={{
                  color: "#e5e7eb",
                  px: 2,
                  borderRadius: "8px",

                  "&:hover": {
                    backgroundColor: "#1e293b",
                  },

                  "&.active": {
                    color: "#38bdf8",
                    backgroundColor: "#0f172a",
                    fontWeight: 600,
                  },
                }}      
            >
              Add Job
            </MenuItem>
            <MenuItem
              component={Link}
              to="/admin/applicants"
              onClick={handleMenuClose}
              sx={{
                  color: "#e5e7eb",
                  px: 2,
                  borderRadius: "8px",

                  "&:hover": {
                    backgroundColor: "#1e293b",
                  },

                  "&.active": {
                    color: "#38bdf8",
                    backgroundColor: "#0f172a",
                    fontWeight: 600,
                  },
                }}      
            >
              Applicants
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{ color: "red" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
