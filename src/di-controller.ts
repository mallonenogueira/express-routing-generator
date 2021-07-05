import { Response } from "express";
import { injectable } from "tsyringe";
import { Get, inject, Route, Res, Param, Body, Post } from "./lib";

@injectable()
class Service {
  getData() {
    return [{ name: "dependencyInjection" }];
  }
}

@Route("/di")
@injectable()
export class DIController {
  @Get("/")
  findAll(@Res res: Response, @inject(Service) service: Service) {
    res.json(service.getData());
  }

  @Post("/:id")
  save(@Res res: Response, @Param("id") id: string, @Body body: any) {
    res.json({
      id,
      body,
    });
  }
}
