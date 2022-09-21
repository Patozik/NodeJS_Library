const express = require('express');
const userController = require('../Controllers/userController');
const { signupAdmin, signupUser, login } = userController;
const userAuth = require('../Middlewares/userAuth');

const router = express.Router();

//Rejestracja użytkownika
router.post('/signup/user', userAuth.saveUser, signupUser);

//Rejestracja admina
router.post('/signup/admin', userAuth.saveUser, signupAdmin);

//Logowanie
router.post('/login', login);


module.exports = router;