import { useAuth } from '../../context/authContext';
import {
  Paper,
  Typography,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Profile Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography><strong>Name:</strong> {user?.name}</Typography>
          <Typography><strong>Email:</strong> {user?.email}</Typography>
          <Typography><strong>Role:</strong> {user?.role}</Typography>
          <Typography><strong>Total Leaves:</strong> {user?.totalLeaves}</Typography>
          <Typography><strong>Leaves Taken:</strong> {user?.leavesTaken}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="text.secondary">
        You can contact HR if any details need to be updated.
      </Typography>
    </Paper>
  );
};

export default Profile;
