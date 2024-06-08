const jwt = require('jsonwebtoken');
const secretKey = 'uy345u3t4uf53u45t34rg';
const banco = require('../../db/banco')

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token == null) return res.status(401).send('Token não informado');

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Se o token for inválido, retorna 'Forbidden'
        const usuario = banco.buscarTokenUser(token)
            if(usuario.length===0){return res.status(401).send('Token not found')}
        req.user = user;
        next();
    });
};

module.exports = authenticateToken