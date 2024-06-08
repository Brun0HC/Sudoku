const express = require('express');
const router = express.Router();
const banco = require("../../db/banco");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = 'uy345u3t4uf53u45t34rg';

router.post("/", async (req, res) => {
    const usuarioBanco = await banco.buscarUsuario(req.body.email)
    if(!usuarioBanco){
        try{
            const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
            };

            const resultado = await banco.cadastraUsuario(usuario);
            res.status(201).send(resultado);
        }catch(err){
            res.status(500).send(err)
        }
    }
    else
        res.status(400).send('Usuário já cadastrado')
    
})

router.post("/login", async (req, res) => {
    const usuario = {
        email: req.body.email,
        senha: req.body.senha
    };

    const usuarioBanco = await banco.buscarUsuario(usuario.email, usuario.senha);
    if (usuarioBanco) {

        const senhaValida = await bcrypt.compare(usuario.senha, usuarioBanco.senha);
        if (senhaValida) {
            const token = jwt.sign({ id: usuarioBanco.id, email: usuarioBanco.email }, SECRET_KEY, { expiresIn: '1h' });
            try{
                banco.cadastraTokenUser(token, usuarioBanco.id);
            }catch(err){
                return res.status(500).send('Ocorreu um erro ao gerar o token');
            }

            const result = { token, usuario: { id: usuarioBanco.id, email: usuarioBanco.email } };
            return res.status(200).json(result);
        }
    }
    res.status(401).json({ message: 'Email ou senha inválidos' });




})

router.get('/:id', async (req, res) => {
    const usuario = await banco.getUsuario(req.params.id);
    res.status(200).send(usuario);
})

module.exports = router;