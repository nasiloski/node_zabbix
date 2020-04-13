const express = require('express');
const app = express();
const mongoose = require('mongoose');
const zabbixSender = require('../src/services/zabbix_sender.js');

const statusDb = {
    connected: 1,
    error: 0,
    disconnected: 2
}

const DbURL = 'mongodb://localhost:27017/nodeapi';
const options = { poolSize: 5, useUnifiedTopology: true, useNewUrlParser: true };

mongoose.connect(DbURL, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados');
    zabbixSender('db.status', statusDb.error);
});

mongoose.connection.on('disconnected', () => { 
    console.log('Aplicacão desconectou do banco');
    zabbixSender('db.status', statusDb.disconnected);
});

mongoose.connection.on('connected', () => {
    console.log('App conectada ao banco com sucesso');
    zabbixSender('db.status', statusDb.connected);
});

mongoose.connection.on('timeout', (err) => {
    console.log('Timeout');
});

app.use(express.json());

const routes = require('../src/Routes/routes');
app.use(routes)


app.listen(3333);

module.exports = app;