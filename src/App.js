import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import Login from './Login';
import Home from './Home';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box minH="100vh">
      <Flex justify="flex-end" p={4}>
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          aria-label="Toggle Theme"
          variant="ghost"
        />
      </Flex>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Box>
  );
}

export default App;
