import { Request, Response, NextFunction } from "express";
import { Get, Route } from "./lib";

function middleTest(_req: Request, _res: Response, next: NextFunction) {
  console.log("middleTest :D");
  next();
}

@Route("/users", middleTest)
export class UserController {
  context: string;

  constructor() {
    this.context = "USER CONTROLLER CONTEXT";
  }

  @Get("/", middleTest)
  findOne(_req: Request, res: Response) {
    res.json({
      ok: this.context,
    });
  }
}
