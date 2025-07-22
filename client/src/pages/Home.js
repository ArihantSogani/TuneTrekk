import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  chakra,
  useToken,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

// SVG Globe Icon (minimalist, line-art)
const GlobeIcon = (props) => (
  <chakra.svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    boxSize={{ base: 12, md: 16 }}
    color="brand.400"
    {...props}
  >
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" />
    <ellipse cx="24" cy="24" rx="10" ry="20" stroke="currentColor" strokeWidth="3" />
    <ellipse cx="24" cy="24" rx="20" ry="10" stroke="currentColor" strokeWidth="3" />
  </chakra.svg>
);

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionStack = motion(Stack);
const MotionButton = motion(Button);

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

const Home = ({ searchQuery }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    try {
      if (userInfo && userInfo !== 'undefined') {
        const parsedUser = JSON.parse(userInfo);
        setUsername(parsedUser?.username || 'person');
      }
    } catch (error) {
      localStorage.removeItem('userInfo');
    }
  }, []);

  // Gradient background colors
  const [brandPurple] = useToken('colors', ['brand.500', 'gray.900', 'purple.900']);

  return (
    <Box
      minH="100vh"
      w="full"
      position="relative"
      overflow="hidden"
      sx={{
        background: `radial-gradient(ellipse at 50% 40%, #1A1130 0%, #0D0C0F 100%)`,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      {/* Hero Section */}
      <MotionStack
        spacing={8}
        align="center"
        justify="center"
        w="full"
        maxW="3xl"
        py={{ base: 24, md: 32 }}
        initial="hidden"
        animate="visible"
      >
        <MotionBox custom={0} variants={fadeInUp}>
          <GlobeIcon mb={4} />
        </MotionBox>
        <MotionHeading
          as="h1"
          size="4xl"
          fontWeight="extrabold"
          lineHeight="1.1"
          textAlign="center"
          bgGradient="linear(to-r, brand.200, brand.500, purple.400)"
          bgClip="text"
          custom={1}
          variants={fadeInUp}
        >
          TuneTrekk
        </MotionHeading>
        <MotionText
          fontSize={{ base: 'xl', md: '2xl' }}
          color="gray.300"
          textAlign="center"
          maxW="2xl"
          custom={2}
          variants={fadeInUp}
        >
          Explore global music, from anywhere in the world.
        </MotionText>
        {searchQuery && (
          <MotionText
            fontSize="lg"
            color="brand.300"
            textAlign="center"
            custom={3}
            variants={fadeInUp}
          >
            Searching for: {searchQuery}
          </MotionText>
        )}
        <MotionStack
          direction={{ base: 'column', sm: 'row' }}
          spacing={6}
          w="full"
          justify="center"
          custom={4}
          variants={fadeInUp}
        >
          <MotionButton
            as="a"
            href="/explore"
            size="lg"
            fontWeight="bold"
            px={8}
            py={6}
            colorScheme="brand"
            bg={brandPurple}
            color="white"
            boxShadow="0 4px 24px 0 rgba(99,102,241,0.25)"
            borderRadius="lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            _hover={{ bg: 'brand.400', boxShadow: '0 6px 32px 0 rgba(99,102,241,0.35)' }}
          >
            Start Exploring
          </MotionButton>
          <MotionButton
            variant="ghost"
            size="lg"
            fontWeight="bold"
            px={8}
            py={6}
            bg="whiteAlpha.100"
            color="white"
            borderRadius="lg"
            backdropFilter="blur(8px)"
            boxShadow="0 2px 12px 0 rgba(255,255,255,0.05)"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            _hover={{ bg: 'whiteAlpha.200' }}
            onClick={() => navigate('/favourites')}
          >
            Favourites Songs
          </MotionButton>
        </MotionStack>
        <MotionText
          fontSize="lg"
          color="gray.400"
          textAlign="center"
          mt={8}
          custom={5}
          variants={fadeInUp}
        >
          Welcome, {username}!
        </MotionText>
      </MotionStack>
    </Box>
  );
};

export default Home;
