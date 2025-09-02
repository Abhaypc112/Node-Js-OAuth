const express = require('express');
const { initiateAuth, callbackUrl } = require('../controllers/authController');
const authRoute = express.Router();


authRoute.get('/auth/google', initiateAuth)
authRoute.get('/auth/google/callback',callbackUrl )

module.exports = authRoute;