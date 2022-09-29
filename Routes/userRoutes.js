const express = require('express');
const userController = require('../Controllers/userController');
const { signupAdmin, signupUser, generateAdminAccounts, login } = userController;
const userAuth = require('../Middlewares/userAuth');

const router = express.Router();

//Rejestracja użytkownika
router.post('/signup/user', userAuth.saveUser, signupUser);

//Rejestracja admina
router.post('/signup/admin', userAuth.saveUser, signupAdmin);

//Generowanie dwóch kont administratora
router.post('/generate_accounts', generateAdminAccounts);

//Logowanie
router.post('/login', login);


module.exports = router;