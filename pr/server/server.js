const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

const PORT = process.env.PORT


const app = express();
app.use(cors({ credentials: true, origin: ['https://client-vert-xi.vercel.app', 'https://service-client.vercel.app'] }));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/prog', require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`.green);
})