import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Apply Dialog States
  const [openApply, setOpenApply] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();
  const { searchBar } = useContext(AuthContext);

  /* ---------------- GET JOBS ---------------- */
  useEffect(() => {
    axios
      .get("https://generateapi.techsnack.online/api/jobs", {
        headers: { Authorization: "byqZEYiNcf0n5qCM" },
      })
      .then((res) => setJobs(res.data.Data))
      .catch(() => toast.error("Failed to load jobs"))
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- FETCH APPLIED JOBS ---------------- */
  const fetchAppliedJobs = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios
      .get("https://generateapi.techsnack.online/api/applyJobs", {
        headers: { Authorization: "byqZEYiNcf0n5qCM" },
      })
      .then((res) => {
        const applied = res.data.Data.filter(
          (item) => String(item.userId) === String(userId),
        ).map((item) => String(item.jobId));
        setAppliedJobs(applied);
      });
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  /* ---------------- APPLY BUTTON CLICK ---------------- */
  const openApplyDialog = (jobId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login to apply");
      navigate("/login");
      return;
    }
    setJobId(jobId);
    setOpenApply(true);
  };

  /* ---------------- FINAL APPLY ---------------- */
  const handleFinalApply = () => {
    if (!name || !email || !resume) {
      toast.error("Please enter name & upload resume");
      return;
    }

    const userId = localStorage.getItem("userId");
    const formData = new FormData();

    formData.append("jobId", jobId);
    formData.append("userId", userId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("appliedAt", new Date().toISOString().split("T")[0]);
    formData.append("status", "pending");

    axios
      .post("https://generateapi.techsnack.online/api/applyJobs", formData, {
        headers: {
          Authorization: "byqZEYiNcf0n5qCM",
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Applied Successfully");
        setOpenApply(false);
        setName("");
        setEmail("");
        setResume(null);
        fetchAppliedJobs();
      })

      .catch(() => toast.error("Already applied"));
  };

  const isApplied = (jobId) => appliedJobs.includes(String(jobId));

  const filterSearch = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchBar.toLowerCase()) ||
      job.location.toLowerCase().includes(searchBar.toLowerCase()),
  );

  if (loading)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "#020617",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ minHeight: "100vh", background: "#020617", py: 6, mt:'50px'}}>
      <Typography
        sx={{
          color: "#fff",
          fontSize: 32,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Available Jobs
      </Typography>

      <Container>
        <Grid container spacing={3}>
          {filterSearch.map((job) => (
            <Grid key={job._id} size={{ md: 4, sm: 6, xs: 12 }}>
              <Card
                sx={{
                  background: "#020617",
                  border: "1px solid #1e293b",
                  mt: 4,
                }}
              >
                <CardContent>
                  <Typography sx={{ color: "#fff", fontSize: 20 }}>
                    {job.title}
                  </Typography>
                  <Typography sx={{ color: "#94a3b8" }}>
                    {job.company} • {job.location}
                  </Typography>
                  <Typography sx={{ color: "#cbd5e1", mt: 1 }}>
                    Job Type: {job.jobType}
                  </Typography>

                  <Button
                    fullWidth
                    disabled={isApplied(job._id)}
                    onClick={() => openApplyDialog(job._id)}
                    sx={{
                      mt: 2,
                      background: isApplied(job._id) ? "#16a34a" : "#2563eb",
                      color: "#fff",
                      fontWeight: 600,
                      "&:hover": {
                        background: isApplied(job._id) ? "#16a34a" : "#1d4ed8",
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

      {/* 🔥 APPLY DIALOG */}
      <Dialog open={openApply} onClose={() => setOpenApply(false)} fullWidth>
        <DialogTitle sx={{ textAlign: "center" }}>Apply for Job</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            placeholder="FullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button variant="outlined" component="label">
            Upload Resume (PDF)
            <input
              hidden
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </Button>

          {resume && (
            <Typography sx={{ color: "green", fontSize: 14 }}>
              {resume.name}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenApply(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleFinalApply}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
