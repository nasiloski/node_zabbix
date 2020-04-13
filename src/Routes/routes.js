const express = require('express');
const routes = express.Router();

const usersRoutes = require('../controllers/users');

routes.get('/users', usersRoutes.index);
routes.post('/users/create', usersRoutes.store);
routes.post('/users/auth', usersRoutes.auth);

module.exports = routes;