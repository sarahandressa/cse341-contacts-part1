const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./db/config');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', require('./routes'));

// Connect to DB
const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}

startServer();