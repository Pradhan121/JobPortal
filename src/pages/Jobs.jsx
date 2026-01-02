import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  const{searchBar} = useContext(AuthContext)
  /* ---------------- GET ALL JOBS ---------------- */
  useEffect(() => {
    axios
      .get("https://generateapi.techsnack.online/api/jobs", {
        headers: { Authorization: "byqZEYiNcf0n5qCM" },
      })
      .then((res) => setJobs(res.data.Data))
      .catch(() => toast.error("Failed to load jobs"));
  }, []);

  /* ---------------- FETCH APPLIED JOBS (if logged in) ---------------- */
  const fetchAppliedJobs = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios
      .get("https://generateapi.techsnack.online/api/appliedJobs", {
        headers: { Authorization: "byqZEYiNcf0n5qCM" },
      })
      .then((res) => {
        const applied = res.data.Data
          .filter((item) => item.userId === userId)
          .map((item) => String(item.jobId));

        setAppliedJobs(applied);
      })
      .catch(() => console.log("Applied jobs fetch failed"));
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  /* ---------------- APPLY JOB ---------------- */
  const handleApply = (jobId) => {
    const userId = localStorage.getItem("userId");

    // 🔐 Not logged in
    if (!userId) {
      toast.error("Please login to apply");
      navigate("/login");
      return;
    }

    axios
      .post(
        "https://generateapi.techsnack.online/api/appliedJobs",
        {
          jobId,
          userId,
          appliedAt: new Date().toISOString().split("T")[0],
          status: "pending",
        },
        {
          headers: { Authorization: "byqZEYiNcf0n5qCM" },
        }
      )
      .then(() => {
        toast.success("Applied Successfully");
        fetchAppliedJobs();
      })
      .catch(() => toast.error("Already applied"));
  };

  /* ---------------- CHECK APPLIED ---------------- */
  const isApplied = (jobId) =>{
    return appliedJobs.includes(String(jobId));
  }
    
  const filterSearch = jobs.filter((jobSearch)=>
    jobSearch.title.toLowerCase().includes(searchBar.toLowerCase()) ||
    jobSearch.location.toLowerCase().includes(searchBar.toLowerCase())
  )
  return (
    <Box sx={{ minHeight: "100vh", background: "#020617", py: 6 }}>
      <Typography
        sx={{
          color: "#fff",
          fontSize: "32px",
          fontWeight: 700,
          textAlign: "center",
          mt: 4,
        }}
      >
        Available Jobs
      </Typography>

      <Container>
        <Grid container spacing={3}>
          {filterSearch.map((job) => (
            <Grid key={job._id} size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
              <Card
                sx={{
                  background: "#020617",
                  border: "1px solid #1e293b",
                  borderRadius: "12px",
                  transition: "0.3s",
                  mt:4,
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: "#2563eb",
                  },
                }}
              >
                <CardContent>
                  <Typography sx={{ color: "#fff", fontSize: 20, mb: 1 }}>
                    {job.title}
                  </Typography>

                  <Typography sx={{ color: "#94a3b8" }}>
                    {job.company} • {job.location}
                  </Typography>

                  <Typography sx={{ color: "#cbd5e1", mt: 1 }}>
                    Experience: {job.experience}
                  </Typography>

                  <Typography sx={{ color: "#cbd5e1" }}>
                    Job Type: {job.jobType}
                  </Typography>
                  <Typography
                      sx={{ color: "#64748b", fontSize: "14px", mt: 1 }}
                    >
                      Posted on: {job.postedAt?.split("T")[0]}
                    </Typography>
                  <Button
                    fullWidth
                    disabled={isApplied(job._id)}
                    onClick={() => handleApply(job._id)}
                    sx={{
                      mt: 2,
                      background: isApplied(job._id)
                        ? "#16a34a"
                        : "#2563eb",
                      color: "#fff",
                      fontWeight: 600,
                      "&:hover": {
                        background: isApplied(job._id)
                          ? "#16a34a"
                          : "#1d4ed8",
                      },
                      "&.Mui-disabled": {
                        background: "#16a34a",
                        color: "#fff",
                        WebkitTextFillColor: "#fff",
                      },
                    }}
                  >
                    {isApplied(job._id) ? "Applied" : "Apply Now"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
