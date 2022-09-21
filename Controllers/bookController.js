const db = require("../Models");

const Book = db.books;

const addBook = async (req, res) => {
    try {
        const { name, ISBN, autor } = req.body;
        const data = {
            name,
            ISBN,
            autor
        };

        const book = await Book.create(data);

        if (book) {
            return res.status(201).send(`Dodana książka: ${book.name}`);
        } else {
            return res.status(409).send("Wystąpił błąd");
        }
    } catch (error) {
        console.log(error);
    }
};

const editBook = async (req, res) => {
    try {
        const { name, ISBN, autor } = req.body;
        
        const { id } = req.params;
        const book = await Book.findOne({ where: { id: id } });

        if (book) {
            await book.update({ 
                name: name,
                ISBN: ISBN,
                autor: autor
             })
             await book.save();
            return res.status(201).send(`Zedytowano książke: ${book.name}`);
        } else {
            return res.status(409).send("Wystąpił błąd");
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findOne({ where: { id: id } });

        if (book) {
            await Book.destroy({ where: { id: id } });
            return res.status(201).send(`Usunięto książke: ${book.name}`);
        } else {
            return res.status(409).send("Wystąpił błąd");
        }
    } catch (error) {
        console.log(error);
    }
};

const allDisplay = async (req, res) => {
    try {
        
        const book = await Book.findAll();

        if (Book) {
            return res.status(201).send(book);
        } else {
            return res.status(409).send("Wystąpił błąd");
        }
    } catch (error) {
        console.log(error);
    }
};

const availableDisplay = async (req, res) => {
    try {

        const book = await Book.findAll({ where: { hire: false } });

        if (Book) {
            return res.status(201).send(book);
        } else {
            return res.status(409).send("Wystąpił błąd");
        }
    } catch (error) {
        console.log(error);
    }
};

const hireBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findOne({ where: { id: id } });

        if (book.hire !== true) {
            await book.update({
                hire: true,
            })
            await book.save();
            return res.status(201).send(`Wypożyczono książke : ${book.name}`);
        } else {
            return res.status(409).send("Ksiązka została wypożyczona");
        }
    } catch (error) {
        console.log(error);
    }
};

const returnBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findOne({ where: { id: id } });

        if (book.hire !== false) {
            await book.update({
                hire: false,
            })
            await book.save();
            return res.status(201).send(`Zwrócono książke : ${book.name}`);
        } else {
            return res.status(409).send("Ksiązka została już zwrócona");
        }
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    addBook,
    allDisplay,
    availableDisplay,
    editBook,
    deleteBook,
    hireBook,
    returnBook
};