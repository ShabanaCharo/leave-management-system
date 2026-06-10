import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../context/authContext';

const TeamLeaves = () => {
  const { token, user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch('/api/v1/leaves', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Failed to fetch leaves');

        setLeaves(data.data.leaves);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [token]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Team Leaves
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : leaves.length === 0 ? (
        <Typography>No leave requests found.</Typography>
      ) : (
        <Paper sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave._id}>
                  <TableCell>{leave.employee?.name}</TableCell>
                  <TableCell>{leave.employee?.email}</TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default TeamLeaves;
