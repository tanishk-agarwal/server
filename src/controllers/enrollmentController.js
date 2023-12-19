const User = require('../models/userModel');
const Payment = require('../models/paymentModel');
const Registration = require('../models/registrationModel');

const getHomepage = async (req, res) => {
    try {
        res.json({ message: "Welcome to Yoga-Form Home Page" });
    } catch (error) {
        console.error('Error getting home page');
        res.status(500).json({ error: 'Internal server error' });
    }
};

const makePayment = async (req, res) => {
    try {
        const { name, dob, email, batch } = req.body;

        // validate age and other fields
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        console.log("Current Age: ", age);

        // if age < 18 and > 65
        if (age < 18 || age > 65) {
            return res.status(400).json({ error: 'Invalid age. Must be between 18 and 65.' });
        }

        // Check if a user with the same name, date of birth, and email already exists
        const existingUser = await User.findOne({ name, dob, email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same name, date of birth, and email already registered.' });
        }

        // Simulate payment success or failure
        const paymentSuccess = Math.random() < 0.85; // 85% chance of success
        console.log(paymentSuccess);

        // Create a payment entry with the corresponding user ID
        const payment = new Payment({ name, email, dob, batch, status: paymentSuccess ? 'Success' : 'Failed' });
        await payment.save();

        if (paymentSuccess) {
            const user = new User({ name, dob, email, batch });
            await user.save();
            res.status(200).json({ message: 'Payment successful.' });
        } else {
            res.status(500).json({ error: 'Payment failed. Please try again.' });
        }
    } catch (err) {
        console.error('Error making payment');
        res.status(500).json({ error: 'Internal server error' });
    }
};

const submitForm = async (req, res) => {
    const { name, dob, email, batch } = req.body;

    try {
        // Check if a payment entry exists for the user
        const paymentEntry = await Payment.findOne({ name, email, dob });

        if (paymentEntry && paymentEntry.status === 'Success') {
            // Save user details in the Registration schema
            const registration = new Registration({ name, email, dob, batch });
            await registration.save();

            res.status(201).json({ message: 'Form submitted successfully.' });
        } else {
            res.status(400).json({ error: 'Payment not successful. Please pay the fee to submit the form.' });
        }
    } catch (err) {
        console.error('Error submitting form');
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await Registration.find();
        res.json(users);
    } catch (err) {
        console.error('Error getting users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateBatch = async (req, res) => {
    try {
      const { email, newBatch } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Update the batch choice
      user.batch = newBatch;
      await user.save();
  
      res.status(200).json({ message: 'Batch choice updated successfully.' });
    } catch (err) {
      console.error('Error updating batch choice');
      res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getHomepage,
    makePayment,
    submitForm,
    getUsers,
    updateBatch
};
