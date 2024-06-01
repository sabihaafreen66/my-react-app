import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, useToast } from '@chakra-ui/react';

function Login() {
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username === 'admin' && password === 'password') {
         toast({
        title: "Login successful.",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/home');
    } else {
      toast({
        title: "Login failed.",
        description: "Invalid username or password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box p={6} maxW="400px" w="full" boxShadow="md" borderRadius="md">
        <Heading mb={6}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Name</FormLabel>
              <Input type="text" name="username" required />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" required />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">Login</Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
