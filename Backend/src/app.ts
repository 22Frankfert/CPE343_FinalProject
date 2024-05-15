import express from "express";
import cookieParser from "cookie-parser";


// Route Import


export const app = express();

// Config Middleware for parsing JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());

app.use(cookieParser());


// app.use("/api/status", apiStatus);
// app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Redbiiddsun API! 🚀");
});

export default app;
