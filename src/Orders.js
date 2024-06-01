import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Orders = () => {
  return (
    <Box maxW="md" mx="auto" mt={10} p={4}>
      <Heading mb={4}>Orders</Heading>
      <Box>
        <p>Active orders</p>
        <p>Completed orders</p>
      </Box>
    </Box>
  );
};

export default Orders;