// // Import necessary modules
const express = require('express'); // Express framework for building the server
const bodyParser = require('body-parser'); // Middleware for parsing JSON request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing (CORS)
const fs = require('fs'); // File System module to handle file operations

// Create an Express application
const app = express();

// Specify the JSON file to store emergency data
const dataFile = './data1.json'; // File where emergency data is stored
let data = require(dataFile); // Load the data from data1.json into memory

// Middleware configuration
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all routes

// API to get all emergencies
app.get('/api/emergencies', (req, res) => {
    res.json(data); // Send the entire list of emergencies as a JSON response
});

// API to add a new emergency
app.post('/api/emergencies', (req, res) => {
    const newEmergency = req.body; // Get the new emergency data from the request body
    newEmergency.id = data.length + 1; // Assign a unique ID based on the current data length
    data.push(newEmergency); // Add the new emergency to the in-memory data array

    // Save the updated data to the JSON file
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2)); // Write updated data to data1.json
    res.status(201).json({ message: 'Emergency added!', newEmergency }); // Send a success response
});

// API to update an emergency
app.put('/api/emergencies/:id', (req, res) => {
    const { id } = req.params; // Get the ID of the emergency to update from the URL parameters
    const index = data.findIndex(e => e.id == id); // Find the index of the emergency by its ID

    if (index !== -1) {
        data[index] = { ...data[index], ...req.body }; // Update the emergency with new data

        // Save the updated data to the JSON file
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2)); // Save changes to data1.json
        res.json({ message: 'Emergency updated!', updatedEmergency: data[index] }); // Send a success response
    } else {
        res.status(404).json({ message: 'Emergency not found!' }); // Send an error response if ID is not found
    }
});

// API to delete an emergency
app.delete('/api/emergencies/:id', (req, res) => {
    const { id } = req.params; // Get the ID of the emergency to delete from the URL parameters
    data = data.filter(e => e.id != id); // Filter out the emergency with the specified ID

    // Save the updated data to the JSON file
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2)); // Save changes to data1.json
    res.json({ message: 'Emergency deleted!' }); // Send a success response
});

// Start the server and listen on the specified port
const PORT = 3000; // Define the port for the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)); // Start the server and log the URL
