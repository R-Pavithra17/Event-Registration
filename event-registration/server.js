const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/register', (req, requireRes) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return requireRes.status(400).json({ error: 'Name and email are required.' });
    }
    const logEntry = `Name: ${name}, Email: ${email}, Date: ${new Date().toISOString()}\n`;
    const dataPath = path.join(__dirname, 'data', 'registrations.txt');

    fs.appendFile(dataPath, logEntry, (err) => {
        if (err) {
            return requireRes.status(500).json({ error: 'Failed to save data.' });
        }
        requireRes.status(200).json({ message: 'Registration successful!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});