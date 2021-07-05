import "reflect-metadata";
import express, { json, NextFunction, Request, Response } from "express";

import { UserController } from "./user-controller";
import { DIController } from "./di-controller";
import { container } from "tsyringe";
import { createRoutes, injectToControllerRouter } from "./lib";

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
    addToControllerRouter: injectToControllerRouter((_req, res, value) => {
      return res.locals.container.resolve(value);
    }),
    resolveController: (controller) => {
      return container.resolve(controller as { new (): any });
    },
  })
);

app.listen(3000);
