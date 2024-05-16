import express from "express";
import cookieParser from "cookie-parser";

import itemRouter from "./routes/item.route";

const app = express();

// Config Middleware for parsing JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());

app.use(cookieParser());

app.use('/items', itemRouter)
app.get("/", (req, res) => {
    res.send("Welcome to Redbiiddsun API! 🚀");
});

export default app;
