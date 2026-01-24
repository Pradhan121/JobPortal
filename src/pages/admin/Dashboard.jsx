import {
  Box, Card, CardContent, Grid,
  Typography, Button, CircularProgress
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    applicants: 0,
    active: 0,
    accepted: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const HEADERS = { headers: { Authorization: "byqZEYiNcf0n5qCM" } };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [jobRes, appRes] = await Promise.all([
        axios.get("https://generateapi.techsnack.online/api/jobs", HEADERS),
        axios.get("https://generateapi.techsnack.online/api/applyJobs", HEADERS)
      ]);

      const jobData = jobRes.data.Data || [];
      const appData = appRes.data.Data || [];

      setJobs(jobData);
      setStats({
        total: jobData.length,
        applicants: appData.length,
        active: jobData.filter(j => j.status !== "Closed").length,
        accepted: appData.filter(
          a => a.status?.toLowerCase() === "accepted"
        ).length
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 EVENT LISTENER ADDED
  useEffect(() => {
    fetchDashboardData();

    const refresh = () => fetchDashboardData();
    window.addEventListener("applicationStatusUpdated", refresh);

    return () =>
      window.removeEventListener("applicationStatusUpdated", refresh);
  }, []);

  const StatCard = ({ title, value, color }) => (
    <Card>
      <CardContent>
        <Typography color="text.secondary">{title}</Typography>
        <Typography fontSize={32} fontWeight={800} sx={{ color }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  const handleEdit = (job) => {
    localStorage.setItem("editJobData", JSON.stringify(job));
    navigate("/admin/add-job");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`https://generateapi.techsnack.online/api/jobs/${id}`, HEADERS)
        .then(() => {
          toast.success("Job deleted");
          fetchDashboardData();
        });
    }
  };

  if (loading)
    return <Box sx={{ textAlign: "center", mt: 6 }}><CircularProgress /></Box>;

  return (
    <>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ md: 4, xs: 12 }}><StatCard title="Total Jobs" value={stats.total} /></Grid>
        <Grid size={{ md: 4, xs: 12 }}><StatCard title="Applicants" value={stats.applicants} /></Grid>
        <Grid size={{ md: 4, xs: 12 }}><StatCard title="Active Jobs" value={stats.active} /></Grid>
        <Grid size={{ md: 4, xs: 12 }}>
          <StatCard title="Accepted" value={stats.accepted} color="#16a34a" />
        </Grid>
      </Grid>

      <Box mt={6}>
        <Typography fontSize={22} fontWeight={700} mb={3}>
          Manage Jobs
        </Typography>

        <Grid container spacing={3}>
          {jobs.map(job => (
            <Grid key={job._id} size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography fontWeight={600}>{job.title}</Typography>
                  <Typography>Company: {job.company}</Typography>

                  <Button sx={{ mt: 2 }} variant="contained" onClick={() => handleEdit(job)}>
                    Edit
                  </Button>
                  <Button sx={{ mt: 2, ml: 2 }} variant="contained" color="error"
                    onClick={() => handleDelete(job._id)}>
                    Delete
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
