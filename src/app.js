import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.set("port",3002);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

console.log("Message from app");

export default app;
