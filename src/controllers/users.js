const User = require('../Model/user');
const bcrypt = require('bcrypt');
const zabbixSender = require('../services/zabbix_sender.js');

module.exports = {
    async index(req, res) {
        try {
            const data = await User.find({});
            if(data.length === 0) return res.status(200).json({ message: 'Nenhum usuário cadastrado' });
            return res.status(200).json(data)

        } catch (err) {
            console.log(`SERVER: Erro ao buscar usuários: ${err}`);
            return res.status(500).json({ error: 'Erro ao consultar usuários' });
        }

    },
    async store(req, res) {
        const { email, password } = req.body;
        if(!email || !password) return res.status(204).json({ message: 'Dados insuficientes' });
        try{
            let data = await User.findOne({ email });

            if(data) return res.status(200).json({ error: 'Usuário já registrado' });

            data = await User.create({ email, password });

            data.password = undefined;
            return res.status(201).json(data);



        } catch (err) {
            console.log(`SERVER: Erro ao buscar usuários: ${err}`);
            return res.status(500).json({ error: 'Erro ao realizar cadastro' });
        }

    },
    async auth(req, res) {
        const { email, password } = req.body;
        if(!email || !password) return res.status(204).json({ error: 'Dados insuficientes' });
        try {
            let data = await User.findOne({ email }).select('+password');
            if(!data) return res.status(200).json({ error: "Falha na autenticação" });

            const same = await bcrypt.compare(password, data.password);
            if(!same) {
                zabbixSender('user.auth', 1)
                return res.status(200).json({ error: 'Usuário ou senha inválidos' });
            }
            data.password = undefined;
            zabbixSender('user.auth', '0')
            return res.status(200).json(data);
            


        } catch (err) {
            console.log(`SERVER: Erro ao buscar usuários: ${err}`);
            return res.status(500).json({ error: 'Erro no servidor' })
        }

    }
}