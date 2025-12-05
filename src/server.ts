import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
const app = express();
const port = config.port;

//parser
app.use(express.json());

// datbase call
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("vehicle server is running");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
