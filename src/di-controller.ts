import { Response } from "express";
import { injectable } from "tsyringe";
import { Get, inject, Route } from "./lib";

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
  findOne(
    @inject("Response") res: Response,
    @inject(Service) service: Service
  ) {
    res.json(service.getData());
  }
}
