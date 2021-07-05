import "reflect-metadata";
import express, { json, NextFunction, Request, Response } from "express";

import { createRoutes } from "./lib";
import { UserController } from "./user-controller";
import { DIController } from "./di-controller";
import { container } from "tsyringe";
import { IController } from "./lib/types";
import { injectToControllerRouter } from "./lib/di/handlers/inject-to-controller-router";

const app = express();

app.use(json());

app.use(
  createRoutes({
    controllers: [UserController],
  })
);

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.locals.container = container.createChildContainer();

  res.locals.container.register("meme", {
    useValue: {
      sasuke: "NarutoOOO",
      naruto: "SaaaskeE",
    },
  });

  next();
});

app.use(
  createRoutes({
    controllers: [DIController],
    addToControllerRouter: injectToControllerRouter((_req, res, value) =>
      res.locals.container.resolve(value)
    ),
    createController: (controller) =>
      container.resolve(controller as IController),
  })
);

app.listen(3000);
