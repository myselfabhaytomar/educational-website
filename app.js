const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = new sqlite3.Database('users.db');

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT UNIQUE,
        password TEXT,
        dob DATE,
        address TEXT,
        state TEXT
    )
`);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});


app.post('/register', async (req, res) => {
    try {
        const { username, email, password, dob, address, state } = req.body;

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user information into the database
        db.run(
            'INSERT INTO users (username, email, password, dob, address, state) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, dob, address, state],
            (err) => {
                if (err) {
                    // Check for duplicate email (unique constraint)
                    if (err.message.includes('UNIQUE constraint failed: users.email')) {
                        return res.status(400).send('Email address is already registered.');
                    }
                    console.error(err);
                    return res.status(500).send('Internal Server Error');
                }

                res.status(201).send('Registration successful!');
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
