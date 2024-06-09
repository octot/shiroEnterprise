import React, { useState, useEffect } from 'react';
import {Box,Typography, Container,TextField, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
function GstCalculation({ total }) {
  const [cgstRate, setCgstRate] = useState(9); // Default CGST rate
  const [sgstRate, setSgstRate] = useState(9); // Default SGST rate
  const [cgstAmount, setCgstAmount] = useState((total * cgstRate) / 100);
  const [sgstAmount, setSgstAmount] = useState((total * sgstRate) / 100);
  const [gstType, setGstType] = useState('cgstSgst');
  const [igstRate, setIgstRate] = useState(0);
  const [igstAmount, setIgstAmount] = useState(0);
  const igstTotal = igstAmount;
  const  cgstSgstTotal = cgstAmount + sgstAmount;
  const rateTotal = total;
  const roundedRateTotal = Math.round(rateTotal);
  const invoiceTotal = gstType === 'cgstSgst' ? roundedRateTotal + cgstSgstTotal : roundedRateTotal + igstTotal;
  const handleGstTypeChange = (event) => {
    setGstType(event.target.value);
  };
  useEffect(() => {
    // Update CGST amount when total or CGST rate changes
    setCgstAmount((total * cgstRate) / 100);
  }, [total, cgstRate]);
  useEffect(() => {
    // Update SGST amount when total or SGST rate changes
    setSgstAmount((total * sgstRate) / 100);
  }, [total, sgstRate]);
  const handleCgstRateChange = (event) => {
    const rate = parseFloat(event.target.value) || 0;
    setCgstRate(rate);
  };
  const handleSgstRateChange = (event) => {
    const rate = parseFloat(event.target.value) || 0;
    setSgstRate(rate);
  };
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        GST Calculation
      </Typography>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">GST Type</FormLabel>
          <RadioGroup row value={gstType} onChange={handleGstTypeChange}>
            <FormControlLabel value="cgstSgst" control={<Radio />} label="CGST & SGST" />
            <FormControlLabel value="igst" control={<Radio />} label="IGST" />
          </RadioGroup>
        </FormControl>
      </Grid>
      {gstType === 'cgstSgst' ? (
        <>
          <Box sx={{ mt: 2 }}>
            <TextField
              id="cgstRate"
              label="CGST Rate (%)"
              type="number"
              value={cgstRate}
              onChange={handleCgstRateChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              id="cgstAmount"
              label="CGST Amount"
              value={cgstAmount.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              id="sgstRate"
              label="SGST Rate (%)"
              type="number"
              value={sgstRate}
              onChange={handleSgstRateChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              id="sgstAmount"
              label="SGST Amount"
              value={sgstAmount.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="GST Total"
              value={cgstSgstTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Rate Total"
              value={rateTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Round Off"
              value={roundedRateTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Invoice Total INR"
              value={invoiceTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Box>
        </>
      ) : (
        <>
          <Grid item xs={6}>
            <TextField
              label="IGST Rate"
              type="number"
              value={igstRate}
              onChange={(e) => setIgstRate(parseFloat(e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="IGST Amount"
              type="number"
              value={igstAmount}
              onChange={(e) => setIgstAmount(parseFloat(e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="GST Total"
              value={igstTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Rate Total"
              value={rateTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Round Off"
              value={roundedRateTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Invoice Total"
              value={invoiceTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
        </>
      )}
    </Container>
  );
}
export default GstCalculation;
