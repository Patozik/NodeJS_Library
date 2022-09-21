const express = require('express');
const bookController = require('../Controllers/bookController');
const { addBook, allDisplay, availableDisplay, deleteBook, editBook, hireBook, returnBook } = bookController;
const userAuth = require('../Middlewares/userAuth');

const router = express.Router();

//Wypisanie wszystkich książek
router.get('/all', allDisplay);

//Wypisanie dostepnych książek
router.get('/available', availableDisplay);

//Dodanie książki
router.post('/add', userAuth.onlyAdmin, addBook);

//Usunięcie książki
router.delete('/delete/:id', userAuth.onlyAdmin, deleteBook);

//Edycja książki
router.patch('/edit/:id', userAuth.onlyAdmin, editBook);

//Wypożyczenie
router.patch('/hire/:id', userAuth.onlyUser, hireBook);

//Zwrot
router.patch('/return/:id', userAuth.onlyUser, returnBook);

module.exports = router;