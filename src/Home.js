import React, { useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const initialOrders = [
  {
    id: '001',
    customer: 11908,
    customer_profile: {
      id: 11908,
      name: 'Ram',
      color: [182, 73, 99],
    },
    price: '$100',
    lastModified: '2024-05-21',
    status: 'active',
  },
  {
    id: '002',
    customer: 11909,
    customer_profile: {
      id: 11909,
      name: 'Jane Smith',
      color: [34, 150, 243],
    },
    price: '$150',
    lastModified: '2024-05-20',
    status: 'completed',
  },
  {
    id: '003',
    customer: 11910,
    customer_profile: {
      id: 11910,
      name: 'Alice Johnson',
      color: [255, 193, 7],
    },
    price: '$200',
    lastModified: '2024-05-22',
    status: 'active',
  },
  {
    id: '004',
    customer: 11911,
    customer_profile: {
      id: 11911,
      name: 'Bob Brown',
      color: [76, 175, 80],
    },
    price: '$250',
    lastModified: '2024-05-19',
    status: 'completed',
  },
];

const OrderTable = ({ orders, title, onEditOrder, onViewOrder }) => (
  <Box w="full" p={4} boxShadow="md" borderRadius="md">
    <Heading size="md" mb={4}>{title}</Heading>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Product ID</Th>
          <Th>Customer Name</Th>
          <Th>Price</Th>
          <Th>Last Modified</Th>
          <Th>View(/Edit only for ActiveOrders)</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map(order => (
          <Tr key={order.id}>
            <Td>{order.id}</Td>
            <Td>{order.customer_profile.name}</Td>
            <Td>{order.price}</Td>
            <Td>{order.lastModified}</Td>
            <Td>
              <Button 
                size="sm" 
                colorScheme="teal" 
                onClick={() => order.status === 'active' ? onEditOrder(order) : onViewOrder(order)}>
                ...
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

function Home() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('active');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    productId: '',
    customerName: '',
    price: '',
    lastModified: new Date(),
    status: 'active',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);

  const activeOrders = orders.filter(order => order.status === 'active');
  const completedOrders = orders.filter(order => order.status === 'completed');

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = date => {
    setFormData({
      ...formData,
      lastModified: date,
    });
  };

  const handleNewOrder = () => {
    if (isEditing) {
      const updatedOrders = orders.map(order =>
        order.id === editingOrderId
          ? {
              ...order,
              customer_profile: {
                ...order.customer_profile,
                name: formData.customerName,
              },
              price: formData.price,
              lastModified: formData.lastModified.toISOString().split('T')[0],
            }
          : order
      );
      setOrders(updatedOrders);
      setIsEditing(false);
      setEditingOrderId(null);
    } else {
      const newOrder = {
        id: (orders.length + 1).toString().padStart(3, '0'),
        customer_profile: {
          id: Date.now(),
          name: formData.customerName,
          color: [0, 0, 0],
        },
        price: formData.price,
        lastModified: formData.lastModified.toISOString().split('T')[0],
        status: 'active',
      };
      setOrders([...orders, newOrder]);
    }
    onClose();
  };

  const handleEditOrder = order => {
    setFormData({
      productId: order.id,
      customerName: order.customer_profile.name,
      price: order.price,
      lastModified: new Date(order.lastModified),
      status: order.status,
    });
    setIsEditing(true);
    setIsViewing(false);
    setEditingOrderId(order.id);
    onOpen();
  };

  const handleViewOrder = order => {
    setFormData({
      productId: order.id,
      customerName: order.customer_profile.name,
      price: order.price,
      lastModified: new Date(order.lastModified),
      status: order.status,
    });
    setIsEditing(false);
    setIsViewing(true);
    onOpen();
  };

  const handleOpenNewOrderModal = () => {
    setFormData({
      productId: '',
      customerName: '',
      price: '',
      lastModified: new Date(),
      status: 'active',
    });
    setIsEditing(false);
    setIsViewing(false);
    onOpen();
  };

  return (
    <Box minH="100vh" p={6}>
      <Heading mb={6}>Order Dashboard</Heading>
      <Button size="sm" colorScheme="teal" onClick={handleOpenNewOrderModal}>+ Sale Order</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? 'Edit Sale Order' : isViewing ? 'View Sale Order' : 'New Sale Order'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                name="productId"
                placeholder="Product ID"
                value={formData.productId}
                onChange={handleInputChange}
                isReadOnly={isEditing || isViewing}
              />
              <Input
                name="customerName"
                placeholder="Customer Name"
                value={formData.customerName}
                onChange={handleInputChange}
                isReadOnly={isViewing}
              />
              <Input
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                isReadOnly={isViewing}
              />
              <DatePicker
                selected={formData.lastModified}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                customInput={<Input placeholder="Last Modified" />}
                readOnly={isViewing}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            {!isViewing && (
              <Button colorScheme="teal" mr={3} onClick={handleNewOrder}>
                Save
              </Button>
            )}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack spacing={8}>
        <Button colorScheme={activeTab === 'active' ? 'teal' : 'gray'} onClick={() => handleTabChange('active')}>Active Orders</Button>
        <Button colorScheme={activeTab === 'completed' ? 'teal' : 'gray'} onClick={() => handleTabChange('completed')}>Completed Orders</Button>
      </HStack>
      {activeTab === 'active' ? (
        <OrderTable orders={activeOrders} title="Active Orders" onEditOrder={handleEditOrder} onViewOrder={handleViewOrder} />
      ) : (
        <OrderTable orders={completedOrders} title="Completed Orders" onEditOrder={handleEditOrder} onViewOrder={handleViewOrder} />
      )}
    </Box>
  );
}

export default Home;
