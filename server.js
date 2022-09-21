//importing modules
const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./Models')
const userRoutes = require('./Routes/userRoutes')
const bookRoutes = require('./Routes/bookRoutes')



//ustawienie portu
const PORT = process.env.PORT || 3000;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

db.sequelize.sync({ force: false }).then(() => {
    console.log("Połączenie z bazą danych");
});

//Routing dla users
app.use('/api/users', userRoutes);

//Routing dla books
app.use('/api/books', bookRoutes);

//Nasłuchiwanie serwera
app.listen(PORT, () => console.log(`Serwer uruchomiony na porcie ${PORT}`));