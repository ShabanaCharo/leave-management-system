import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Avatar,
  Divider,
  Grid,
} from '@mui/material';
import { useAuth } from '../../context/authContext';
import PersonIcon from '@mui/icons-material/Person';

const ManagerProfile = () => {
  const { user } = useAuth();

  return (
    <Box maxWidth="600px" mx="auto" mt={4}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" flexDirection="column" mb={3}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80 }}>
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h5" mt={2}>
            {user?.username || 'Manager'}
          </Typography>
          <Typography color="text.secondary">
            {user?.email || 'No email available'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography color="text.secondary">Role</Typography>
            <Typography variant="body1">{user?.role || 'manager'}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="text.secondary">User ID</Typography>
            <Typography variant="body1">{user?._id || 'N/A'}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" mt={2}>
          This is your manager profile page. You can use it to view your details and monitor team leave activity.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ManagerProfile;
