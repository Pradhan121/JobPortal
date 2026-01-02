import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function Add_EditJob() {
  const [job, setJob] = useState({
    id: "",
    title: "",
    company: "",
    location: "",
    experience: "",
    jobType: "",
    postedAt: "",
  });

  const [edit, setEdit] = useState(null);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  // 🔹 FETCH SINGLE JOB (FOR EDIT)
  const fetchSingleJob = (id) => {
    axios
      .get(`https://generateapi.techsnack.online/api/jobs/${id}`, {
        headers: {
          Authorization: "byqZEYiNcf0n5qCM",
        },
      })
      .then((res) => {
        setJob(res.data.Data); // ✅ AUTO FILL FORM
      })
      .catch((err) => console.log(err));
  };

  // 🔹 FORMIK
  const form = useFormik({
    initialValues: job,
    enableReinitialize: true,
    validationSchema: Yup.object({
      id: edit ? Yup.string() : Yup.string().required("Job Id is required"),
      title: Yup.string().required("Please Enter Title"),
      company: Yup.string().required("Please Enter Company Name"),
      location: Yup.string().required("Please Enter Location"),
      experience: Yup.string().required("Enter Experience"),
      jobType: Yup.string().required("Enter Job Type"),
      postedAt: Yup.string().required("Enter Post Date"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("title", values.title);
      formData.append("company", values.company);
      formData.append("location", values.location);
      formData.append("experience", values.experience);
      formData.append("jobType", values.jobType);

      // ✅ date fix
      const cleanDate = values.postedAt.split("T")[0];
      formData.append("postedAt", cleanDate);

      if (edit) {
        // ===== UPDATE =====
        axios
          .patch(
            `https://generateapi.techsnack.online/api/jobs/${edit}`,
            formData,
            {
              headers: {
                Authorization: "byqZEYiNcf0n5qCM",
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(() => {
            toast.success("Job updated successfully");
            localStorage.removeItem("editJobData");
            navigate("/admin/dashboard");
          })
          .catch((err) => {
            console.log(err.response?.data);
            toast.error(err.response?.data?.Message || "Update failed");
          });
      } else {
        // ===== ADD =====
        axios
          .post("https://generateapi.techsnack.online/api/jobs", formData, {
            headers: {
              Authorization: "byqZEYiNcf0n5qCM",
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            toast.success("Job added successfully");
            navigate("/admin/dashboard");
          })
          .catch((err) => {
            console.log(err.response?.data);
            toast.error(err.response?.data?.Message || "Add failed");
          });
      }
    },
  });
  useEffect(() => {
    const storedJob = localStorage.getItem("editJobData");

    if (storedJob) {
      const jobData = JSON.parse(storedJob);
      setEdit(jobData._id);
      setJob({
        id: jobData.id,
        title: jobData.title,
        company: jobData.company,
        location: jobData.location,
        experience: jobData.experience,
        jobType: jobData.jobType,
        postedAt: jobData.postedAt,
      });
    }
  }, []);

  const handleClose = () => {
    form.resetForm();
    setOpen(false);
    navigate("/admin/dashboard");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#020617", py: 6 }}>
      <Container maxWidth="sm">
        <Dialog open={open} fullWidth maxWidth="sm" scroll="body">
          <DialogTitle sx={{ textAlign: "center", fontSize: 25 }}>
            {edit ? "Edit Job" : "Add Job"}
          </DialogTitle>

          <DialogContent sx={{ overflow: "hidden" }}>
            <Box component="form" onSubmit={form.handleSubmit}>
              <TextField
                fullWidth
                label="Job Id"
                name="id"
                value={form.values.id}
                onChange={form.handleChange}
                disabled={Boolean(edit)} 
              />

              <TextField
                fullWidth
                label="Job Title"
                name="title"
                value={form.values.title}
                onChange={form.handleChange}
                error={form.touched.title && Boolean(form.errors.title)}
                helperText={form.touched.title && form.errors.title}
                sx={{ mb: 2 }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <TextField
                fullWidth
                label="Company"
                name="company"
                value={form.values.company}
                onChange={form.handleChange}
                error={form.touched.company && Boolean(form.errors.company)}
                helperText={form.touched.company && form.errors.company}
                sx={{ mb: 2 }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <TextField
                fullWidth
                label="Location"
                name="location"
                value={form.values.location}
                onChange={form.handleChange}
                error={form.touched.location && Boolean(form.errors.location)}
                helperText={form.touched.location && form.errors.location}
                sx={{ mb: 2 }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <TextField
                fullWidth
                label="Experience"
                name="experience"
                value={form.values.experience}
                onChange={form.handleChange}
                sx={{ mb: 2 }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <TextField
                fullWidth
                label="Job Type"
                name="jobType"
                value={form.values.jobType}
                onChange={form.handleChange}
                sx={{ mb: 2 }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <TextField
                fullWidth
                type="date"
                name="postedAt"
                value={form.values.postedAt}
                onChange={form.handleChange}
                sx={{ mb: 2 }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ background: "#2563eb" }}
                >
                  {edit ? "Update" : "Submit"}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
