const banco = require("./bd.js");
const Sequelize = require("sequelize");


const Token = require("./token.js");
const Sudoku = require("./sudoku.js");
// const Disciplina = require("./disciplina.js");

const Usuario = banco.define("usuario",
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
    },
    email: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
    },
    senha: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
    },
}
)

// Usuario.belongsTo(Turma,{
//     constraint: true,
//     foreignKey: "idTurma"
// });
// Token.belongsTo(Usuario, {
//     foreignKey: "token"
// });

// Usuario.hasMany(Sudoku, {
//     foreignKey: "idUsuario"
// });

// Aluno.belongsToMany(Disciplina, {through: "ensalamento"});

// Disciplina.belongsToMany(Aluno, {through: "ensalamento"})

module.exports = Usuario;