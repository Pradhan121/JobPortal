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
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Applicants() {
  const [applicants, setApplicants] = useState([]);

  // GET applicants
  const fetchApplicants = () => {
    axios
      .get('https://generateapi.techsnack.online/api/applicants', {
        headers: { Authorization: "byqZEYiNcf0n5qCM" },
      })
      .then((res) => {
        setApplicants(res.data.Data);
      });
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // PATCH status
  const updateStatus = (id, status) => {
    axios
      .patch(
        `https://generateapi.techsnack.online/api/applicants/${id}`,
        { status },
        {
          headers: { Authorization: "byqZEYiNcf0n5qCM" },
        }
      )
      .then(() => {
        toast.success("Status updated");
        fetchApplicants();
      });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography sx={{ fontSize: 28, fontWeight: 700, mb: 3 }}>
        Applicants
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Applied On</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {applicants.map((a) => (
              <TableRow key={a._id}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.email}</TableCell>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.company}</TableCell>
                <TableCell>{a.appliedAt}</TableCell>

                <TableCell>
                  <Select
                    size="small"
                    value={a.status}
                    onChange={(e) =>
                      updateStatus(a._id, e.target.value)
                    }
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="accepted">Accepted</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
