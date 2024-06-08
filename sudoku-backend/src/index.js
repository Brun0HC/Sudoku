// src/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const banco = require('../db/banco')

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/sudoku', require('./routes/sudoku'));
app.use('/usuario', require('./routes/usuario'));

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor do Sudoku está rodando.');
});

// Iniciar servidor
app.listen(PORT, async ()=>{
    await banco.criaTabelas();
    await banco.criaTabelaSudoku();
    await banco.insereSudoku();
    await banco.criaTabelaToken();
    console.log("servidor rodando na porta " + PORT);
})
