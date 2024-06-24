import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, TextField, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
const GstCalculation = ({ item, index, setItems }) => {
  const [gstDetails, setGstDetails] = useState({
    gstType: '',
    cgstRate: item.cgstRate,
    sgstRate: item.sgstRate,
    igstRate: item.igstRate,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 0,
    gstTotal:0,
    rateTotal: item.total,
    roundedRateTotal: 0,
    invoiceTotal: 0,
  });
  useEffect(() => {
    calculateGST();
  }, [item.total, gstDetails.gstType, gstDetails.cgstRate, 
    gstDetails.sgstRate, gstDetails.igstRate]);
  const handleGstTypeChange = (event) => {
    const { value } = event.target;
    // Reset relevant fields based on the selected GST type
    if (value === 'cgstSgst') {
      setGstDetails((prevDetails) => ({
        ...prevDetails,
        gstType: value,
        igstRate: 0,
        igstAmount: 0,
      }));
    } else if (value === 'igst') {
      setGstDetails((prevDetails) => ({
        ...prevDetails,
        gstType: value,
        cgstRate: 0,
        cgstAmount: 0,
        sgstRate: 0,
        sgstAmount: 0,
      }));
    }
    updateItemDetails({ gstType: event.target.value });
  };
  const handleCgstRateChange = (event) => {
    const rate = parseFloat(event.target.value) || 0;
    setGstDetails((prevDetails) => ({
      ...prevDetails,
      cgstRate: rate,
    }));
    updateItemDetails({ cgstRate: rate });
  };
  const handleSgstRateChange = (event) => {
    const rate = parseFloat(event.target.value) || 0;
    setGstDetails((prevDetails) => ({
      ...prevDetails,
      sgstRate: rate,
    }));
    updateItemDetails({ sgstRate: rate });

  };
  const handleIgstRateChange = (event) => {
    const rate = parseFloat(event.target.value) || 0;
    setGstDetails((prevDetails) => ({
      ...prevDetails,
      igstRate: rate,
    }));
    updateItemDetails({ igstRate: rate });

  };
  const updateItemDetails = (details) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], ...details };
      return updatedItems;
    });
  };
  const calculateGST = () => {
    let cgstAmount = (item.total * gstDetails.cgstRate) / 100;
    let sgstAmount = (item.total * gstDetails.sgstRate) / 100;
    let igstAmount = (item.total * gstDetails.igstRate) / 100;
    let rateTotal = item.total;
    let roundedRateTotal = Math.round(rateTotal);
    let gstTotal = gstDetails.gstType === 'cgstSgst' ? cgstAmount + sgstAmount : igstAmount;
    console.log("gstTotal ",gstTotal)
    let invoiceTotal = roundedRateTotal + gstTotal;
    setGstDetails((prevDetails) => ({
      ...prevDetails,
      cgstAmount,
      sgstAmount,
      igstAmount,
      rateTotal,
      roundedRateTotal,
      gstTotal,
      invoiceTotal,
    }));
  };
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        GST Calculation
      </Typography>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">GST Type</FormLabel>
          <RadioGroup  onChange={handleGstTypeChange}>
            <FormControlLabel value="cgstSgst" control={<Radio />} label="CGST & SGST" />
            <FormControlLabel value="igst" control={<Radio />} label="IGST" />
          </RadioGroup>
        </FormControl>
      </Grid>
      {gstDetails.gstType === 'cgstSgst' ? (
        <>
          <Box sx={{ mt: 2 }}>
            <TextField
              id="cgstRate"
              label="CGST Rate (%)"
              type="number"
              value={gstDetails.cgstRate}
              onChange={handleCgstRateChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              id="cgstAmount"
              label="CGST Amount"
              value={gstDetails.cgstAmount.toFixed(2)}
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
              value={gstDetails.sgstRate}
              onChange={handleSgstRateChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              id="sgstAmount"
              label="SGST Amount"
              value={gstDetails.sgstAmount.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="GST Total"
              value={gstDetails.gstTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Rate Total"
              value={gstDetails.rateTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Round Off"
              value={gstDetails.roundedRateTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Invoice Total INR"
              value={gstDetails.invoiceTotal.toFixed(2)}
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
              value={gstDetails.igstRate}
              onChange={handleIgstRateChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="IGST Amount"
              type="number"
              value={gstDetails.igstAmount}
              onChange={handleIgstRateChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="GST Total"
              value={gstDetails.gstTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Rate Total"
              value={gstDetails.rateTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Round Off"
              value={gstDetails.roundedRateTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Invoice Total"
              value={gstDetails.invoiceTotal.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </>
      )}
    </Container>
  );
}
export default GstCalculation;
