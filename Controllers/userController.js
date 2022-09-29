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

const generateAdminAccounts = async (req, res) => {
    try {
        const generateNumber =  () => {
            return Math.floor(Math.random() * 8999) + 1000;
        }

        const generatePassword = () => {
            return 'Tajne' + generateNumber();
        }

        const generateData = async () => {
            const password = generatePassword();

            const passwordHash = await bcrypt.hash(password, 10);

            const data = {
                name: 'Name' + generateNumber(),
                login: 'Admin' + generateNumber(),
                password: passwordHash,
                admin: true,
                passwordString: password
            };
            console.log(data);
            return data;
        }

        const admin1 = await generateData();
        const admin2 = await generateData();

        const user1 = await User.create(admin1);
        const user2 = await User.create(admin2);

        if (user1 && user2) {
            return res.status(201).send(`Zarejestrowany administrator pierwszy: login: ${admin1.login}, hasło: ${admin1.passwordString}, administrator drugi : login: ${admin2.login}, hasło: ${admin2.passwordString}`);
        } else {
            return res.status(409).send("Wystąpił błąd");
        }
    } catch (error) {
        console.log(error);
    }
};

//Logowanie

const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        console.log(login);
        console.log(password);

        //Odnalezienie użytkownika w bazie
        const user = await User.findOne({ where: { login: login }});

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
                
                return res.status(201).send(user);
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
    generateAdminAccounts,
    login
};