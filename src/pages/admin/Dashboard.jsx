import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [totalJobs, setTotalJobs] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [closedJobs, setClosedJobs] = useState(0);
  const [applicants, setApplicants] = useState(0);

  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://generateapi.techsnack.online/api/jobs", {
        headers: { Authorization: "byqZEYiNcf0n5qCM" },
      })
      .then((res) => setJobs(res.data.Data));
  }, []);

  const handleEdit = (job) => {
  localStorage.setItem("editJobData", JSON.stringify(job));
  navigate("/admin/add-job");
};


  useEffect(() => {
    // 🔹 Jobs count
    axios
      .get("https://generateapi.techsnack.online/api/jobs", {
        headers: { Authorization: "byqZEYiNcf0n5qCM" },
      })
      .then((res) => {
        const jobs = res.data.Data;

        setTotalJobs(jobs.length);
        setActiveJobs(jobs.filter((j) => j.status !== "Closed").length);
        setClosedJobs(jobs.filter((j) => j.status === "Closed").length);
      });

    // 🔹 Applicants count
    axios
      .get("https://generateapi.techsnack.online/api/appliedJobs", {
        headers: { Authorization: "byqZEYiNcf0n5qCM" },
      })
      .then((res) => {
        setApplicants(res.data.Data.length);
      });
  }, []);

  const StatCard = ({ title, value }) => (
    <Card sx={{ background: "#fff", borderRadius: 2 }}>
      <CardContent>
        <Typography sx={{ color: "#475569", fontSize: 14 }}>{title}</Typography>
        <Typography sx={{ fontSize: 28, fontWeight: 700 }}>{value}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Box sx={{ marginTop: "25px" }}>
        <Typography sx={{ fontSize: 28, fontWeight: 700, mb: 4 }}>
          Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ md: 4, xs: 12 }}>
            <StatCard title="Total Jobs" value={totalJobs} />
          </Grid>

          <Grid size={{ md: 4, xs: 12 }}>
            <StatCard title="Applicants" value={applicants} />
          </Grid>

          <Grid size={{ md: 4, xs: 12 }}>
            <StatCard title="Active Jobs" value={activeJobs} />
          </Grid>

          <Grid size={{ md: 4, xs: 12 }}>
            <StatCard title="Closed Jobs" value={closedJobs} />
          </Grid>
        </Grid>
      </Box>

      {/* ================= JOB LIST (EDIT SECTION) ================= */}
      <Box sx={{ mt: 6, height: "100vh" }}>
        <Typography sx={{ fontSize: 22, fontWeight: 700, mb: 3 }}>
          Manage Jobs
        </Typography>

        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid key={job._id} size={{ md: 4, xs: 12 }}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography fontWeight={600} sx={{ mb: 1 }}>
                    {job.title}
                  </Typography>
                  <Typography>Company: {job.company}</Typography>
                  <Typography>Location: {job.location}</Typography>
                  <Typography>Experience: {job.experience}</Typography>
                  <Typography>Posted: {job.postedAt.split('T')[0]}</Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => handleEdit(job)}
                  >
                    Edit
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
