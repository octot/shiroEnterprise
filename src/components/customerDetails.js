import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
function CustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    customerGst: '',
    phoneNumber: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('Customer data saved')
      console.log('Customer data saved');
    } else {
      alert('Error saving customer data')
      console.log('Error saving customer data');
    }
    setFormData({
      name: '',
      address: '',
      customerGst: '',
      phoneNumber: ''
    });
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Customer Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Customer GST"
          name="customerGst"
          value={formData.customerGst}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default CustomerForm;
