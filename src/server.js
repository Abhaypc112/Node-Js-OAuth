const express = require('express');
const authRoute = require('./routes/authRoute.js');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin:'*',
    optionsSuccessStatus: 200
}));
app.use(authRoute)


app.listen(PORT,()=>console.log(`Server connected on port ${PORT}`))