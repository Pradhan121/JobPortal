import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { BsBriefcase } from "react-icons/bs";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const { user, logout, searchBar, setSearchBar } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    setAnchorEl(null)
    navigate("/");
  };

  return (
    <AppBar sx={{ background: "#0f172a" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BsBriefcase size={22} color="#2563eb" />
          <Typography fontSize={22} fontWeight={600}>
            JobPortal
          </Typography>
        </Box>

        {/* SEARCH - DESKTOP ONLY */}
        <TextField
          size="small"
          placeholder="Search jobs..."
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          sx={{
            display: { xs: "none", md: "block" },
            background: "#fff",
            borderRadius: "6px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* DESKTOP RIGHT MENU */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {!user ? (
            <>
              <Button
                component={NavLink}
                to="/login"
                variant="outlined"
                sx={{ color: "#fff", borderColor: "#2563eb" }}
              >
                Login
              </Button>
              <Button
                component={NavLink}
                to="/signup"
                variant="contained"
                sx={{ background: "#2563eb" }}
              >
                Signup
              </Button>
            </>
          ) : (
            <>
              <Button component={NavLink} to="/"
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
              >Home</Button>
              <Button component={NavLink} to="/jobs"
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
              >Jobs</Button>
              <Button component={NavLink} to="/applied"
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
              >Applied</Button>
              <Button onClick={handleLogout} color="error" variant="contained">
                Logout
              </Button>
            </>
          )}
        </Box>

        {/* MOBILE MENU BUTTON */}
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
                minWidth: 160,
              },
            }}
          >
            {!user ? (
              <>
                <MenuItem
                  component={NavLink}
                  to="/login"
                  onClick={handleMenuClose}
                >
                  Login
                </MenuItem>
                <MenuItem
                  component={NavLink}
                  to="/signup"
                  onClick={handleMenuClose}
                >
                  Signup
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem component={NavLink} to="/" onClick={handleMenuClose}
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
                  Home
                </MenuItem>
                <MenuItem component={NavLink} to="/jobs" onClick={handleMenuClose}
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
                  Jobs
                </MenuItem>
                <MenuItem
                  component={NavLink}
                  to="/applied"
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
                  Applied
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                  Logout
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
