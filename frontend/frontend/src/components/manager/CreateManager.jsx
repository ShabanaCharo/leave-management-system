// src/components/manager/CreateManager.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from '@mui/material';

const CreateManager = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, role: 'manager' }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to create manager');

      setSuccessMsg('Manager account created successfully!');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Create New Manager
      </Typography>

      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}
      {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Creating...' : 'Create Manager'}
        </Button>
      </form>
    </Paper>
  );
};

export default CreateManager;
