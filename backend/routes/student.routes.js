const express = require('express');
const { registerUser, displayAllUsers, signinUser } = require('../controllers/user.controller');

const route = express.Router();

route.post('/register',registerUser);
route.get('/display',displayAllUsers);
route.post('/signin',signinUser);

module.exports = route;