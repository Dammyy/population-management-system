require("dotenv").config();
import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) =>
  res.send({ message: "Welcome to Population Management API!" })
);

routes(app);
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`app listening on port ${port}!`));
}

export default app;
