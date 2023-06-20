import express from 'express';
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from 'cors';
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";
// mongoose.connect("mongodb://127.0.0.1:27017/tuiter");
mongoose.connect("mongodb+srv://jiaomeizhou:z6BiQAGzAsIrSo1l@cluster0.1lhqt4c.mongodb.net/?retryWrites=true&w=majority");

const app = express();

// app.use(
//     session({
//         secret: "any string",
//         resave: false,
//         saveUninitialized: true,
//     })
// );
//
// app.use(express.json());
// app.use(cors({
//         credentials: true,
//         origin: "http://localhost:3000",
//     })
// );

app.set("trust proxy", 1);
app.use(
    cors({
        credentials: true,
        origin: "https://a6--tuiter-react-web-app-jiaomei.netlify.app/",
        // origin: "http://localhost:3000",
    })
);
app.use(
    session({
        secret: "any string",
        resave: false,
        proxy: true,
        saveUninitialized: false,
        cookie: {
            sameSite: "none",
            secure: true,
        },
    })
);

app.use(express.json());

TuitsController(app);
HelloController(app)
UserController(app)
AuthController(app);

app.listen(process.env.PORT || 4000);
// const port = process.env.PORT || 4000;