
import * as usersDao from "./users-dao.js";


const AuthController = (app) => {
    const register = async (req, res) => {
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(403);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        req.session['currentUser'] = newUser;
        res.json(newUser);
    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
                req.session['currentUser'] = user;
                console.log("Inside login" + req.session['currentUser']);
                res.json(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    };


    const profile = async (req, res) => {
        const cUser = req.session['currentUser'];
        console.log("Inside profile" + cUser);
        if (!cUser) {
            res.sendStatus(404);
            return;
        }
        res.json(cUser);
    };

    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };


    const update = async (req, res) => {
        const userId = req.params['uid'];
        const oldUser = await usersDao.findUserById(id);
        const status = await usersDao.updateUser(userId, req.body);
        const newUser = {...oldUser, ...req.body};
        console.log(newUser);

        req.session['currentUser'] = newUser;
        res.json(status);
    };


    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users/:uid", update);
};
export default AuthController;

