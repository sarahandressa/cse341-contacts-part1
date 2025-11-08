const express = require('express');
const router = express.Router();
const { client } = require('../db/config');
const { ObjectId } = require('mongodb');

const db = client.db("myDatabase");

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await db.collection("contacts").find({}).toArray();
        res.json(contacts);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await db.collection("contacts").findOne({ _id: new ObjectId(req.params.id) });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(contact);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;