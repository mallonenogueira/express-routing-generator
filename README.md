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

app.use(createRoutes([UserController]));
```
