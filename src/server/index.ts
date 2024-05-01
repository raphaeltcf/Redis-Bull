import dotenv from "dotenv";
dotenv.config();
import Queue from "../lib/Queue";

Queue.process();
console.log("Server up and running! na porta", process.env.REDIS_PORT);
