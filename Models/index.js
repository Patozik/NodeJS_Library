require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

//Połączenie z bazą
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: "postgres" });

//Sprawdzenie połączenia
sequelize.authenticate().then(() => {
    console.log(`Baza danych gotowa`);
}).catch((err) => {
    console.log(err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Połączenie z modelem
db.users = require('./userModel')(sequelize, DataTypes);
db.books = require('./bookModel')(sequelize, DataTypes);

module.exports = db;