const mongoose = require("mongoose"); // Import mongoose library to interact with MongoDB

const customerSchema = mongoose.Schema({
  // Define the new schema (structure) for the Customer model
  name: String, // The name field is a string or customer's name (text)
  age: Number, // The age field is a number
});

const Customer = mongoose.model("Customer", customerSchema); // Create a new model called Customer using the schema

module.exports = Customer; // Export the Customer model to use in other files
