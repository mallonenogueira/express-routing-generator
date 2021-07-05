# express-routing-generator

POC to create express routes with generators


```ts
//user-controller.ts

import { Request, Response, NextFunction } from "express";
import { Get, Route } from "./lib";

@Route("/users", middleware)
export class UserController {

  @Get("/", middleware)
  findOne(_req: Request, res: Response) {
    res.json({});
  }
  
}
```

```ts
//server.ts

import { createRoutes } from "./lib";
import { UserController } from "./user-controller";

app.use(createRoutes({ controllers: [UserController] }));
```

### With dependency injection [tsyringe](https://github.com/microsoft/tsyringe)

example using dependency injection and decorator routes

```ts
//di-controller.ts

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

```

```ts
// server.ts

import { createRoutes } from "./lib";
import { DIController } from "./di-controller";
import { container } from "tsyringe";
import { IController } from "./lib/types";
import { injectToControllerRouter } from "./lib/handlers/inject-to-controller-router";

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.locals.container = container.createChildContainer();

  next();
});

app.use(
  createRoutes({
    controllers: [DIController],
    addToControllerRouter: injectToControllerRouter((_req, res, value) => res.locals.container.resolve(value)),
    createController: (controller) =>
      container.resolve(controller as IController),
  })
);

```

