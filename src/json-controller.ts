import { Get, Route } from "./lib";

@Route("/json")
export class JsonController {
  @Get("/")
  findOne() {
    return {
      status: "ok",
    };
  }
}
