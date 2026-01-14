import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SecurityIcon from "@mui/icons-material/Security";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("https://generateapi.techsnack.online/api/jobs", {
        headers: {
          Authorization: "byqZEYiNcf0n5qCM",
        },
      })
      .then((res) => {
        setJobs(res.data.Data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    toast.warning('Here you can apply jobs')
    navigate("/jobs");
  };

  const handleExplore = () => {
    navigate("/jobs");
  };
  return (
    <>
      <Box
        sx={{
          background: "#f8fafc",
          width: "100%",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            color: "#fff",
            padding: "80px 0",
            textAlign: "center",
          }}
        >
          <Container maxWidth={false} disableGutters>
            <Typography
              sx={{
                fontSize: {
                  xs: "28px",
                  sm: "32px",
                  md: "42px",
                },
                fontWeight: 700,
                paddingTop: "70px",
              }}
            >
              Find Your Dream Job
            </Typography>

            <Typography
              sx={{
                mt: 2,
                fontSize: {
                  xs: "17px",
                  sm: "32px",
                  md: "42px",
                },
                color: "#cbd5e1",
              }}
            >
              Search thousands of jobs and apply instantly
            </Typography>

            <Button
              onClick={handleExplore}
              sx={{
                mt: 4,
                background: "#2563eb",
                padding: "10px 24px",
                fontSize: "16px",
              }}
              variant="contained"
            >
              Explore Jobs
            </Button>
          </Container>
        </Box>
      </Box>

      <Box sx={{ background: "#020617", py: 8 }}>
        <Container>
          <Typography
            sx={{
              color: "#fff",
              fontSize: "28px",
              fontWeight: 700,
              textAlign: "center",
              mb: 5,
            }}
          >
            Why Choose JobPortal?
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ md: 4, xs: 12 }}>
              <Box sx={{ textAlign: "center" }}>
                <WorkOutlineIcon sx={{ fontSize: 40, color: "#2563eb" }} />
                <Typography sx={{ color: "#fff", mt: 2, fontWeight: 600 }}>
                  Easy Apply
                </Typography>
                <Typography sx={{ color: "#94a3b8", mt: 1 }}>
                  Apply to jobs with a single click
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ md: 4, xs: 12 }}>
              <Box sx={{ textAlign: "center" }}>
                <SecurityIcon sx={{ fontSize: 40, color: "#2563eb" }} />
                <Typography sx={{ color: "#fff", mt: 2, fontWeight: 600 }}>
                  Secure Login
                </Typography>
                <Typography sx={{ color: "#94a3b8", mt: 1 }}>
                  Your data is safe with us
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ md: 4, xs: 12 }}>
              <Box sx={{ textAlign: "center" }}>
                <TrackChangesIcon sx={{ fontSize: 40, color: "#2563eb" }} />
                <Typography sx={{ color: "#fff", mt: 2, fontWeight: 600 }}>
                  Track Applications
                </Typography>
                <Typography sx={{ color: "#94a3b8", mt: 1 }}>
                  View applied jobs anytime
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ background: "#020617", py: 8 }}>
        <Container>
          <Typography
            sx={{
              color: "#fff",
              fontSize: "28px",
              fontWeight: 700,
              textAlign: "center",
              mb: 5,
            }}
          >
            Latest Jobs
          </Typography>

          <Grid container spacing={3}>
            {jobs.slice(0, 3).map((job) => (
              <Grid size={{ lg: 4, sm: 6, md: 4, xs: 12 }} key={job._id}>
                <Card
                  sx={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                    borderRadius: 2,
                  }}
                >
                  <CardContent>
                    <Typography sx={{ color: "#fff", fontSize: 20 }}>
                      {job.title}
                    </Typography>

                    <Typography sx={{ color: "#94a3b8", mt: 1 }}>
                      {job.company} • {job.location}
                    </Typography>

                    <Typography sx={{ color: "#cbd5e1", mt: 1 }}>
                      Experience: {job.experience}
                    </Typography>

                    <Typography sx={{ color: "#cbd5e1", mt: 1 }}>
                      Job Type: {job.jobType}
                    </Typography>

                    <Button
                      onClick={handleClick}
                      fullWidth
                      sx={{ background: "#1d4ed8", color: "#fff", mt: 2 }}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="contained"
              sx={{ background: "#2563eb" }}
              onClick={() => navigate("/jobs")}
            >
              View All Jobs
            </Button>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{ background: "#020617", py: 3, borderTop: "1px solid #1e293b" }}
      >
        <Container>
          <Typography sx={{ color: "#94a3b8", textAlign: "center" }}>
            © 2025 JobPortal. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
