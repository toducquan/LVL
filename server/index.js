const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const router = require('./src/router')
const bodyParser = require('body-parser')
const cors = require('cors');

require('dotenv').config({path: path.join(__dirname, './.env')})

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

mongoose.connect(`${process.env.MONGO_URL}`,  { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database connect'))
.catch((err) => console.log('Cannot connect mongodb: ', err))

app.use('/', router);

app.get('/', (req, res) => {
    res.status(200).send({
        mess: "hehe",
    })
})

const port = process.env.PORT || 4000

app.listen(port, (req, res) => {
    console.log('Server is running on', port);
})