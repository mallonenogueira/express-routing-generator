import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";

import { createRoutes } from "./lib";
import { UserController } from "./user-controller";
import { JsonController } from "./json-controller";
import { DIController } from "./di-controller";
import { jsonToControllerRouter } from "./lib/handlers/json-to-controller-router";
import { container } from "tsyringe";
import { IController } from "./lib/types";
import { injectToControllerRouter } from "./lib/handlers/inject-to-controller-router";

const app = express();

app.use(
  createRoutes({
    controllers: [UserController],
  })
);

app.use(
  createRoutes({
    controllers: [JsonController],
    addToControllerRouter: jsonToControllerRouter,
  })
);

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.locals.container = container.createChildContainer();

  next();
});

app.use(
  createRoutes({
    controllers: [DIController],
    addToControllerRouter: injectToControllerRouter,
    createController: (controller) =>
      container.resolve(controller as IController),
  })
);

app.listen(3000);
