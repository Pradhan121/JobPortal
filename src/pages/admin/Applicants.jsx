import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Select,
  MenuItem, CircularProgress
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Applicants() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Headers ko ek baar check karlein ki key sahi hai ya nahi
  const API_HEADERS = { headers: { Authorization: "byqZEYiNcf0n5qCM" } };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appRes, jobRes] = await Promise.all([
        axios.get("https://generateapi.techsnack.online/api/appliedJobs", API_HEADERS),
        axios.get("https://generateapi.techsnack.online/api/jobs", API_HEADERS)
      ]);
      setApplications(appRes.data.Data || []);
      setJobs(jobRes.data.Data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Data load nahi ho paya");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const getJobInfo = (jobId) => jobs.find((j) => String(j._id) === String(jobId)) || {};

  const updateStatus = (id, newStatus) => {
    console.log("Updating ID:", id, "to Status:", newStatus);

    // PATCH request check
    axios
      .patch(`https://generateapi.techsnack.online/api/appliedJobs/${id}`, 
        { status: newStatus }, 
        API_HEADERS
      )
      .then((res) => {
        console.log("Update Success:", res.data);
        toast.success(`Status updated to ${newStatus}`);
        
        // UI ko turant update karne ke liye
        setApplications(prev => 
          prev.map(app => (app._id === id ? { ...app, status: newStatus } : app))
        );
      })
      .catch((err) => {
        // Console mein dekhein ki error 404 hai ya 401
        console.error("Update Error Details:", err.response?.data || err.message);
        toast.error(`Update failed: ${err.response?.data?.message || "Server Error"}`);
      });
  };

  if (loading) return <Box sx={{ textAlign: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ padding: 4, background: "#f8fafc", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>Applicant Management</Typography>
      <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
        <Table>
          <TableHead sx={{ background: "#f1f5f9" }}>
            <TableRow>
              <TableCell><b>User Name / ID</b></TableCell>
              <TableCell><b>Job Title</b></TableCell>
              <TableCell><b>Company</b></TableCell>
              <TableCell><b>Applied Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => {
              const jobDetails = getJobInfo(app.jobId);
              
              // Agar backend ka status accepted/rejected nahi hai, toh 'pending' dikhao
              let displayStatus = "pending";
              if (app.status?.toLowerCase() === "accepted") displayStatus = "accepted";
              if (app.status?.toLowerCase() === "rejected") displayStatus = "rejected";

              return (
                <TableRow key={app._id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{app.userName || "User"}</Typography>
                    <Typography variant="caption" color="textSecondary">ID: {app.userId}</Typography>
                  </TableCell>
                  <TableCell>{jobDetails.title || "Unknown Job"}</TableCell>
                  <TableCell>{jobDetails.company || "N/A"}</TableCell>
                  <TableCell>{app.appliedAt?.split("T")[0] || "N/A"}</TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={displayStatus} // Hamesha pending, accepted ya rejected hi hoga
                      onChange={(e) => updateStatus(app._id, e.target.value)}
                      sx={{
                        minWidth: 120,
                        backgroundColor: 
                          displayStatus === 'accepted' ? '#dcfce7' : 
                          displayStatus === 'rejected' ? '#fee2e2' : '#fef9c3',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="accepted">Accepted</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}