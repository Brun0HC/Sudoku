const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

async function conecta() {
    const conexao = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        database: "sudoku",
        user: "root",
        password: "root"
    });

    return conexao;
}

async function criaTabelas() {
    const sql = `CREATE TABLE IF NOT EXISTS usuario 
        (id INT AUTO_INCREMENT PRIMARY KEY, 
        nome VARCHAR(100), email VARCHAR(100), 
        senha VARCHAR(255)
        );`;
    const conexao = await conecta();
    return await conexao.query(sql);
}

async function criaTabelaToken() {
    const sql = `CREATE TABLE IF NOT EXISTS token 
        (id INT AUTO_INCREMENT PRIMARY KEY, 
        token VARCHAR(255),
        usuario INT,
        FOREIGN KEY (usuario) REFERENCES usuario(id)
        );`;
    const conexao = await conecta();
    return await conexao.query(sql);
}

async function cadastraTokenUser(token, usuario) {

    const sql = `INSERT INTO token(token, usuario) VALUES(?, ?)`;
    const parametros = [token, usuario];
    const conexao = await conecta();
    return await conexao.query(sql, parametros);
}

async function buscarTokenUser(token) {

    const sql = `select usuario from token where usuario in (select id from usuario) and token=?`;
    const parametros = [token];
    const conexao = await conecta();
    return await conexao.query(sql, parametros);
}

async function criaTabelaSudoku() {
    const conexao = await conecta();
    const sql = `
        CREATE TABLE IF NOT EXISTS sudoku (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tabela JSON
        );
    `;
    return await conexao.query(sql);
}

async function insereSudoku() {
    const conexao = await conecta();
    const sql = `
    INSERT INTO sudoku(tabela) VALUES (
        '[ [5, 3, 4, 6, 7, 8, 9, 1, 2], [6, 7, 2, 1, 9, 5, 3, 4, 8], [1, 9, 8, 3, 4, 2, 5, 6, 7], [8, 5, 9, 7, 6, 1, 4, 2, 3], [4, 2, 6, 8, 5, 3, 7, 9, 1], [7, 1, 3, 9, 2, 4, 8, 5, 6], [9, 6, 1, 5, 3, 7, 2, 8, 4], [2, 8, 7, 4, 1, 9, 6, 3, 5], [3, 4, 5, 2, 8, 6, 1, 7, 9] ]');
    `;
    return await conexao.query(sql);
}


async function cadastraUsuario(usuario) {
    const hashedSenha = await bcrypt.hash(usuario.senha, 10);
    const sql = `INSERT INTO usuario(nome, email, senha) VALUES(?, ?, ?)`;
    const parametros = [usuario.nome, usuario.email, hashedSenha];
    const conexao = await conecta();
    return await conexao.query(sql, parametros);
}

async function buscarUsuario(email) {
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT id, email, senha FROM usuario WHERE email = ?", [email]);

    if (resultado.length > 0) {
        return usuario = resultado[0];
    }
    return null;
}

async function validaSudoku(id) {
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT tabela FROM sudoku WHERE id = ?;", [id]);
    return resultado[0];
}

async function getNewSudoku() {
    const conexao = await conecta();
    const [rows] = await conexao.query('SELECT id, tabela FROM sudoku ORDER BY RAND() LIMIT 1');
    const { id, tabela } = rows[0];
    return [id, tabela];
}



module.exports = {
    criaTabelas,
    cadastraUsuario,
    buscarUsuario,
    criaTabelaSudoku,
    validaSudoku,
    getNewSudoku,
    insereSudoku,
    criaTabelaToken,
    cadastraTokenUser,
    buscarTokenUser
};
