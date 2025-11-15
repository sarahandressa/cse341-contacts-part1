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

// Create a new contact
const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
        };

        const response = await db().collection('contacts').insertOne(contact);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ error: 'Failed to create contact' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing contact
const updateContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
        };

        const response = await db().collection('contacts').replaceOne({ _id: contactId }, contact);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const response = await db().collection('contacts').deleteOne({ _id: contactId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};

