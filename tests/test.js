const chai = require('chai');
const zabbixSender = require('../src/bin/zabbix_sender.js');
const expect = chai.expect;

describe('Teste Zabbix Sender', () => {
    it('Should connect to remote server', async () => {
        const zbxServer = '192.168.100.250';
        const zbxHost = 'nodejs';
        const key = 'mongodb.check';
        const mongoDbStatus = {
            connected: 0,
            error: 1,
            disconnected: 2
        }

        try {
        const zabbixResponse = await zabbixSender(zbxServer, zbxHost, key, mongoDbStatus.connected);

        expect(zabbixResponse.response).to.be.equal('success');

        } catch (error){
            console.log(error)
        };

    });

    
});