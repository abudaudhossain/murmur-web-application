import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
  Stack,
} from '@mui/material';
import { clientSideAxios } from '../lib/api/axios/clientSideAxios';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Replace with your login logic
    error && setError(''); // Clear previous error
    console.log({ email, password });
    if (email && password) {
      const res = clientSideAxios.post('/auth/login', {
        email,
        password,
      });
      res
        .then((response) => {
          
          setUser({ ...response.data.user, accessToken: response.data.accessToken });
          navigate('/');
        })
        .catch((error) => {
          console.error('Login failed:', error);

          if (error.response && error.response.data) {
            setError(error.response.data.message || 'Login failed. Try again.');
          } else {
            setError('An unexpected error occurred. Please try again later.');
          }
        });


    } else {
      console.error('Email and password are required');
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
          Log in to Murmur
        </Typography>

        <Stack spacing={2} sx={{ mt: 2, width: '100%' }}>
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

          <Link href="#" underline="hover" fontSize={14} textAlign="right">
            Forgot password?
          </Link>
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
            onClick={handleLogin}
            sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: 2 }}
          >
            Log In
          </Button>


        </Stack>

        <Typography sx={{ mt: 3 }}>
          Don’t have an account?{' '}
          <Link href="/signup" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
