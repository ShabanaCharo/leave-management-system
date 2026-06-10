import { Typography, Paper, Box, Grid } from '@mui/material';
import { useAuth } from '../../context/authContext';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Welcome {user?.name || 'Employee'} 👋
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        This is your personal leave management dashboard. You can manage leave requests,
        view your history, and update your profile — all from one place.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<CalendarMonthIcon color="primary" sx={{ fontSize: 40 }} />}
            title="Apply for Leave"
            description="Easily submit your leave request with a few clicks."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<HistoryIcon color="success" sx={{ fontSize: 40 }} />}
            title="View Leave History"
            description="Track the status and history of your leave applications."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<PersonIcon color="secondary" sx={{ fontSize: 40 }} />}
            title="Manage Profile"
            description="Update your personal information and view your account details."
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Box
    sx={{
      p: 3,
      border: '1px solid #e0e0e0',
      borderRadius: 2,
      backgroundColor: '#fafafa',
      textAlign: 'center',
      transition: '0.3s',
      '&:hover': {
        boxShadow: 4,
        backgroundColor: '#fff',
      },
    }}
  >
    <Box sx={{ mb: 2 }}>{icon}</Box>
    <Typography variant="h6" fontWeight={600} gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Box>
);

export default Dashboard;
