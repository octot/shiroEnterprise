import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Button, TextField, Box } from '@mui/material';
function ExistingCustomerDetails() {
  const [customers, setCustomers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    address: '',
    customerGst: '',
    phoneNumber: ''
  });
  const [search, setSearch] = useState('');
  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('http://localhost:3001/api/getExistingCustomerDetails');
      const data = await response.json();
      setCustomers(data);
    };
    fetchCustomers();
  }, []);
  const handleEditClick = (customer) => {
    setEditId(customer._id);
    setEditFormData({
      name: customer.name,
      address: customer.address,
      customerGst: customer.customerGst,
      phoneNumber: customer.phoneNumber
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSaveClick = async (id) => {
    const response = await fetch(`http://localhost:3001/api/editExistingCustomerDetails/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editFormData)
    });

    if (response.ok) {
      const updatedCustomers = customers.map((customer) =>
        customer._id === id ? { ...customer, ...editFormData } : customer
      );
      setCustomers(updatedCustomers);
      setEditId(null);
    } else {
      console.log('Error saving customer data');
    }
  };
  const handleDeleteClick = async (id) => {
    const response = await fetch(`http://localhost:3001/api/deleteExistingCustomerDetails/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setCustomers(customers.filter((customer) => customer._id !== id));
    } else {
      console.log('Error deleting customer data');
    }
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
  customer.name.toLowerCase().includes(search.toLowerCase())
);
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Existing Customers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>
                <Box display="flex" alignItems="center">
                  Name
                  <TextField
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search by name"
                    size="small"
                    variant="outlined"
                    sx={{ marginLeft: 2 }}
                  />
                </Box>
              </TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Customer GST</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer._id}>
                {editId === customer._id ? (
                  <>
                    <TableCell>
                      <TextField
                        fullWidth
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        name="address"
                        value={editFormData.address}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        name="customerGst"
                        value={editFormData.customerGst}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        name="phoneNumber"
                        value={editFormData.phoneNumber}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSaveClick(customer._id)}
                      >
                        Save
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>{customer.customerGst}</TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditClick(customer)}
                          sx={{ m: 0.5 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteClick(customer._id)}
                          sx={{ m: 0.5 }}                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ExistingCustomerDetails;
