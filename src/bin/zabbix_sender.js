const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

const zabbixSender = async (zbxserver, server, key, value ) => { 
    try {
    const { stdout } = await execFile('/Users/danielnasiloski/zabbix_sender', [`-vv`, `-z${zbxserver}`, `-s${server}`, `-k${key}`, `-o ${value}`], { cwd: undefined, env: process.env });
    const firstJsonKeyPosition = stdout.lastIndexOf('[{')
    const lastJsonKeyPosition = stdout.lastIndexOf('}]')
    const response_json = JSON.parse(stdout.substring(firstJsonKeyPosition, lastJsonKeyPosition + 2))
    return response_json[0]
    
    } catch (err) {
        console.log(err);
        console.log(response_json);     
    }
}

module.exports = zabbixSender;