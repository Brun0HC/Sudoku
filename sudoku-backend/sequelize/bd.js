const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "usuariodb",
    "root",
    "ifsp",
    {
        host: "localhost",
        port: 3306,
        dialect: "mysql"
    }
)

module.exports = sequelize;