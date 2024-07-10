import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Button, TextField, Box } from '@mui/material';
import './TableStyles.css';
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
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" component="h2" gutterBottom display={'flex'} justifyContent={'center'}>
        Existing Customers
      </Typography>
      <Container component={Paper} sx={{ mt: 4, p: 2 }}>
        <Table className="custom-table">
          <TableHead>
            <TableRow className="custom-table-head">
              <TableCell className="custom-table-cell">
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="h7">Name</Typography>
                  <TextField
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search by name"
                    size="small"
                    variant="outlined"
                    sx={{
                      m: 1,
                      width: '100%', // Ensure the TextField takes up full width of its container
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'common.white',
                        '&:hover': {
                          backgroundColor: 'grey.100',
                        },
                      }
                    }}
                  />
                </Box>
              </TableCell>
              <TableCell className="custom-table-cell">Address</TableCell>
              <TableCell className="custom-table-cell">Customer GST</TableCell>
              <TableCell className="custom-table-cell">Phone Number</TableCell>
              <TableCell className="custom-table-cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer._id} className="custom-table-row">
                {editId === customer._id ? (
                  <>
                    <TableCell className="custom-table-cell">
                      <TextField
                        fullWidth
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell className="custom-table-cell">
                      <TextField
                        fullWidth
                        name="address"
                        value={editFormData.address}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell className="custom-table-cell">
                      <TextField
                        fullWidth
                        name="customerGst"
                        value={editFormData.customerGst}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell className="custom-table-cell">
                      <TextField
                        fullWidth
                        name="phoneNumber"
                        value={editFormData.phoneNumber}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell className="custom-table-cell">
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
                    <TableCell className="custom-table-cell">{customer.name}</TableCell>
                    <TableCell className="custom-table-cell">{customer.address}</TableCell>
                    <TableCell className="custom-table-cell">{customer.customerGst}</TableCell>
                    <TableCell className="custom-table-cell">{customer.phoneNumber}</TableCell>
                    <TableCell className="custom-table-cell">
                      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditClick(customer)}
                          sx={{
                            m: 0.5,
                            width: '82px'
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteClick(customer._id)}
                          sx={{
                            m: .5
                          }}>
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
      </Container>
    </ThemeProvider>
  );
}

export default ExistingCustomerDetails;
