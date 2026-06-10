import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const HomePage = () => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
        minHeight: '100vh',
        py: { xs: 8, md: 12 },
        color: '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight={800}
            gutterBottom
          >
            Employee Leave Management System
          </Typography>

          <Typography
            variant="h6"
            color="white"
            paragraph
            sx={{ maxWidth: 720, mx: 'auto', lineHeight: 1.6 }}
          >
            Streamline leave requests and approvals with our intuitive, role-based platform designed for simplicity and speed.
          </Typography>

          {!user ? (
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Grid item>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: '#fff',
                    borderColor: '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Button
              component={Link}
              to={user.role === 'manager' ? '/manager' : '/employee'}
              variant="contained"
              size="large"
              color="secondary"
              sx={{ mt: 4 }}
            >
              Go to Dashboard
            </Button>
          )}
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard
              title="Easy Leave Application"
              content="Submit leave requests with just a few clicks and receive updates instantly."
              icon="📅"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              title="Real-time Tracking"
              content="Check your leave status and history anytime from anywhere."
              icon="📊"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              title="Manager Approvals"
              content="Managers can quickly review and respond to leave requests."
              icon="✅"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const FeatureCard = ({ title, content, icon }) => {
  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        textAlign: 'center',
        height: '100%',
        borderRadius: 4,
        backgroundColor: '#fff',
        color: '#333',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 8,
        },
      }}
    >
      <Typography variant="h3" gutterBottom>
        {icon}
      </Typography>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {content}
      </Typography>
    </Paper>
  );
};

export default HomePage;
