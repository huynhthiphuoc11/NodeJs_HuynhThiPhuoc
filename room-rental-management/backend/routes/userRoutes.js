const express = require('express');
const UserController = require('../controllers/userController');

const setUserRoutes = (app) => {
    const userController = new UserController();

    app.get('/api/users', userController.getUsers.bind(userController));
    app.post('/api/users', userController.createUser.bind(userController));
};

module.exports = setUserRoutes;