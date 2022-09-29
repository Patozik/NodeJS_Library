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
router.post('/add', addBook);

//Usunięcie książki
router.delete('/delete/:id', deleteBook);

//Edycja książki
router.patch('/edit/:id', editBook);

//Wypożyczenie
router.patch('/hire/:id', userAuth.onlyUser, hireBook);

//Zwrot
router.patch('/return/:id', userAuth.onlyUser, returnBook);

module.exports = router;