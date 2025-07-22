// explore.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Image,
  HStack,
  useToken,
  chakra,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdMusicNote, MdFavoriteBorder, MdFavorite } from 'react-icons/md';
// import styles from "./explore.module.css";

const genres = ["Hindi", "English", "Punjabi", "Rap", "Pop", "Rock"];

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);
// const MotionButton = motion(Button);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Explore = ({ searchQuery: propSearchQuery }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState(propSearchQuery || "");
  const [favourites, setFavourites] = useState([]);
  const location = useLocation();
  const toast = useToast();
  const [brandPurple] = useToken('colors', ['brand.500']);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = selectedGenre
          ? `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${selectedGenre}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`
          : `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`;
        const response = await axios.get(url);
        const trackData = response.data.tracks.track;
        setTracks(Array.isArray(trackData) ? trackData : []);
      } catch (err) {
        setError("Failed to fetch tracks");
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, [selectedGenre]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favs);
  }, []);

  const filteredTracks = searchQuery
    ? tracks.filter((track) =>
        typeof track.name === 'string' && track.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tracks;

  const addToFavourites = (track) => {
    const isAlreadyAdded = favourites.some(
      (item) => item.name === track.name && item.artist.name === track.artist.name
    );
    if (!isAlreadyAdded) {
      const updated = [...favourites, track];
      setFavourites(updated);
      localStorage.setItem("favourites", JSON.stringify(updated));
      toast({
        title: 'Added to Favourites',
        description: `"${track.name}" by ${track.artist.name}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const isTrackFavourited = (track) => {
    return favourites.some(
      (fav) => fav.name === track.name && fav.artist.name === track.artist.name
    );
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
    >
      {/* My Favourites Button (top right) */}
      <Flex w="full" maxW="7xl" justify="flex-end" mb={2}>
        <Button
          as="a"
          href="/favourites"
          colorScheme="brand"
          size="md"
          fontWeight="bold"
          borderRadius="lg"
          boxShadow="0 2px 12px 0 rgba(99,102,241,0.15)"
          px={6}
          py={4}
          _hover={{ bg: 'brand.400', boxShadow: '0 4px 24px 0 rgba(99,102,241,0.25)' }}
        >
          Favourite Songs
        </Button>
      </Flex>
      {/* Page Title */}
      <Heading
        as="h2"
        size="2xl"
        color="white"
        textAlign="center"
        fontWeight="extrabold"
        mb={8}
        letterSpacing="tight"
      >
        Explore Trending Songs
      </Heading>

      {/* Genre Filters */}
      <HStack spacing={3} mb={10} overflowX="auto" py={2} w="full" justify="center">
        {genres.map((genre) => {
          const isActive = selectedGenre === genre.toLowerCase();
          return (
            <Button
              key={genre}
              onClick={() => setSelectedGenre(genre.toLowerCase())}
              bg={isActive ? brandPurple : 'whiteAlpha.100'}
              color={isActive ? 'white' : 'whiteAlpha.900'}
              fontWeight={isActive ? 'bold' : 'normal'}
              boxShadow={isActive ? '0 2px 12px 0 rgba(99,102,241,0.25)' : 'none'}
              _hover={{ bg: isActive ? brandPurple : 'whiteAlpha.200' }}
              borderRadius="full"
              px={6}
              py={2}
              fontSize="md"
              transition="all 0.2s"
              backdropFilter="blur(4px)"
              border={isActive ? `1.5px solid ${brandPurple}` : '1.5px solid rgba(255,255,255,0.10)'}
            >
              {genre}
            </Button>
          );
        })}
      </HStack>

      {/* Search Results Heading */}
      {searchQuery && (
        <Text fontSize="xl" color="white" mb={6} textAlign="center">
          Results for <Box as="span" color={typeof brandPurple === 'string' ? brandPurple : 'brand.500'} display="inline">{typeof searchQuery === 'string' ? searchQuery : ''}</Box>
        </Text>
      )}

      {/* Song Grid */}
      <Box w="full" maxW="7xl" mx="auto">
        {loading ? (
          <Flex justify="center" align="center" minH="40vh">
            <chakra.span color="brand.400" fontSize="2xl">Loading...</chakra.span>
          </Flex>
        ) : error ? (
          <Flex justify="center" align="center" minH="40vh">
            <Text color="pink.400" fontSize="xl">{error}</Text>
          </Flex>
        ) : filteredTracks.length === 0 ? (
          <Flex direction="column" align="center" justify="center" minH="40vh">
            <MdMusicNote size={64} color={typeof brandPurple === 'string' ? brandPurple : '#7c4dff'} style={{ marginBottom: 16 }} />
            <Text color="gray.400" fontSize="lg">No tracks available.</Text>
          </Flex>
        ) : (
          <MotionSimpleGrid
            columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={8}
            mt={2}
            initial="hidden"
            animate="visible"
          >
            {filteredTracks.map((track, idx) => {
              console.log('track', track);
              console.log('track.name', track.name, typeof track.name);
              console.log('track.artist?.name', track.artist?.name, typeof track.artist?.name);
              const imageUrl = track.image?.[2]?.["#text"]?.trim() || '';
              const isFavourited = isTrackFavourited(track);
              return (
                <MotionBox
                  key={idx}
                  variants={fadeInUp}
                  custom={idx * 0.15}
                  bg={isFavourited ? 'purple.900' : 'whiteAlpha.50'}
                  borderRadius="2xl"
                  boxShadow={isFavourited ? '0 0 0 4px #a480ff, 0 4px 24px 0 rgba(99,102,241,0.18)' : '0 4px 24px 0 rgba(0,0,0,0.10)'}
                  border={isFavourited ? '2.5px solid #a480ff' : '1px solid rgba(255,255,255,0.10)'}
                  backdropFilter="blur(8px)"
                  p={4}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  transition="all 0.3s"
                  _hover={{ boxShadow: isFavourited ? '0 0 0 6px #a480ff, 0 8px 32px 0 rgba(99,102,241,0.18)' : '0 8px 32px 0 rgba(99,102,241,0.18)', transform: 'translateY(-4px) scale(1.03)' }}
                  position="relative"
                >
                  {isFavourited && (
                    <Box position="absolute" top={3} right={3} zIndex={2}>
                      <MdFavorite size={24} color="#a480ff" />
                    </Box>
                  )}
                  <Box
                    w="100%"
                    h="0"
                    pb="100%"
                    position="relative"
                    mb={4}
                    borderRadius="xl"
                    overflow="hidden"
                    bg="gray.900"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={typeof track.name === 'string' ? track.name : ''}
                        position="absolute"
                        top={0}
                        left={0}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        bg="gray.900"
                      />
                    ) : (
                      <Flex position="absolute" top={0} left={0} w="100%" h="100%" align="center" justify="center" bg="gray.900">
                        <MdMusicNote size={48} color={typeof brandPurple === 'string' ? brandPurple : '#7c4dff'} />
                      </Flex>
                    )}
                  </Box>
                  <Heading as="h3" size="md" color="white" mb={1} noOfLines={1} textAlign="center">
                    {typeof track.name === 'string' ? track.name : ''}
                  </Heading>
                  <Text color="gray.400" mb={3} noOfLines={1} fontSize="sm" textAlign="center">
                    {typeof track.artist?.name === 'string' ? track.artist.name : ''}
                  </Text>
                  <Stack direction="row" spacing={2} w="full" justify="center" mt="auto" flexWrap="wrap">
                    <Button
                      as="a"
                      href={typeof track.url === 'string' ? track.url : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      colorScheme="brand"
                      size="sm"
                      fontWeight="bold"
                      borderRadius="md"
                      px={4}
                      minW="120px"
                      w="auto"
                    >
                      Play
                    </Button>
                    {!isFavourited && (
                      <Button
                        leftIcon={<MdFavoriteBorder size={18} />}
                        size="sm"
                        fontWeight="bold"
                        borderRadius="md"
                        px={4}
                        bg="whiteAlpha.100"
                        color="white"
                        _hover={{ bg: 'whiteAlpha.200' }}
                        onClick={() => addToFavourites(track)}
                        minW="120px"
                        w="auto"
                      >
                        Add to Favourites
                      </Button>
                    )}
                  </Stack>
                </MotionBox>
              );
            })}
          </MotionSimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default Explore;

