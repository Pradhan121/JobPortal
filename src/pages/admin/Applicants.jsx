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

  const HEADERS = {
    headers: {
      Authorization: "byqZEYiNcf0n5qCM",
      "Content-Type": "application/json",
    },
  };

  /* ---------------- FETCH DATA ---------------- */
  const fetchData = async () => {
    setLoading(true);
    try {
      const [appRes, jobRes] = await Promise.all([
        axios.get(
          "https://generateapi.techsnack.online/api/applyJobs",
          { headers: { Authorization: "byqZEYiNcf0n5qCM" } }
        ),
        axios.get(
          "https://generateapi.techsnack.online/api/jobs",
          { headers: { Authorization: "byqZEYiNcf0n5qCM" } }
        ),
      ]);

      setApplications(appRes.data.Data || []);
      setJobs(jobRes.data.Data || []);
    } catch (err) {
      toast.error("Data load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- JOB INFO ---------------- */
  const getJobInfo = (jobId) =>
    jobs.find((j) => String(j._id) === String(jobId)) || {};

  /* ---------------- STATUS UPDATE (FINAL FIX) ---------------- */
  const updateStatus = async (applyId, value) => {
    const statusMap = {
      pending: "Pending",
      accepted: "Accepted",
      rejected: "Rejected",
    };

    try {
      await axios.post(
        `https://generateapi.techsnack.online/api/applyJobs/`,
        {
          id: applyId,
          status: statusMap[value],
        },
        HEADERS
      );

      toast.success("Status updated successfully");

      // UI instant update
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applyId
            ? { ...app, status: statusMap[value] }
            : app
        )
      );
    } catch (err) {
      console.error(err.response?.data);
      toast.error("Status update failed");
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, background: "#f8fafc", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 4, color: "#524dd3", textAlign: "center" }}
      >
        Applicant Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ background: "#f1f5f9" }}>
            <TableRow>
              <TableCell><b>User</b></TableCell>
              <TableCell><b>Job</b></TableCell>
              <TableCell><b>Company</b></TableCell>
              <TableCell><b>Applied Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {applications.map((app) => {
              const job = getJobInfo(app.jobId);

              const displayStatus =
                app.status?.toLowerCase() === "accepted"
                  ? "accepted"
                  : app.status?.toLowerCase() === "rejected"
                  ? "rejected"
                  : "pending";

              return (
                <TableRow key={app._id}>
                  <TableCell>
                    <Typography fontWeight={600}>
                      {app.name || "User"}
                    </Typography>
                    <Typography variant="caption">
                      {app.email}
                    </Typography>
                  </TableCell>

                  <TableCell>{job.title || "N/A"}</TableCell>
                  <TableCell>{job.company || "N/A"}</TableCell>
                  <TableCell>
                    {app.appliedAt?.split("T")[0]}
                  </TableCell>

                  <TableCell>
                    <Select
                      size="small"
                      value={displayStatus}
                      onChange={(e) =>
                        updateStatus(app._id, e.target.value)
                      }
                      sx={{
                        minWidth: 120,
                        background:
                          displayStatus === "accepted"
                            ? "#dcfce7"
                            : displayStatus === "rejected"
                            ? "#fee2e2"
                            : "#fef9c3",
                        fontWeight: 600,
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
