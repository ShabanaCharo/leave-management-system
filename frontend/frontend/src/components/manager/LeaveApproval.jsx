import { useState, useEffect } from 'react';
import { getPendingLeaves, updateLeaveStatus } from '../../services/leaveService';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Divider,
} from '@mui/material';

const LeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await getPendingLeaves();
        setLeaves(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch leaves');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      setLeaves((prev) => prev.filter((leave) => leave._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to update leave status');
    }
  };

  return (
   <Paper sx={{ p: 3, pb: 8 }}>

      <Typography variant="h5" fontWeight={600} gutterBottom>
        <div><br></br><br></br></div>
        Pending Leave Approvals
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : leaves.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          <div></div>
          No pending leaves to approve.
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                <TableCell><strong>Employee</strong></TableCell>
                <TableCell><strong>Dates</strong></TableCell>
                <TableCell><strong>Days</strong></TableCell>
                <TableCell><strong>Reason</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave._id} hover>
                  <TableCell>
                    <Typography fontWeight={500}>{leave.employee.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {leave.employee.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {new Date(leave.startDate).toLocaleDateString()} -{' '}
                    {new Date(leave.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{leave.days}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleStatusChange(leave._id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleStatusChange(leave._id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default LeaveApproval;
