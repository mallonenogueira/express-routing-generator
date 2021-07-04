import "reflect-metadata";
import express from "express";

import { createRoutes } from "./lib";
import { UserController } from "./user-controller";
import { JsonController } from "./json-controller";
import { jsonToControllerRouter } from "./lib/handlers/json-to-controller-router";

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

app.listen(3000);
