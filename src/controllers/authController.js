const axios = require('axios');
require('dotenv').config();
const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} = process.env;

// --------------------------Google OAuth----------------------------

// Initiates the Google Login
const initiateAuth = (req,res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    console.log(url)
    res.json({url : url})
}

// Callback URL for handling the Google Login response
const callbackUrl = async (req,res) => {
    const {code} = req.query;
    try {
        // Exchange authorization code for access token
        const {data} = await axios.post('https://oauth2.googleapis.com/token',{
            client_id : CLIENT_ID,
            client_secret : CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
        });
        const {access_token, id_token} = data;

        // Use access_token or id_token to fetch user profile
        const {data : profile} = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo',{
            headers : { Authorization : `Bearer ${access_token}`}
        }) 
        console.log(profile);

        // Code to handle user authentication and retrieval using the profile data
        res.redirect('http://localhost:5173/')

    }catch (error){
        console.log(error)
        res.redirect('http://localhost:5173/');
    }
}

// --------------------------Email OAuth----------------------------

const randomstring = require('randomstring');
const sentEmail = require('../utils/sentEmail')

let OTP;

// Generate OTP
const generateOTP = () => {
    return randomstring.generate({
        length : 6,
        charset :'numeric'
    });
};

// Send OTP
const sendOTP = async (req, res) => {
    try{
        const {email} = req.body;
        const otp = generateOTP();
        OTP = otp
        await sentEmail({
            to : email,
            subject : 'Your OTP',
            message : `<p>Your OTP is: <strong>${otp}</strong></p>`
        })
        res.status(200).json({
            success : true,
            message : 'OTP Send Successfully',
            otp
        })
    }catch(error){
        console.error('Error sending OTP:', error);
        res.status(500).json({
            success : false,
            error : 'Internal server error'
        })
    }
};

const verifyOTP = async (req, res) => {
    const {otp} = req.body;
    if(otp === OTP) {
        res.status(200).json({ success: true, message: 'OTP verification successful' })
    }else{
        res.status(400).json({ success: false, error: 'Invalid OTP' });
    }
};

module.exports = {
    initiateAuth,
    callbackUrl,
    sendOTP,
    verifyOTP
}