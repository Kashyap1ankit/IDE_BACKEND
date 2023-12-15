import express from "express";
import { config as dotenvConfig } from "dotenv";
import { connectToMongo } from "./db.js";
const app = express();
import cors from "cors";
import { NodeVM }  from "vm2";
dotenvConfig();
// conncted to db
const db = connectToMongo();

const port = 6969;
app.use(express.json());
app.use(
  cors({
    // origin: [process.env.CLIENT_URL_1, process.env.CLIENT_URL_2],
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "UPDATE", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);


//testing
app.get("/", (req, res) => {
  res.json({ massage: "Welcome to the IDE Project Api Server!!" });
});


app.get("/run", (req, res) => {});
const vm = new NodeVM({
  console: "redirect",
  sandbox: {},
  require: {
    external: true,
  },
});

const code = `console.log("hi")`;

vm.run(code);
app.listen(port, () => {
  console.log(`IDE app listening on port http://localhost:${port}`);
});