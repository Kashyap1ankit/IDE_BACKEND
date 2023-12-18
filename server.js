  import express from "express";
  import { config as dotenvConfig } from "dotenv";
  import { connectToMongo } from "./db.js";
  import cors from "cors";
  import runCode from "./Codes/jsCode.js";
  import compileAndRunCCode from "./Codes/cCode.js";
  import runPythonCode from "./Codes/pyCode.js";

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
  app.post("/run-c", async (req, res) => {
    const { code } = req.body;

    console.log("Received C code:", code); 

    try {
      const cResult = await compileAndRunCCode(code);

      console.log("C Code Result:", cResult);

      res.json({ success: true, cResult });
    } catch (error) {
      console.error("Error compiling and running C code:", error);
      res.status(500).json({ success: false, error: error.toString() });
    }
  });

  app.post("/run-python", async (req, res) => {
    const { code } = req.body;
  
    console.log("Received Python code:", code);
  
    try {
      const pythonResult = await runPythonCode(code);
  
      console.log("Python Code Result:", pythonResult);
  
      res.json({ success: true, pythonResult });
    } catch (error) {
      console.error("Error running Python code:", error);
  
      // Use error.message or JSON.stringify(error) for a more informative error response
      res.status(500).json({ success: false, error: error.message || JSON.stringify(error) });
    }
  });
  

  app.listen(port, () => {
    console.log(`IDE app listening on port http://localhost:${port}`);
  });
