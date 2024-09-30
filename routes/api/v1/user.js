const express = require('express');
const userController = require('../../../controllers/api/v1/user'); // Import the controller
const auth = require('../../../middleware/auth'); // Import the auth middleware
const checkRole = require('../../../middleware/role'); // Import the role middleware
const validateObjectId = require('../../../middleware/validateObjectId'); // Import the validateObjectId middleware
const router = express.Router();

// Route to get all users
router.get('/', auth, checkRole('admin'), userController.getAllUsers);

// Route to get a user by ID
router.get('/:id', auth, checkRole('admin'), validateObjectId, userController.getUserById);

// Route to create a new user
router.post('/', auth, checkRole('admin'), userController.createUser);

// Route to update a user by ID
router.put('/:id', auth, checkRole('admin'), validateObjectId, userController.updateUser);

// Route to delete a user by ID
router.delete('/:id', auth, checkRole('admin'), validateObjectId, userController.deleteUser);

// Handles any user errors
router.use((err, req, res, next) => {
    if (req.method === 'GET' && req.path === '/') {
        console.error("Error fetching users");
    } else if (req.method === 'POST' && req.path === '/') {
        console.error("Error creating a user");
    } else if (req.method === 'GET' && req.path.startsWith('/:id')) {
        console.error("Error fetching a user");
    } else if (req.method === 'PUT' && req.path.startsWith('/:id')) {
        console.error("Error updating a user");
    } else if (req.method === 'DELETE' && req.path.startsWith('/:id')) {
        console.error("Error deleting a user");
    } else {
        console.error("User error: ", err.message);
    }
    res.status(500).json({ error: 'An internal server error occurred' });
});

module.exports = router;