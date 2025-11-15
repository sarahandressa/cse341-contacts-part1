const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./db/config');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/index'));

const contactsRoutes = require('./routes/contacts');

app.use('/contacts', contactsRoutes);

const startServer = async () => {
    await connectDB(); 
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}

startServer();
