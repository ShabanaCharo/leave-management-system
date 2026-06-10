import { Box, Button, Container, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{ px: 4 }}
          >
            Go Back
          </Button>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            sx={{ px: 4 }}
          >
            Return Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;