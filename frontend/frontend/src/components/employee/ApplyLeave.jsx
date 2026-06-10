import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { applyLeave } from '../../services/leaveService';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ApplyLeave = () => {
  const { user, token } = useAuth();

  console.log('🧠 useAuth() context in ApplyLeave:', { user, token });

  const [startDate, setStartDate] = useState(dayjs().add(1, 'day'));
  const [endDate, setEndDate] = useState(dayjs().add(2, 'day'));
  const [reason, setReason] = useState('');
  const [leaveType, setLeaveType] = useState('Vacation');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

 const leaveTypes = [
  { value: 'Vacation', label: 'Vacation' },
  { value: 'Sick leave', label: 'Sick Leave' },
  { value: 'Personal', label: 'Personal' },
  { value: 'Other', label: 'Other' },
];


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (startDate.isAfter(endDate)) {
      setError('End date must be after start date');
      return;
    }

    console.log('🚀 Submitting leave with token:', token);

    try {
      await applyLeave(
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          reason,
          leaveType,
        },
        token
      );

      setSuccess('Leave application submitted successfully!');
      setStartDate(dayjs().add(1, 'day'));
      setEndDate(dayjs().add(2, 'day'));
      setReason('');
      setLeaveType('vacation');
    } catch (err) {
      setError(err.message || 'Failed to submit leave application');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Apply for Leave
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                minDate={dayjs().add(1, 'day')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                minDate={startDate}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Leave Type"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                fullWidth
              >
                {leaveTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Reason"
                multiline
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Remaining Leaves: {user?.totalLeaves - user?.leavesTaken} days
              </Typography>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            {success && (
              <Grid item xs={12}>
                <Typography color="success.main">{success}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Box>
    </Paper>
  );
};

export default ApplyLeave;
