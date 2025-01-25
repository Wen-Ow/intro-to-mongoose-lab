const mongoose = require("mongoose"); // Import mongoose library to interact with MongoDB
require("dotenv").config(); // Load environment variables from a .env file
const prompt = require("prompt-sync")(); // Import prompt-sync library to get user input from the terminal

const Customer = require("./models/customer.js"); // Import the Customer model from the customer.js file

// Function to create a new customer
const create = async () => {
  const customerName = prompt("What is the customer's name? "); // Get the customer's name from the user
  const customerAge = prompt("What is the customer's age? "); // Get the customer's age from the user
  await Customer.create({
    // Add a new customer to the database
    name: customerName,
    age: customerAge,
  });
  getAction(); // Return to the main menu
};

// Function to read and display all customers
const read = async () => {
  const customers = await Customer.find({}); // Fetch all customers from the database
  customers.forEach((customer) => {
    // Loop through each customer's details and display their id, name, and age
    console.log(
      `id: ${customer._id} --  Name: ${customer.name}. Age: ${customer.age}`
    );
  });
  getAction();
};

// Function to update a customer's details
const update = async () => {
  console.log("Below is a list of customers: "); // Display a list of all customers
  const customers = await Customer.find({}); // Fetch all customers from the database
  customers.forEach((customer) => {
    // Loop through each customer's details and display their id, name, and age
    console.log(
      `id: ${customer._id} --  Name: ${customer.name}. Age: ${customer.age}`
    );
  });

  const id = prompt(
    // Get the id of the customer to update from the user
    "Copy and paste the id of the customer you would like to update here: "
  );
  const customerName = prompt("What is the customer's new name? "); // Get the new name for the customer from the user
  const customerAge = prompt("What is the customer's new age? "); // Get the new age for the customer from the user
  await Customer.findByIdAndUpdate(id, {
    // Update the customer's details in the database
    name: customerName,
    age: customerAge,
  });

  getAction();
};

// Function to delete a customer
const destroy = async () => {
  console.log("Below is a list of customers: "); // Display a list of all customers
  const customers = await Customer.find({}); // Fetch all customers from the database
  customers.forEach((customer) => {
    // Loop through each customer's details and display their id, name, and age
    console.log(
      `id: ${customer._id} --  Name: ${customer.name}. Age: ${customer.age}`
    );
  });

  const id = prompt(
    // Get the id of the customer to delete from the user
    "Copy and paste the id of the customer you would like to delete here: "
  );
  await Customer.findByIdAndDelete(id); // Delete the customer from the database
  getAction();
};

// Function to exit the program
const quit = async () => {
  console.log("exiting..."); // Display a message to indicate that the program is exiting
  mongoose.connection.close(); // Close the connection to the MongoDB database
};

// Function to perform an action based on the user's input
const performAction = (action) => {
  if (action === 1) {
    create(); // Add a new customer
  } else if (action === 2) {
    read(); // Display all customers
  } else if (action === 3) {
    update(); // Update a customer
  } else if (action === 4) {
    destroy(); // Delete a customer
  } else if (action === 5) {
    quit(); // Exit the program
  }
};

// Function to display the main menu and get the user's input
const getAction = () => {
  console.log("What would you like to do?");
  console.log("  1. Create a customer");
  console.log("  2. View all customers");
  console.log("  3. Update a customer");
  console.log("  4. Delete a customer");
  console.log("  5. quit");
  const action = parseInt(prompt("Number of action to run: ")); // Prompt the user to select an action
  performAction(action); // Perform the selected action
};

// Main function to connect to the MongoDB database and display the main menu
const main = async () => {
  await mongoose.connect(process.env.MONGODB_URI); // Connect to the MongoDB database using the connection string in the .env file
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`); // Display a message to indicate that the connection was successful
  console.log("Welcome to the CRM"); // Display a welcome message
  getAction();
};

main(); // Call the main function to start the program
