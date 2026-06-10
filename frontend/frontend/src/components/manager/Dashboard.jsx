import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const ManagerDashboard = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await fetch('/api/v1/leaves', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to fetch');

        const counts = { pending: 0, approved: 0, rejected: 0 };
        data.data.leaves.forEach((leave) => {
          counts[leave.status]++;
        });

        setStats(counts);
      } catch (err) {
        console.error('Error fetching leave stats:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [token]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.username} 👋
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Pending Requests</Typography>
            <Typography variant="h4">{stats.pending}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Approved Leaves</Typography>
            <Typography variant="h4">{stats.approved}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Rejected Leaves</Typography>
            <Typography variant="h4">{stats.rejected}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={4} display="flex" flexWrap="wrap" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/manager/team')}
        >
          View Team Leaves
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/manager/approvals')}
        >
          Manage Approvals
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/manager/create')}
        >
          Create New Manager
        </Button>
      </Box>
    </Box>
  );
};

export default ManagerDashboard;
