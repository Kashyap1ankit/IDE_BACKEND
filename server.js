import express from "express";
import { config as dotenvConfig } from "dotenv";
import { connectToMongo } from "./db.js";
import cors from "cors";
import runCode from "./Code/code.js";

dotenvConfig();

// Connected to the database
const db = connectToMongo();
const app = express();
const port = 6969;

app.use(express.json());

app.use(
  cors({
    origin: "*", // Allow all origins during development
    methods: ["GET", "POST", "UPDATE", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

// Testing endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the IDE Project API Server!" });
});

// Endpoint for running code
app.post("/run", async (req, res) => {
  const { code } = req.body;

  console.log("Received code:", code); // Log the received code

  try {
    const { result, consoleOutput } = await runCode(code);

    console.log("Code result:", result);
    console.log("Console Output:", consoleOutput);

    res.json({ success: true, result, consoleOutput });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.toString() });
  } 
});

app.listen(port, () => {
  console.log(`IDE app listening on port http://localhost:${port}`);
});
