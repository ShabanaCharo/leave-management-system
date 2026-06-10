import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { getMyLeaves } from '../../services/leaveService';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
} from '@mui/material';

const LeaveHistory = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const data = await getMyLeaves(); // ✅ fixed
        setLeaves(data);
      } catch (error) {
        console.error('Failed to fetch leave history:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveHistory();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Leave History
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave) => (
              <TableRow key={leave._id}>
                <TableCell>{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{leave.reason}</TableCell>
                <TableCell>{leave.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default LeaveHistory;
