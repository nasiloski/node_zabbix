const express = require('express');
const router = express.Router();
const Users = require('../Model/user');


router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if(err) return res.send({ error: 'Erro ao buscar usuarios' });
        if(data.length == 0) return res.send({ message: 'Nenhum dado cadastrado' });

        res.send(data);
    });
    

});

router.post('/create', (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.send({ error: 'Dados informados são insuficientes' });

    Users.findOne({ email }, (err, data) => {
        if(err) return res.send({ error: 'Erro na busca de usuario' });
        if(data) return res.send({ error: 'usuario já existe'} );

        Users.create({ email, password }, (err, data) => {
            if(err) return res.send({ error: 'Erro ao criar usuario' });

            data.password = undefined;

            return res.send(data);
        })

    });
});

module.exports = router;