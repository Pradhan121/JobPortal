import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

  const navigate = useNavigate('')

  const handleSubmit=()=>{
    axios.post('https://generateapi.techsnack.online/auth/signUp',{name,email,password},{
      headers: {
        Authorization: 'byqZEYiNcf0n5qCM'
      }
    })
    .then(()=>{
      toast.success('Account created successfully');
      navigate('/login')
    })
    .catch((error)=>{
      console.log(error)
    })
  }
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
          width: "400px",
          padding: "30px",
          background: "#020617",
          borderRadius: "12px",
          border: "1px solid #1e293b",
          marginTop:'40px'
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#fff", fontWeight: 600, mb: 1,textAlign:'center',fontSize:'32px' }}
        >
          Create Account
        </Typography>

        <TextField
          fullWidth
          label="userName"
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
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
          label="Email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
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
          onChange={(e)=>setPassword(e.target.value)}
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

        <Button onClick={handleSubmit}
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
          Sign Up
        </Button>

        <Link to='/login'
          style={{
            textDecoration:'none',
            color: "#94a3b8",
            textAlign: "center",
            marginTop:'24px',
            fontSize: "15px",
            display:'block'
          }}
        >
          Already have an account?{" "}
          <span style={{ color: "#2563eb", cursor: "pointer" }}>
            Login
          </span>
        </Link>
      </Box>
    </Box>
  );
}
