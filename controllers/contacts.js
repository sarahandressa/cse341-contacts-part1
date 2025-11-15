const { client } = require('../db/config');
const { ObjectId } = require('mongodb');

const db = () => client.db("myDatabase");

// GET all contacts
const getAllContacts = async (req, res) => {
    try {
        const result = await db().collection("contacts").find().toArray();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET contact by ID
const getContactById = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const result = await db().collection("contacts").findOne({ _id: id });

        if (!result) return res.status(404).json({ error: "Contact not found" });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllContacts,
    getContactById
};
