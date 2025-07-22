import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Divider,
  Spinner
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
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

const AccountDetails = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUserData(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="transparent">
        <Spinner size="xl" color="brand.500" />
      </Box>
    );
  }

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
      justifyContent="flex-start"
    >
      <MotionBox
        maxW="lg"
        w="full"
        mx="auto"
        bg="whiteAlpha.50"
        borderRadius="2xl"
        boxShadow="0 4px 24px 0 rgba(0,0,0,0.10)"
        border="1px solid rgba(255,255,255,0.10)"
        backdropFilter="blur(8px)"
        p={{ base: 6, md: 10 }}
        mt={0}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <MotionHeading
          as="h2"
          size="2xl"
          color="white"
          textAlign="center"
          fontWeight="extrabold"
          mb={8}
          letterSpacing="tight"
          variants={fadeInUp}
          custom={0}
        >
          Account Details
        </MotionHeading>
        <MotionStack spacing={4} mb={6} variants={fadeInUp} custom={1}>
          <Box>
            <Text fontWeight="bold" color="brand.400">Username:</Text>
            <Text color="white" fontSize="lg">{userData?.username}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold" color="brand.400">Email:</Text>
            <Text color="white" fontSize="lg">{userData?.email}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold" color="brand.400">Account Created:</Text>
            <Text color="white" fontSize="lg">{userData?.createdAt ? new Date(userData.createdAt).toLocaleString() : 'N/A'}</Text>
          </Box>
        </MotionStack>
        <Divider my={4} borderColor="whiteAlpha.300" />
        {showPasswordForm ? (
          <Box mb={4}>
            <Text color="white" mb={2}>Password change form goes here.</Text>
            <Button colorScheme="brand" w="100%" mb={2}>Submit</Button>
            <Button variant="ghost" w="100%" onClick={() => setShowPasswordForm(false)}>Cancel</Button>
          </Box>
        ) : (
          <Button colorScheme="brand" w="100%" mb={4} onClick={() => setShowPasswordForm(true)}>
            Change Password
          </Button>
        )}
        <Button colorScheme="red" w="100%" onClick={handleLogout} mt={2}>
          Logout
        </Button>
      </MotionBox>
    </Box>
  );
};

export default AccountDetails;