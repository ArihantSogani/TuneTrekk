import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link as ChakraLink,
  useColorModeValue
} from '@chakra-ui/react';

// import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        let userData;
        let token = data.token;

        if (data.user) {
          userData = data.user;
        } else if (data.username && data.email) {
          userData = {
            username: data.username,
            email: data.email,
            _id: data._id || null,
            createdAt: data.createdAt || new Date().toISOString(),
          };
        }

        if (!userData || !userData.username || !userData.email) {
          throw new Error('Invalid user data received from server.');
        }

        localStorage.setItem('userInfo', JSON.stringify(userData));
        if (token) {
          localStorage.setItem('token', token);
        }

        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const cardColor = useColorModeValue('gray.800', 'white');
  const inputBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box minH="90vh" display="flex" alignItems="center" justifyContent="center" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Box bg={cardBg} color={cardColor} p={8} borderRadius="xl" boxShadow="lg" w="100%" maxW="400px" textAlign="center">
        <Heading as="h1" size="xl" mb={2}>Login</Heading>
        <Text fontSize="md" color={useColorModeValue('gray.500', 'gray.300')} mb={6}>Access your music journey</Text>
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!error && !formData.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                bg={inputBg}
              />
              <FormErrorMessage>Email is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!error && !formData.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                bg={inputBg}
              />
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="brand" size="lg" w="100%" isLoading={loading} loadingText="Logging in...">
              Login
            </Button>
          </Stack>
        </form>
        <Text mt={4} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
          Don't have an account?{' '}
          <ChakraLink color="brand.500" href="/register">Register</ChakraLink>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
