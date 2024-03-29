// Conexão DB
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config(path.resolve(__dirname));
mongoose.connect(process.env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
// Fim Conexão DB

const cors = require('cors');
const express = require('express');
const app = express();

// Para aceitar json no body
app.use(express.json());

// E requisições vindas de fora.
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Rotas
const router = require('./routes/routes');
app.use(router);
app.use('/api', router);

app.listen(3333);