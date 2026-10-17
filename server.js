const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Bonus: log every request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve the HTML page
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create a user
app.post("/user", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    res.status(201).json({
        message: `Hello, ${name}!`,
        name,
        email
    });
});

// Get a user profile
app.get("/user/:id", (req, res) => {
    res.json({
        message: `User ${req.params.id} profile`,
        id: req.params.id
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
