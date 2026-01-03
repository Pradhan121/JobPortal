import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Applicants() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_HEADERS = { headers: { Authorization: "byqZEYiNcf0n5qCM" } };

  // 1. Fetch all data needed to "Join" the information
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Applications and Jobs in parallel
      const [appRes, jobRes] = await Promise.all([
        axios.get("https://generateapi.techsnack.online/api/appliedJobs", API_HEADERS),
        axios.get("https://generateapi.techsnack.online/api/jobs", API_HEADERS)
      ]);

      setApplications(appRes.data.Data || []);
      setJobs(jobRes.data.Data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Helper function to find Job details (Title, Company) using the jobId
  const getJobInfo = (jobId) => {
    return jobs.find((j) => String(j._id) === String(jobId)) || {};
  };

  // 3. Update application status
  const updateStatus = (id, newStatus) => {
    axios
      .patch(
        `https://generateapi.techsnack.online/api/appliedJobs/${id}`,
        { status: newStatus },
        API_HEADERS
      )
      .then(() => {
        toast.success(`Status updated to ${newStatus}`);
        fetchData(); // Refresh the list
      })
      .catch(() => toast.error("Status update failed"));
  };

  if (loading) return <Box sx={{ textAlign: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ padding: 4, background: "#f8fafc", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: "#1e293b" }}>
        Applicant Management
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
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
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No applicants found</TableCell>
              </TableRow>
            ) : (
              applications.map((app) => {
                const jobDetails = getJobInfo(app.jobId);
                return (
                  <TableRow key={app._id} hover>
                    {/* User Info: If backend doesn't send names, we show ID */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {app.userName || "User"} 
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        ID: {app.userId}
                      </Typography>
                    </TableCell>

                    <TableCell>{jobDetails.title || "Unknown Job"}</TableCell>
                    <TableCell>{jobDetails.company || "N/A"}</TableCell>
                    <TableCell>{app.appliedAt || "N/A"}</TableCell>

                    <TableCell>
                      <Select
                        size="small"
                        value={app.status || "pending"}
                        onChange={(e) => updateStatus(app._id, e.target.value)}
                        sx={{
                          minWidth: 120,
                          backgroundColor: 
                            app.status === 'accepted' ? '#dcfce7' : 
                            app.status === 'rejected' ? '#fee2e2' : '#fef9c3',
                          fontSize: '0.875rem'
                        }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="accepted">Accepted</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}