// client/src/pages/About/About.jsx
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  useToken,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdStar } from 'react-icons/md';

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

const About = () => {
  const [rating, setRating] = useState(null);
  const [brandPurple] = useToken('colors', ['brand.500']);

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
        maxW="2xl"
        w="full"
        mx="auto"
        bg="whiteAlpha.50"
        borderRadius="2xl"
        boxShadow="0 4px 24px 0 rgba(0,0,0,0.10)"
        border="1px solid rgba(255,255,255,0.10)"
        backdropFilter="blur(8px)"
        p={{ base: 6, md: 12 }}
        mt={0}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <MotionHeading
          as="h1"
          size="3xl"
          color="white"
          textAlign="center"
          fontWeight="extrabold"
          mb={6}
          letterSpacing="tight"
          variants={fadeInUp}
          custom={0}
        >
          About TuneTrekk
        </MotionHeading>
        <MotionStack spacing={5} mb={8} variants={fadeInUp} custom={1}>
          <MotionText fontSize="xl" color="gray.200" textAlign="center">
            TuneTrekk is your personalized music explorer, offering a journey beyond the familiar hits. Discover global trends, explore new genres, and curate your favorite tracks—all in a seamless, immersive experience.
          </MotionText>
          <MotionText fontSize="lg" color="gray.400" textAlign="center">
            By integrating Last.fm's top charts with AI-powered recommendations, TuneTrekk tailors its suggestions to match your musical preferences, making every session a fresh adventure.
          </MotionText>
          <MotionText fontSize="lg" color="gray.400" textAlign="center">
            Built with ❤️ using React, Express, MongoDB, and the best of modern web technology.
          </MotionText>
        </MotionStack>
        <MotionBox mt={10} textAlign="center" variants={fadeInUp} custom={2}>
          <Text fontSize="xl" mb={2} color="white" fontWeight="bold">How would you rate your experience with TuneTrekk?</Text>
          <Flex justify="center" align="center" gap={2} mt={2}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                onClick={() => setRating(star)}
                fontSize="2xl"
                bg={rating >= star ? brandPurple : 'whiteAlpha.200'}
                color={rating >= star ? 'white' : 'gray.400'}
                borderRadius="full"
                _hover={{ bg: brandPurple, color: 'white' }}
                px={3}
                py={1}
                transition="all 0.2s"
                boxShadow={rating >= star ? '0 2px 12px 0 rgba(99,102,241,0.25)' : 'none'}
              >
                <MdStar />
              </Button>
            ))}
          </Flex>
          {rating && (
            <Text mt={4} color="brand.400" fontWeight="bold" fontSize="lg">
              Thank you for rating us {rating} star{rating > 1 ? 's' : ''}!
            </Text>
          )}
        </MotionBox>
      </MotionBox>
    </Box>
  );
};

export default About;
