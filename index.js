const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const apiPort = 3000

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

import mongoose from 'mongoose';
import route from './route/server.route'


// Connect with DB
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/db-movie', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Mongodb connected"))
.catch(err => console.log("Mongo Error "+err))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', route);
app.get('/', (req, res) => {
    res.send('Hello Movie Server!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))