const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

const User = db.users;

const signupAdmin = (req , res) => {
    signup(req, res, type=true);
}

const signupUser = (req , res) => {
    signup(req, res, type=false);
}

//Rejestracja użytkownika

const signup = async (req, res) => {
    try {
        const { name, login, password } = req.body;
        const data = {
            name,
            login,
            password: await bcrypt.hash(password, 10),
            admin: type
        };
        
        const user = await User.create(data);

        //Utworzenie tokenu i ustawienie go w ciasteczku

        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            
            return res.status(201).send(`Zarejestrowany użytkownik: ${user.login}`);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


//Logowanie

const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        //Odnalezienie użytkownika w bazie
        const user = await User.findOne({ login });

        //Sprawdzenie hasła
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            //Wygenerowanie ciasteczka

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                
                return res.status(201).send(`Zalogowany użytkownik: ${user.login}`);
            } else {
                return res.status(401).send("Logowanie nie przebiegło pomyślnie");
            }
        } else {
            return res.status(401).send("Błędny login lub hasło");
        }
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    signupAdmin,
    signupUser,
    login
};