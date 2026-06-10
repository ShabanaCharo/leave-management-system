import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
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
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  });

  const handleSubmit = async (values, actions) => {
    setError('');
    const result = await register({ ...values, role: 'employee' });
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message || 'Registration failed');
      actions.setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ p: 4, mt: 8, borderRadius: 3, backgroundColor: '#fafafa' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          <ArrowBack />
        </IconButton>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" fontWeight={600} sx={{ mb: 1 }}>
            Employee Registration
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create your employee account
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
              <Form style={{ width: '100%' }}>
                <TextField
                  name="name"
                  label="Full Name"
                  fullWidth
                  margin="normal"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  name="email"
                  label="Email Address"
                  type="email"
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
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
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
                  sx={{ mt: 3, py: 1.5, fontWeight: 600, borderRadius: 2 }}
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
