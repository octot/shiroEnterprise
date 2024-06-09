const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors()); // Allows requests from your React frontend

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://user:user@cluster0.syund4p.mongodb.net/shiroenterprise', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Timeout after 30s
  socketTimeoutMS: 45000,         // Close sockets after 45s of inactivity
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema
const customerSchema = new mongoose.Schema({
  name: String,
  address: String,
  customerGst: String,
  phoneNumber: String
});

// Define a model
const Customer = mongoose.model('Customer', customerSchema);
app.post('/api/customers', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send('Customer data saved');
  } catch (error) {
    res.status(500).send('Error saving customer data');
  }
});
app.get('/api/getExistingCustomerDetails', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).send('Error fetching customer data');
  }
});
app.post('/api/saveExistingCustomerDetails', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send('Customer data saved');
  } catch (error) {
    res.status(500).send('Error saving customer data');
  }
});

app.put('/api/editExistingCustomerDetails/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    res.json(customer);
  } catch (error) {
    res.status(500).send('Error updating customer data');
  }
});

app.delete('/api/deleteExistingCustomerDetails/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting customer data');
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = { customerSchema };
