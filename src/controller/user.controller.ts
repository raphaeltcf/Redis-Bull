import { Request, Response } from "express";
import Queue from "../lib/Queue";

export default {
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = { name, email, password };
    await Queue.add("sendMail", { user });
    return res.json(user);
  },
};
