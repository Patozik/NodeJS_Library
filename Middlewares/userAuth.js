const express = require("express");
const db = require("../Models");

//Wczytanie użytkowników z bazy
const User = db.users;

//Funkcja sprawdzająca czy login jest już w bazie, login ma być unikalny

const saveUser = async (req, res, next) => {
    //sprawdzenie czy login istnieje w bazie
    try {
        const login = await User.findOne({
            where: {
                login: req.body.login,
            },
        });
        //jesli istnieje już to zwracamy status 409
        if (login) {
            return res.status(409).send("Login jest już użyty");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

const onlyAdmin = async (req, res, next) => {
    //sprawdzenie czy konto należy do administratora
    try {
        const login = await User.findOne({
            where: {
                login: req.body.login,
            },
        });
        
        if (login.admin === false) {
            return res.status(409).send("Wymagane jest konto administratora");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

const onlyUser = async (req, res, next) => {
    //sprawdzenie czy konto należy do zwykłego użytkownika
    try {
        const login = await User.findOne({
            where: {
                login: req.body.login,
            },
        });
        
        if (login.admin === true) {
            return res.status(409).send("Wymagane jest konto użytkownika");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    saveUser,
    onlyAdmin,
    onlyUser
};