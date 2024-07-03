import './App.css';
import Customerdetails from './components/customerDetails'
import ExistingCustomerDetails from './components/ExistingCustomerDetails';
import React, { useState } from 'react';
import { Container, Box, Button, Card, CardContent, Typography } from '@mui/material';
import B2B from './components/B2B';
function App() {
  const [view, setView] = useState('menu');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <Container>
      {view === 'menu' && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Card sx={{ m: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" textAlign={'center'} gutterBottom>
                Customer Management
              </Typography>
              <Box display="flex" flexDirection="row">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewChange('create')}
                  sx={{ m: 1 }}
                >
                  Create New Customer
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleViewChange('edit')}
                  sx={{ m: 1 }}
                >
                  Edit/Delete Existing Customer
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleViewChange('b2b')}
                  sx={{ m: 1 }}
                >
                  B2B
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
      {view === 'create' && (
        <Box>
          <Button variant="contained" onClick={() => handleViewChange('menu')} sx={{ mb: 2 }}>
            Back
          </Button>
          <Customerdetails />
        </Box>
      )}
      {view === 'edit' && (
        <Box>
          <Button variant="contained" onClick={() => handleViewChange('menu')} sx={{ mb: 2 }}>
            Back
          </Button>
          <ExistingCustomerDetails />
        </Box>
      )}
      {view === 'b2b' && (
        <Box>
          <Button variant="contained" onClick={() => handleViewChange('menu')} sx={{ mb: 2 }}>
            Back
          </Button>
          <B2B />
        </Box>
      )}
    </Container>
  );
}

export default App;

