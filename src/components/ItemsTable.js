import React, { useState, useEffect } from 'react';
import { Typography, Container, TextField, Button, Box, Grid } from '@mui/material';
import GstCalculation from './GstCalculation'
const ItemsTable = ({ setTotal }) => {
  const [items, setItems] = useState([
    {
      slno: 1,
      description: '',
      hsnCode: '48130',
      qty: '',
      rate: '',
      total: 0,
    },
  ]);
  const [nextSlNo, setNextSlNo] = useState(2); // Start from 2 since the first item has slno 1
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.total, 0);
    setTotal(total);
  }, [items, setTotal]);

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    if (field === 'qty' || field === 'rate') {
      const qty = parseFloat(updatedItems[index].qty) || 0;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].total = qty * rate;
    }
    setItems(updatedItems);
  };
  const handleAddRow = () => {
    setItems([
      ...items,
      { slno: nextSlNo, description: '', hsnCode: '48130', qty: '', rate: '', total: 0 },
    ]);
    setNextSlNo(nextSlNo + 1); // Increment serial number for the next item
  };
  const handleRemoveRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  console.log("items ", items)
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Items Table
      </Typography>
      {items.map((item, index) => (
        <Box key={index} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Sl No"
                value={item.slno}
                onChange={(e) => handleChange(index, 'slno', e.target.value)}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Description"
                value={item.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="HSN CODE"
                value={item.hsnCode}
                onChange={(e) => handleChange(index, 'hsnCode', e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="QTY"
                value={item.qty}
                onChange={(e) => handleChange(index, 'qty', e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Rate"
                value={item.rate}
                onChange={(e) => handleChange(index, 'rate', e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Total"
                value={item.total.toFixed(2)}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={1} display="flex" alignItems="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveRow(index)}
                sx={{ mt: 2 }}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRow}
        sx={{ mt: 2 }}
      >
        Add Row
      </Button>
    </Container>
  );
};

export default ItemsTable;
