const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

let users = []; // In-memory database for simplicity

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Add a new user
app.post('/users', (req, res) => {
    const { name, email, dob } = req.body;
    const id = users.length + 1; // Auto-generate an ID
    users.push({ id, name, email, dob });
    res.status(201).json({ message: 'User added successfully' });
});

// Update a user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, dob } = req.body;
    const user = users.find((u) => u.id == id);
    if (user) {
        user.name = name;
        user.email = email;
        user.dob = dob;
        res.json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter((u) => u.id != id);
    res.json({ message: 'User deleted successfully' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
