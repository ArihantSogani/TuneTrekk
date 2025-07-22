import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Button,
  Input,
  HStack,
  IconButton,
  useColorMode,
  useDisclosure,
  VStack,
  CloseButton,
  Container
} from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    setIsLoggedIn(!!userInfo);
  }, [location]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      style={{
        color: location.pathname === to ? '#6366f1' : '#fff',
        fontWeight: location.pathname === to ? '700' : '500',
        textDecoration: 'none',
        transition: 'color 0.2s',
        fontSize: '1rem',
        padding: '0.25rem 0.75rem',
        borderRadius: '0.375rem',
        background: location.pathname === to ? 'rgba(99,102,241,0.08)' : 'none',
      }}
    >
      {children}
    </Link>
  );

  const MobileNav = () => (
    <VStack
      pos="fixed"
      top={0}
      left={0}
      right={0}
      display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
      flexDirection="column"
      p={4}
      pb={4}
      bg="rgba(17,24,39,0.92)"
      backdropFilter="blur(8px)"
      spacing={4}
      borderBottom="1px solid rgba(255,255,255,0.08)"
      zIndex={20}
      shadow="md"
    >
      <Flex justify="space-between" w="100%">
        <Heading size="md" color="#fff">TuneTrekk</Heading>
        <CloseButton onClick={onClose} />
      </Flex>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/explore">Explore</NavLink>
      <NavLink to="/about">About</NavLink>
      {!isLoggedIn ? (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      ) : (
        <NavLink to="/accountdetails">My Account</NavLink>
      )}
      <Box as="form" onSubmit={handleSearchSubmit} w="100%">
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a song"
          mb={2}
          bg="rgba(255,255,255,0.06)"
          color="#fff"
          _placeholder={{ color: 'gray.400' }}
        />
        <Button type="submit" w="100%" colorScheme="brand">Search</Button>
      </Box>
      <Button onClick={toggleColorMode} leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} w="100%" variant="ghost" color="#fff">
        {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </VStack>
  );

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      w="100%"
      zIndex={100}
      bg="rgba(17,24,39,0.80)"
      backdropFilter="blur(6px)"
      borderBottom="1px solid rgba(255,255,255,0.10)"
      boxShadow="0 2px 16px 0 rgba(0,0,0,0.10)"
      style={{ WebkitBackdropFilter: 'blur(6px)' }}
    >
      <Container maxW="container.xl" py={2} px={{ base: 2, md: 6 }}>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          color="#fff"
        >
          <Flex align="center" mr={5}>
            <Heading as="h1" size="md" letterSpacing="tight" color="#fff" fontWeight="bold">
              TuneTrekk
            </Heading>
          </Flex>

          <Flex display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
              aria-label="Toggle dark mode"
              color="#fff"
              mr={2}
            />
            <IconButton
              onClick={onToggle}
              icon={<HamburgerIcon />}
              variant="ghost"
              aria-label="Toggle navigation"
              color="#fff"
            />
          </Flex>

          <HStack
            spacing={2}
            align="center"
            justify="flex-end"
            flex={1}
            display={{ base: 'none', md: 'flex' }}
          >
            <HStack spacing={1}>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/explore">Explore</NavLink>
              <NavLink to="/about">About</NavLink>
              {!isLoggedIn ? (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/register">Register</NavLink>
                </>
              ) : (
                <NavLink to="/accountdetails">My Account</NavLink>
              )}
            </HStack>

            <Box as="form" onSubmit={handleSearchSubmit} display="flex" alignItems="center" bg="rgba(255,255,255,0.06)" borderRadius="md" px={2} py={1} ml={4}>
              <Input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for a song"
                size="md"
                width="180px"
                border="none"
                bg="transparent"
                color="#fff"
                _placeholder={{ color: 'gray.400' }}
                _focus={{ boxShadow: 'none' }}
                mr={2}
              />
              <Button type="submit" colorScheme="brand" size="md" px={5} fontWeight="bold">
                Search
              </Button>
            </Box>

            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
              aria-label="Toggle dark mode"
              color="#fff"
              fontSize="xl"
              ml={2}
            />
          </HStack>
        </Flex>
      </Container>
      <MobileNav />
    </Box>
  );
};

export default Navbar;