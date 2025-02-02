require("dotenv").config();
const mongoose = require("mongoose");
const prompt = require("prompt-sync")();
const Customer = require("./models/customer");

const main = async () => {
  // functions definitions
  const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  };

  const disconnect = async () => {
    await mongoose.disconnect();
    console.log("exiting...");
    process.exit();
  };

  const welcome = () => {
    console.log(`What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. quit
  `);

    const response = prompt("Number of action to run: ");

    console.log(response);
    return response;
  };

  const createCustomer = async () => {
    const name = prompt("What is the new customer's name? ");
    const age = prompt("What is the new customer's age? ");
    // edge case:
    // convert age to a number
    // if it doesn't succeed, reprompt for the age
    const customer = await Customer.create({
      name,
      age: parseInt(age),
    });
    console.log("You created:", customer);
  };

  const viewCustomers = async () => {
    const customers = await Customer.find({});
    customers.forEach((customer) => {
      // concatenation
      // console.log(
      //   "id: " +
      //     customer._id +
      //     " -- " +
      //     " Name: " +
      //     customer.name +
      //     ", Age: " +
      //     customer.age
      // );

      // string intepolation
      console.log(
        `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
      );
    });
  };

  const updateCustomer = async () => {
    console.log("Below is a list of customers: ");
    await viewCustomers();
    const id = prompt(
      "Copy and paste the id of the customer you would like to update here: "
    );
    const name = prompt("What is the customers new name? ");
    const age = prompt("What is the customers new age? ");

    const customer = await Customer.findByIdAndUpdate(
      id,
      {
        ...(name ? { name } : {}),
        ...(age ? { age } : {}),
      },
      { new: true }
    );
    console.log("Updated user:", customer);
  };

  const deleteCustomer = async () => {
    console.log("Below is a list of customers: ");
    await viewCustomers();
    const id = prompt(
      "Copy and paste the id of the customer you would like to delete here: "
    );
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    console.log("Deleted customer:", deletedCustomer);
  };

  // function invocations
  await connect();
  console.log("Welcome to your favorite CRM!\n");

  while (true) {
    const answer = welcome();
    if (answer === "1") await createCustomer();
    if (answer === "2") await viewCustomers();
    if (answer === "3") await updateCustomer();
    if (answer === "4") await deleteCustomer();
    if (answer === "5") await disconnect();
  }
};

main();
