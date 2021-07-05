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
  findAll(
    @inject("Response") res: Response,
    @inject(Service) service: Service
  ) {
    res.json(service.getData());
  }

  @Get("/:id")
  findOne(@Res res: Response, @Param("id") id: string) {
    res.json({
      id,
    });
  }

  @Post("/")
  save(@Res res: Response, @Body body: any) {
    res.json(body);
  }
}
