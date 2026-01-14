import { Box, Card, CardContent, Grid, Typography, Button, CircularProgress } from "@mui/material";
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
  const[loading,setLoading] = useState(true)
  const navigate = useNavigate();
  const HEADERS = { headers: { Authorization: "byqZEYiNcf0n5qCM" } };

  const fetchDashboardData = async () => {
    try {
      const [jobRes, appRes] = await Promise.all([
        axios.get("https://generateapi.techsnack.online/api/jobs", HEADERS),
        axios.get("https://generateapi.techsnack.online/api/appliedJobs", HEADERS)
      ])
      .catch((err)=>console.log(err))
      .finally(()=>setLoading(false))
      const jobData = jobRes.data.Data || [];
      const appData = appRes.data.Data || [];

      setJobs(jobData);
      setStats({
        total: jobData.length,
        applicants: appData.length,
        active: jobData.filter(j => j.status !== "Closed").length,
        // 🔥 Isko "Accepted Applicants" se link kar diya hai
        accepted: appData.filter(a => a.status?.toLowerCase() === "accepted").length
      });
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const StatCard = ({ title, value, color }) => (
    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography color="text.secondary" variant="subtitle2">{title}</Typography>
        <Typography fontSize={32} fontWeight={800} sx={{ color: color || 'primary.main' }}>{value}</Typography>
      </CardContent>
    </Card>
  );
  const handleEdit = (job) => {
    localStorage.setItem("editJobData", JSON.stringify(job));
    navigate("/admin/add-job");
  };

  const handleDelete=(id)=>{
    if(window.confirm("Are you sure you want to delete this job?")){
    axios.delete(`https://generateapi.techsnack.online/api/jobs/${id}`,HEADERS)
    .then(()=>{
      toast.success('data deleted successfully')
      fetchDashboardData();
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}
 if(loading){
  return(
    <Box sx={{ textAlign: "center", mt: 6 }}>
        <CircularProgress />
        <Typography mt={2}>Loading...</Typography>
      </Box>
  )
 }
  return (
    <>
      <Typography variant="h4" fontWeight={700} mb={4}>Admin Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid size={{md:4, xs:12}}><StatCard title="Total Jobs" value={stats.total} /></Grid>
        <Grid size={{md:4, xs:12}}><StatCard title="Total Applicants" value={stats.applicants} /></Grid>
        <Grid size={{md:4, xs:12}}><StatCard title="Active Jobs" value={stats.active} /></Grid>
        <Grid size={{md:4, xs:12}}><StatCard title="Closed" value={stats.accepted} color="#2e7d32" /></Grid>
      </Grid>
      
      <Box mt={6}>
        <Typography fontSize={22} fontWeight={700} mb={3}>
          Manage Jobs
        </Typography>

        <Grid container spacing={3}>
          {jobs.map((job,id) => (
            <Grid key={id} size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography fontWeight={600}>
                    {job.title}
                  </Typography>
                  <Typography>Company: {job.company}</Typography>
                  <Typography>Status: {job.status || "Active"}</Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => handleEdit(job)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2, marginLeft:'45px'}}
                    onClick={() => handleDelete(job._id)}
                  >
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