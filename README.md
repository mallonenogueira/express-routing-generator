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
import { Get, inject, Route, Res } from "./lib";

class Service {
  getData() {
    return [{ name: "dependencyInjection" }];
  }
}

@Route("/di")
export class DIController {
  @Get("/")
  findOne(
    @Res res: Response,
    service: Service
  ) {
    res.json(service.getData());
  }
}

```

```ts
// server.ts

import { DIController } from "./di-controller";
import { container } from "tsyringe";
import { createRoutes, injectToControllerRouter } from "./lib";

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.locals.container = container.createChildContainer();

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

```

