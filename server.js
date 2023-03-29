require('dotenv').config()

const express = require ('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
  }));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.log('Error'))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const housingRoutes = require('./routes/housing')
app.use('/housing', housingRoutes)

app.listen(4000, () => console.log('Server just started!'))

