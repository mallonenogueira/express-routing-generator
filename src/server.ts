import "reflect-metadata";
import express from "express";
import { createRoutes } from "./lib";
import { UserController } from "./user-controller";

const app = express();

app.use(createRoutes([UserController]));

app.listen(3000);
