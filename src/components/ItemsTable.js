import React, { useState, useEffect } from 'react';
import {
  Typography, Container, TextField, Button, Box, Grid,
  FormControl, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import PdfReportData from './pdfReportData'
import GstForm from './GstForm';
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
  const [gstType, setGstType] = useState('cgst_sgst'); // Set default to 'cgst_sgst'
  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    if (field === 'qty' || field === 'rate' || field === 'cgstRate' || field === 'sgstRate' || field === 'igstRate') {
      const qty = parseFloat(updatedItems[index].qty) || 0;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].total = qty * rate;
      console.log("gstType ", gstType)
      console.log("gstType ", updatedItems[index].cgstRate)
      if (gstType === "cgst_sgst") {
        updatedItems[index].igstRate = 0;
        updatedItems[index].igstAmount = 0
        updatedItems[index].cgstAmount = (updatedItems[index].total * updatedItems[index].cgstRate) / 100;
        updatedItems[index].sgstAmount = (updatedItems[index].total * updatedItems[index].sgstRate) / 100;
      }
      if (gstType === "igst") {
        updatedItems[index].cgstRate = 0;
        updatedItems[index].sgstRate = 0;
        updatedItems[index].cgstAmount = 0
        updatedItems[index].sgstAmount = 0
        console.log("igstRate ", updatedItems[index].igstRate)
        console.log("total_igstRate ", updatedItems[index].total)

        updatedItems[index].igstAmount = (updatedItems[index].total * updatedItems[index].igstRate) / 100;
        console.log("igstAmount", updatedItems[index].igstAmount)
      }
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
    let gstTotalAdded = gstTotalCalculation(items);
    setGstTotalValues(gstTotalAdded);
  }, [items]);
  console.log("output gstTotalValues", gstTotalValues)
  function gstTotalCalculation(items) {
    console.log("gstTotalCalculation ", items)
    let gstTotal = {}
    let [cgstTotal, sgstTotal, igstTotal, rateTotal, gstTotalSum, roundOff, invoiceTotalInr] = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < items.length; i++) {
      if (gstType === 'cgst_sgst') {
        cgstTotal += items[i].cgstAmount;
        sgstTotal += items[i].sgstAmount;
      }
      if (gstType === 'igst') {
        igstTotal += items[i].igstAmount;
      }
      rateTotal += items[i].total;
    }
    if (igstTotal > 0) {
      gstTotalSum = igstTotal
    }
    else {
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
  const [billNo, setBillNo] = useState('');
  const generateBillNo = () => {
    const alphaNumbericals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let billNumber = '';
    for (let i = 0; i < 4; ++i) {
      billNumber += alphaNumbericals.charAt(Math.floor(Math.random() * alphaNumbericals.length));
    }
    return billNumber
  }
  useEffect(() => {
    const newBillNo = generateBillNo();
    setBillNo(newBillNo);
  }, []);
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Items Table
      </Typography>
      <Typography variant="h4" gutterBottom>Select GST Type</Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gst-type"
          name="gstType"
          value={gstType}
          onChange={(e) => setGstType(e.target.value)}
        >
          <FormControlLabel value="cgst_sgst" control={<Radio />} label="CGST & SGST" />
          <FormControlLabel value="igst" control={<Radio />} label="IGST" />
        </RadioGroup>
      </FormControl>
      <GstForm
        gstType={gstType}
        items={items}
        handleChange={handleChange}
        handleRemoveRow={handleRemoveRow}
        handleAddRow={handleAddRow}
      />
      <div>
        <PdfReportData items={items} customerDetails={customerDetails}
          date={date} shipmentDetails={shipmentDetails}
          gstTotalValues={gstTotalValues} billNo={billNo} />
      </div>
    </Container>
  );
};
export default ItemsTable;