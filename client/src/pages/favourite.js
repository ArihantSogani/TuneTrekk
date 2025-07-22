import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  Stack,
  useColorModeValue,
  useToken,
  Flex,
} from '@chakra-ui/react';
import { MdMusicNote } from 'react-icons/md';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [brandPurple] = useToken('colors', ['brand.500']);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(favs);
  }, []);

  const removeFromFavourites = (track) => {
    const updatedFavourites = favourites.filter(
      (item) => item.name !== track.name || item.artist.name !== track.artist.name
    );
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  const cardBg = useColorModeValue('whiteAlpha.50', 'whiteAlpha.50');
  const cardBorder = useColorModeValue('1px solid rgba(99,102,241,0.15)', '1px solid rgba(99,102,241,0.15)');
  const cardShadow = useColorModeValue('0 4px 24px 0 rgba(99,102,241,0.10)', '0 4px 24px 0 rgba(99,102,241,0.10)');
  const cardHighlight = '0 0 0 4px #a480ff, 0 4px 24px 0 rgba(99,102,241,0.18)';
  const headingColor = useColorModeValue('white', 'white');
  const textColor = useColorModeValue('gray.300', 'gray.300');

  return (
    <Box
      p={8}
      minH="100vh"
      bg={{
        base: 'radial-gradient(ellipse at 50% 40%, #1A1130 0%, #0D0C0F 100%)',
        md: 'radial-gradient(ellipse at 50% 40%, #1A1130 0%, #0D0C0F 100%)',
      }}
      pt={{ base: 24, md: 28 }}
    >
      <Heading as="h2" size="2xl" textAlign="center" mb={8} color={headingColor} fontWeight="extrabold">
        <Box as="span" color="brand.400" display="inline-block" mr={2}><MdMusicNote size={32} /></Box>
        My Favourite Songs
      </Heading>
      {favourites.length === 0 ? (
        <Text color={textColor} textAlign="center" fontSize="lg" mt={8}>You haven’t added any favourites yet.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8} mt={4} maxW="7xl" mx="auto">
          {favourites.map((track, index) => {
            const imageUrl = track.image && track.image[2]?.['#text'] ? track.image[2]['#text'] : '';
            return (
              <Box
                key={index}
                bg={cardBg}
                borderRadius="2xl"
                boxShadow={cardShadow}
                border={cardBorder}
                p={4}
                textAlign="center"
                transition="all 0.3s"
                _hover={{ boxShadow: cardHighlight, border: '2.5px solid #a480ff', transform: 'translateY(-4px) scale(1.03)' }}
                position="relative"
              >
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
                      alt={track.name}
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
                      <MdMusicNote size={48} color={brandPurple} />
                    </Flex>
                  )}
                </Box>
                <Heading as="h3" size="md" color={headingColor} mb={1} noOfLines={1} textAlign="center">
                  {track.name}
                </Heading>
                <Text color={textColor} mb={3} noOfLines={1} fontSize="sm" textAlign="center">
                  {track.artist.name}
                </Text>
                <Stack direction="row" spacing={2} w="full" justify="center" mt="auto" flexWrap="wrap">
                  <Button
                    as="a"
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    colorScheme="brand"
                    variant="outline"
                    size="sm"
                    fontWeight="bold"
                    borderRadius="md"
                    px={4}
                    minW="120px"
                    w="auto"
                  >
                    Play
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => removeFromFavourites(track)}
                    fontWeight="bold"
                    borderRadius="md"
                    px={4}
                    minW="120px"
                    w="auto"
                  >
                    Remove from Favourites
                  </Button>
                </Stack>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Favourites;
