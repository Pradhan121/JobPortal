import {
  AppBar,
  Box,
  Button,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { BsBriefcase } from "react-icons/bs";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const { user, logout,searchBar,setSearchBar} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar sx={{ background: "#0f172a" }} elevation={0}>
        <Toolbar sx={{ minHeight: "70px", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#2563eb",
            }}
          >
            <BsBriefcase size={25} />
            <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
              JobPortal
            </Typography>
          </Box>

          {/* Search */}
          <TextField
            size="small"
            placeholder="Search jobs..."
            value={searchBar}
            onChange={(e)=>setSearchBar(e.target.value)}
            sx={{ background: "#fff", borderRadius: "6px", width: "280px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", gap: "15px" }}>
            {!user ? (
              <>
                <Button component={RouterLink} to="/login"
                  variant="outlined"
                  sx={{ color: "#fff", borderColor: "#2563eb" }}
                >
                  Login
                </Button>
                <Button component={RouterLink} to="/signup"
                   variant="contained"
                   sx={{ background: "#2563eb" }}
                >
                  Signup
                </Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to="/jobs" sx={{ color: "#fff" }}>
                  Jobs
                </Button>
                <Button component={RouterLink} to="/applied" sx={{ color: "#fff" }}>
                  Applied
                </Button>
                <Button onClick={handleLogout} color="error" variant="contained">
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
