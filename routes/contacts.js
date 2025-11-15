const express = require('express');
const router = express.Router();
const { client } = require('../db/config');
const { ObjectId } = require('mongodb');
const contactsController = require('../controllers/contacts');

const db = client.db("myDatabase");

// GET all contacts
router.get('/', contactsController.getAllContacts);

// GET contact by ID
router.get('/:id', contactsController.getContactById);

module.exports = router;