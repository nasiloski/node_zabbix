const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const { ZBXSERVER, ZBXHOST, ZBXSENDER } = process.env;

const zabbixSender = async (key, value ) => { 
    console.log(value)
    try {
    const { stdout } = await execFile(ZBXSENDER, [`-vv`, `-z${ZBXSERVER}`, `-s${ZBXHOST}`, `-k${key}`, `-o ${value}`], { cwd: undefined, env: process.env });
    const firstJsonKeyPosition = stdout.lastIndexOf('[{')
    const lastJsonKeyPosition = stdout.lastIndexOf('}]')
    const response_json = JSON.parse(stdout.substring(firstJsonKeyPosition, lastJsonKeyPosition + 2))
    // const response = response_json[0]
    return console.log('ZABBIX MODULE: Status enviado com sucesso ao Zabbix Server');
    
    
    } catch (err) {
        if(!ZBXSENDER) return console.log('ZABBIX MODULE: zabbbix_sender não encontrado')
        return console.log('ZABBIX MODULE: Erro ao enviar status para o Zabbix Server, verifique o ZBXSERVER, ZBXHOST ou Chave do item');

    }
}

module.exports = zabbixSender;