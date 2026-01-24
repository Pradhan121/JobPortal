import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const[loading,setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    axios
      .get("https://generateapi.techsnack.online/api/applyJobs", {
        headers: {
          Authorization: "byqZEYiNcf0n5qCM",
        },
      })
      .then((res) => {
        const filtered = res.data.Data.filter(
        (item) => String(item.userId) === String(userId)
        )
        setAppliedJobs(filtered);
      })
      .finally(()=>setLoading(false))
  }, []);

  useEffect(() => {
    axios
      .get("https://generateapi.techsnack.online/api/jobs", {
        headers: {
          Authorization: "byqZEYiNcf0n5qCM",
        },
      })
      .then((res) => {
        setJobs(res.data.Data);
      });
  }, []);

  // 🔎 Job details finder
  const getJobDetails = (jobId) => {
    return jobs.find((job) => job._id === jobId);
  };

  if (loading)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "#020617",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2, color: "#94a3b8" }}>
          Loading Applied Jobs...
        </Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#020617",
        padding: "40px",
        marginTop: "60px",
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontSize: "32px",
          fontWeight: 700,
          mb: 4,
          textAlign: "center",
        }}
      >
        Applied Jobs
      </Typography>

      <Container>
        <Grid container spacing={3}>
          {appliedJobs.length === 0 && (
            <Typography sx={{ color: "#94a3b8", mx: "auto", mt: 4 }}>
              No applied jobs found
            </Typography>
          )}

          {appliedJobs.map((item) => {
            const jobDetails = getJobDetails(item.jobId);
            const status = item.status?.toLowerCase() || "pending";
            return (
              <Grid size={{ lg: 4, sm: 6, md: 4, xs: 12 }} key={item._id}>
                <Card
                  sx={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                    borderRadius: "14px",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      {jobDetails?.title || "Job Title"}
                    </Typography>

                    <Typography sx={{ color: "#94a3b8", mb: 1 }}>
                      {jobDetails?.company || "Company Name"}
                    </Typography>

                    <Typography sx={{ color: "#cbd5e1", fontSize: "14px" }}>
                      Applied On: {item.appliedAt.split('T')[0]}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        mt: 1,
                        fontWeight: 600,
                        color:
                          item.status === "accepted"
                            ? "#22c55e"
                            : item.status === "rejected"
                            ? "#ef4444"
                            : "#facc15",
                      }}
                    >
                      Status: {status.toUpperCase()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
