import React, { useState, useEffect } from 'react';
import { Typography, Container, TextField, Button, Box, Grid } from '@mui/material';
import GstCalculation from './GstCalculation'
import ItemDetailsTable from './ItemDetailsTable'
import PdfReportData from './pdfReportData'
const ItemsTable = ({ customerDetails, date, shipmentDetails }) => {
  const [items, setItems] = useState([
    {
      slno: 1,
      description: '',
      hsnCode: '48130',
      qty: '',
      rate: '',
      total: 0,
      gstType: '',
      cgstRate: 9,
      sgstRate: 9,
      igstRate: 0,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: 0
    },
  ]);
  const [nextSlNo, setNextSlNo] = useState(2); // Start from 2 since the first item has slno 1
  const [gstTotalValues, setGstTotalValues] = useState({});
  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    if (field === 'qty' || field === 'rate') {
      const qty = parseFloat(updatedItems[index].qty) || 0;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].total = qty * rate;
      updatedItems[index].cgstAmount = (updatedItems[index].total * updatedItems[index].cgstRate) / 100;
      updatedItems[index].sgstAmount = (updatedItems[index].total * updatedItems[index].sgstRate) / 100;
      updatedItems[index].igstAmount = (updatedItems[index].total * updatedItems[index].igstRate) / 100;
    }
    setItems(updatedItems);
  };
  const handleAddRow = () => {
    setItems([
      ...items,
      {
        slno: nextSlNo, description: '', hsnCode: '48130', qty: '', rate: '', total: 0,
        gstType: '',
        cgstRate: 9,
        sgstRate: 9,
        igstRate: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 0
      },
    ]);
    setNextSlNo(nextSlNo + 1);
  };
  const handleRemoveRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

  };
  useEffect(() => {
    // Calculate GST totals whenever items change
    let gstTotalAdded = gstTotalCalculation(items);
    setGstTotalValues(gstTotalAdded);
  }, [items]);
  console.log("output gstTotalValues", gstTotalValues)
  function gstTotalCalculation(items) {
    console.log("gstTotalCalculation ", items)
    let gstTotal = {}
    let [cgstTotal, sgstTotal, igstTotal, rateTotal, gstTotalSum, roundOff, invoiceTotalInr] = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < items.length; i++) {
      if (items[i].gstType = 'cgstSgst') {
        cgstTotal += items[i].cgstAmount;
        sgstTotal += items[i].sgstAmount;
      }
      else {
        igstTotal += items[i].igstAmount;
      }
      rateTotal += items[i].total;
    }
    if(igstTotal>0)
    {
      gstTotalSum=igstTotal
    }
    else
    {
      gstTotalSum = cgstTotal + sgstTotal
    }
    roundOff = Math.round(rateTotal);
    invoiceTotalInr = roundOff + gstTotalSum
    gstTotal = {
      cgstTotal,
      sgstTotal,
      igstTotal,
      rateTotal,
      gstTotalSum,
      roundOff,
      invoiceTotalInr
    };
    return gstTotal;
  }
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
            <GstCalculation item={item} index={index} setItems={setItems} />
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
      <div>
        <h1>Item Details</h1>
        <ItemDetailsTable items={items} />
      </div>
      <div>
        <PdfReportData items={items} customerDetails={customerDetails}
          date={date} shipmentDetails={shipmentDetails}
          gstTotalValues={gstTotalValues} />
      </div>
    </Container>
  );
};
export default ItemsTable;
