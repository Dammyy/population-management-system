require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => res.send({ message: "Welcome to Population Management API!" }));

app.listen(port, () => console.log(`app listening on port ${port}!`));
