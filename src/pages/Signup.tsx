import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Stack,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { clientSideAxios } from '../lib/api/axios/clientSideAxios';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await clientSideAxios.post('/auth/register', {
        name,
        email,
        password,
      });


      navigate('/login');
    } catch (err) {
      setError('Signup failed. Try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Create your account
        </Typography>

        <Stack spacing={2} sx={{ mt: 2, width: '100%' }}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {error && (
            <Typography color="error" fontSize={14}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleSignup}
            sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: 2 }}
          >
            Sign Up
          </Button>

          <Typography textAlign="center" color="text.secondary">
            Already have an account?{' '}
            <Link href="/login" underline="hover">
              Log in
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
