import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, actions) => {
    setError('');
    const result = await login(values.email, values.password);
    if (!result.success) {
      setError(result.message || 'Login failed');
      actions.setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
          <ArrowBack />
        </IconButton>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Employee Leave System
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
              <Form style={{ width: '100%' }}>
                <TextField
                  name="email"
                  label="Email Address"
                  fullWidth
                  margin="normal"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {error && (
                  <Typography color="error" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
