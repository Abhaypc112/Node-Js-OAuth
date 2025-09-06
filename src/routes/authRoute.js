const express = require('express');
const { initiateAuth, callbackUrl, sendOTP, verifyOTP } = require('../controllers/authController');
const authRoute = express.Router();


authRoute.get('/auth/google', initiateAuth);
authRoute.get('/auth/google/callback',callbackUrl );
authRoute.post('/sendOTP', sendOTP);
authRoute.post('/verifyOTP', verifyOTP);

module.exports = authRoute;