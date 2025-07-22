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
  useToken,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionStack = motion(Stack);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: 'easeOut',
    },
  }),
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [brandPurple] = useToken('colors', ['brand.500']);
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
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

  return (
    <Box
      minH="100vh"
      w="full"
      px={{ base: 2, md: 8 }}
      py={12}
      pt={{ base: 24, md: 28 }}
      sx={{
        background: `radial-gradient(ellipse at 50% 40%, #1A1130 0%, #0D0C0F 100%)`,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <MotionBox
        maxW="sm"
        w="full"
        mx="auto"
        bg="whiteAlpha.50"
        borderRadius="2xl"
        boxShadow="0 4px 24px 0 rgba(0,0,0,0.10)"
        border="1px solid rgba(255,255,255,0.10)"
        backdropFilter="blur(8px)"
        p={{ base: 6, md: 10 }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <MotionHeading
          as="h1"
          size="2xl"
          color="white"
          textAlign="center"
          fontWeight="extrabold"
          mb={4}
          letterSpacing="tight"
          variants={fadeInUp}
          custom={0}
        >
          Register
        </MotionHeading>
        <MotionText fontSize="md" color="gray.300" mb={6} textAlign="center" variants={fadeInUp} custom={1}>
          Create your TuneTrekk account
        </MotionText>
        {error && <Text color="red.500" mb={4} textAlign="center">{error}</Text>}
        <form onSubmit={handleSubmit}>
          <MotionStack spacing={4} variants={fadeInUp} custom={2}>
            <FormControl isInvalid={!!error && !username}>
              <FormLabel htmlFor="username" color="white">Username</FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                bg="whiteAlpha.100"
                color="white"
                _placeholder={{ color: 'gray.400' }}
              />
              <FormErrorMessage>Username is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!error && !email}>
              <FormLabel htmlFor="email" color="white">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                bg="whiteAlpha.100"
                color="white"
                _placeholder={{ color: 'gray.400' }}
              />
              <FormErrorMessage>Email is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!error && !password}>
              <FormLabel htmlFor="password" color="white">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                bg="whiteAlpha.100"
                color="white"
                _placeholder={{ color: 'gray.400' }}
              />
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!error && !confirmPassword}>
              <FormLabel htmlFor="confirmPassword" color="white">Confirm Password</FormLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                bg="whiteAlpha.100"
                color="white"
                _placeholder={{ color: 'gray.400' }}
              />
              <FormErrorMessage>Confirm your password.</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="brand" size="lg" w="100%" isLoading={loading} loadingText="Registering...">
              Register
            </Button>
          </MotionStack>
        </form>
        <Text mt={4} fontSize="sm" color="gray.400" textAlign="center">
          Already have an account?{' '}
          <ChakraLink color="brand.400" href="/login">Login</ChakraLink>
        </Text>
      </MotionBox>
    </Box>
  );
};

export default Register;
