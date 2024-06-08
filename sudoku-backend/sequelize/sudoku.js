const banco = require("./bd.js");
const Sequelize = require("sequelize");


const Sudoku = banco.define("sudoku",
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    resposta: {
        type: Sequelize.JSON,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
    }
}
)

module.exports = Sudoku;
