import React, { useState, useEffect } from 'react';
import { Typography, Container, TextField, Button, Box, Autocomplete } from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import ItemsTable from './ItemsTable';
import { styled } from '@mui/system';
function B2B() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
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
  //shipment functions
  const [shipmentDetails, setShipmentDetails] = useState({
    customerName: '',
    address: '',
    customerGst: '',
    phoneNumber: '',
    date: '',
  });
  const handleInputChange = (field, value) => {
    setShipmentDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };
  const handleCopyValues = () => {
    setShipmentDetails({
      customerName: customerDetails.customerName,
      address: customerDetails.address,
      customerGst: customerDetails.customerGst,
      phoneNumber: customerDetails.phoneNumber,
      date: date,
    });
  };
  const handleClearValues = () => {
    setShipmentDetails({
      customerName: '', address: '', customerGst: '', phoneNumber: '', date: '',
    });
  };
  const ResponsiveTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    '@media (min-width: 600px)': {
      // backgroundColor:'blue',
      width: '70%',
    },
    '@media (min-width: 960px)': {
      // backgroundColor:'red',
      width: '100%',
    },
  }));
  const customerAndShipmentDetailsInputs = [{ name: 'customerName' }, { name: 'address' }, { name: 'customerGst' }, { name: 'phoneNumber' }, { name: 'date' }
  ]
  return (
    <Container>
      <Typography textAlign={'center'} variant="h4" component="h2" gutterBottom>
        Customer Details
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
              variant="filled"
              margin="normal"
              color="success"
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
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Save
        </Button> */}
      </Box>
      <Box component="form" sx={{ mt: 3 }} noValidate autoComplete="off">
        <Button variant="contained" onClick={handleCopyValues}
          sx={{ mt: 1, mr: 2, backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}
        >
          Copy Default Values
        </Button>
        <Button variant="contained" onClick={handleClearValues}
          sx={{ mt: 1, backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
        >Clear Shipment Details</Button>
        <Typography sx={{ mt: 3, }}
          textAlign="center" variant="h4" component="h2" gutterBottom>
          Shipment Details
        </Typography>
        <TextField
          id="customerName"
          label="Customer Name"
          variant="filled"
          value={shipmentDetails.customerName}
          onChange={(e) => handleInputChange('customerName', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="address"
          label="Address"
          variant="standard"
          value={shipmentDetails.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="customerGst"
          label="Customer GST"
          variant="standard"
          value={shipmentDetails.customerGst}
          onChange={(e) => handleInputChange('customerGst', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="standard"
          value={shipmentDetails.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          variant="standard"
          id="date"
          label="Date"
          type="date"
          value={shipmentDetails.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
      </Box>
      <ItemsTable customerDetails={customerDetails} date={date} shipmentDetails={shipmentDetails} />
    </Container>
  );
}

export default B2B;
