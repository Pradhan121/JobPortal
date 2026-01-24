import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = () => {
    axios
      .post(
        "https://generateapi.techsnack.online/auth/login",
        { email, password },
        {
          headers: {
            Authorization: "byqZEYiNcf0n5qCM",
          },
        }
      )
      .then((res) => {
        const user = res.data.data;

        // 👇 ADMIN CHECK
        const role = user.email === "admin1@gmail.com" ? "admin" : "user";

        login(user.name, user._id, role);

        toast.success("Login Successfully");

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      })

      .catch((err) => {
        toast.error("Invalid Email or Password");
        console.log(err);
        setEmail("");
        setPassword("");
      });
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #020617, #0f172a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "380px",
          padding: "30px",
          background: "#020617",
          borderRadius: "12px",
          border: "1px solid #1e293b",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
          marginTop: "30px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: 600,
            mb: 1,
            textAlign: "center",
            fontSize: "32px",
          }}
        >
          Login
        </Typography>

        <Typography sx={{ color: "#94a3b8", mb: 3, textAlign: "center" }}>
          Welcome back! Please login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          InputLabelProps={{ style: { color: "#94a3b8" } }}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#334155" },
              "&:hover fieldset": { borderColor: "#2563eb" },
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          InputLabelProps={{ style: { color: "#94a3b8" } }}
          sx={{
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#334155" },
              "&:hover fieldset": { borderColor: "#2563eb" },
            },
          }}
        />

        <Button
          onClick={handleSubmit}
          fullWidth
          sx={{
            mt: 3,
            background: "#2563eb",
            color: "#fff",
            padding: "10px",
            fontWeight: 600,
            "&:hover": { background: "#1d4ed8" },
          }}
        >
          Login
        </Button>

        <Link
          to="/signup"
          style={{
            textDecoration: "none",
            color: "#94a3b8",
            textAlign: "center",
            marginTop: "24px",
            fontSize: "15px",
            display: "block",
          }}
        >
          Don’t have an account?
          <span style={{ color: "#2563eb", cursor: "pointer" }}>Sign up</span>
        </Link>
      </Box>
    </Box>
  );
}
