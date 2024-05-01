import express, { Application } from "express";
import dotenv from "dotenv";
import userController from "./controller/user.controller";
//@ts-ignore
import BullBoard from "bull-board";
import Queue from "./lib/Queue";
import connection from "./instance/sequelize";

dotenv.config();

const app: Application = express();
BullBoard.setQueues(Queue.queues.map((q) => q.bull));
const port = process.env.PORT || 3333;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/users", userController.createUser);
app.use("/admin", BullBoard.UI);

async function start() {
  try {
    await connection.sync();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
