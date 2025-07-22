import React, { useState } from 'react';
import axios from 'axios';
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

const API_BASE_URL = 'http://localhost:5000';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        email,
        password,
      });

      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Registration failed. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please check your connection and try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const cardColor = useColorModeValue('gray.800', 'white');
  const inputBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Box bg={cardBg} color={cardColor} p={8} borderRadius="xl" boxShadow="lg" w="100%" maxW="400px">
        <Heading as="h1" size="xl" mb={2} textAlign="center">Register</Heading>
        <Text fontSize="md" color={useColorModeValue('gray.500', 'gray.300')} mb={6} textAlign="center">Create your TuneTrekk account</Text>
        {error && <Text color="red.500" mb={4} textAlign="center">{error}</Text>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!error && !username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                bg={inputBg}
              />
              <FormErrorMessage>Username is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!error && !email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                bg={inputBg}
              />
              <FormErrorMessage>Email is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!error && !password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                bg={inputBg}
              />
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!error && !confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                bg={inputBg}
              />
              <FormErrorMessage>Confirm your password.</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="brand" size="lg" w="100%" isLoading={loading} loadingText="Registering...">
              Register
            </Button>
          </Stack>
        </form>
        <Text mt={4} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
          Already have an account?{' '}
          <ChakraLink color="brand.500" href="/login">Login</ChakraLink>
        </Text>
      </Box>
    </Box>
  );
};

export default Register;
