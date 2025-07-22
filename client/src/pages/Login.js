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

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [brandPurple] = useToken('colors', ['brand.500']);

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
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
          Login
        </MotionHeading>
        <MotionText fontSize="md" color="gray.300" mb={6} textAlign="center" variants={fadeInUp} custom={1}>
          Access your music journey
        </MotionText>
        {error && <Text color="red.500" mb={4} textAlign="center">{error}</Text>}
        <form onSubmit={handleSubmit}>
          <MotionStack spacing={4} variants={fadeInUp} custom={2}>
            <FormControl isInvalid={!!error && !formData.email}>
              <FormLabel htmlFor="email" color="white">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                bg="whiteAlpha.100"
                color="white"
                _placeholder={{ color: 'gray.400' }}
              />
              <FormErrorMessage>Email is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!error && !formData.password}>
              <FormLabel htmlFor="password" color="white">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                bg="whiteAlpha.100"
                color="white"
                _placeholder={{ color: 'gray.400' }}
              />
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="brand" size="lg" w="100%" isLoading={loading} loadingText="Logging in...">
              Login
            </Button>
          </MotionStack>
        </form>
        <Text mt={4} fontSize="sm" color="gray.400" textAlign="center">
          Don't have an account?{' '}
          <ChakraLink color="brand.400" href="/register">Register</ChakraLink>
        </Text>
      </MotionBox>
    </Box>
  );
};

export default Login;
