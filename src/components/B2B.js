import React, { useState, useEffect } from 'react';
import { Typography, Container, TextField, Button, Box, Autocomplete } from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import ItemsTable from './ItemsTable';
import GstCalculation from './GstCalculation.js'
function B2B() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [total,setTotal] = useState(0);
  const [customerDetails, setCustomerDetails] = useState({
    customerName: '',
    address: '',
    customerGst: '',
    phoneNumber: '',
  });
  useEffect(() => {
    // Fetch existing customer details
    axios.get('http://localhost:3001/api/getExistingCustomerDetails')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customer details:', error);
      });
  }, []);
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleCustomerChange = (event, value) => {
    setSelectedCustomer(value);
    if (value) {
      setCustomerDetails({
        customerName: value.name,
        address: value.address,
        customerGst: value.customerGst,
        phoneNumber: value.phoneNumber,
      });
    } else {
      setCustomerDetails({
        customerName: '',
        address: '',
        customerGst: '',
        phoneNumber: '',
      });
    }
  };
  const handleSubmit = () => {
    // Logic to save the form data
    console.log('Saved data:', {
      date,
      ...customerDetails,
    });
  };
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        B2B Component
      </Typography>
      <Box component="form" sx={{ mt: 3 }} noValidate autoComplete="off">
        <Autocomplete
          options={customers}
          getOptionLabel={(option) => option.name}
          value={selectedCustomer}
          onChange={handleCustomerChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Customer Name"
              variant="outlined"
              margin="normal"
              fullWidth
            />
          )}
        />
        <TextField
          id="address"
          label="Address"
          variant="outlined"
          value={customerDetails.address}
          onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          id="customerGst"
          label="Customer GST"
          variant="outlined"
          value={customerDetails.customerGst}
          onChange={(e) => setCustomerDetails({ ...customerDetails, customerGst: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          value={customerDetails.phoneNumber}
          onChange={(e) => setCustomerDetails({ ...customerDetails, phoneNumber: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <ItemsTable setTotal={setTotal} />
        <GstCalculation total={total} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Box>
    </Container>
  );
}

export default B2B;
