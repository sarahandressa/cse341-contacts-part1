const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const connectDB = async() => {
    try {
        await client.connect();
        const database = client.db("db");
        if (!(await database.listCollections({ name: 'contacts' }).hasNext())) {
            await database.createCollection('contacts');
            console.log('Created contacts collection');
        }
        console.log('Successfully connected to MongoDB');
        return client;
    } catch (e) {
        console.error('MongoDB connection error:', e);
        throw e;
    }
}

module.exports = {
    connectDB,
    client
}