const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// GET all contacts
router.get('/', 
    //#swagger.tags=['Contacts']
    contactsController.getAllContacts
);

// GET contact by ID
router.get('/:id', 
    //#swagger.tags=['Contacts']
    contactsController.getContactById
);

// Create
router.post('/', 
    //#swagger.tags=['Contacts']
    contactsController.createContact
);

// Update
router.put('/:id', 
    //#swagger.tags=['Contacts']
    contactsController.updateContact
);

// Delete
router.delete('/:id', 
    //#swagger.tags=['Contacts']
    contactsController.deleteContact
);

module.exports = router;
