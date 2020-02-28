const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const zabbixSender = require('../src/bin/zabbix_sender.js');

const zbServer = '192.168.100.250';
const zbxHost = 'nodejs';
const statusDb = {
    connected: 0,
    error: 1,
    disconnected: 2
}

const DbURL = 'mongodb://localhost:27017/nodapi';
const options = { poolSize: 5, useUnifiedTopology: true, useNewUrlParser: true };

mongoose.connect(DbURL, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados');
    zabbixSender(zbServer, zbxHost, statusDb.error);
});

mongoose.connection.on('disconnected', () => { 
    console.log('Aplicacão desconectou do banco');
    zabbixSender(zbServer,zbxHost, statusDb.disconnected);
});

mongoose.connection.on('connected', () => {
    console.log('App conectada ao banco com sucesso');
    zabbixSender(zbServer, zbxHost, statusDb.connected);
});

mongoose.connection.on('timeout', (err) => {
    console.log('TIMEOUT NESSA PORRA');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoute = require('./Routes/users');

app.use('/users', userRoute);

app.listen(3000);

module.exports = app;