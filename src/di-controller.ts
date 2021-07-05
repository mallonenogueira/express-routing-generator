import { Response } from "express";
import { Get, Route, Res, Param, Body, Post, inject } from "./lib";

class Service {
  getData() {
    return [{ name: "dependencyInjection" }];
  }
}

@Route("/di")
export class DIController {
  @Get("/")
  findAll(@Res res: Response, service: Service) {
    res.json(service.getData());
  }

  @Get("/test-inject-string")
  inject(@Res res: Response, @inject("meme") user: any) {
    res.json(user);
  }

  @Post("/:id")
  save(@Res res: Response, @Param("id") id: string, @Body body: any) {
    res.json({
      id,
      body,
    });
  }
}
