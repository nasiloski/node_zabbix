const zabbixSender = require('./src/bin/zabbix_sender.js');

const zbxServer = '192.168.100.250';
const zbxHost = 'nodejs';
const key = 'mongodb.check'
const mongoDbStatus = {
    connected: 0,
    error: 1,
    disconnected: 2
}

zabbixSender(zbxServer, zbxHost, key, mongoDbStatus.connected);