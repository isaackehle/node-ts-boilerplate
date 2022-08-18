import cors from "cors";
import * as express from "express";

import { customerApi, ping, versions } from "./api";

class Router {
  constructor(server: express.Express) {
    const router = express.Router();

    router.get("/", versions);
    router.get("/ping", ping);

    //get all customers
    router.get("/customers", cors(), customerApi.fetchAll);

    //create new customer
    router.post("/customers", cors(), customerApi.createOne);

    //get customer by id
    router.get("/customers/:id", cors(), customerApi.getOne);

    //update customer
    router.put("/customers/:id", cors(), customerApi.updateOne);

    //delete customer
    router.delete("/customers/:id", cors(), customerApi.deleteOne);

    server.use((req, resp, next) => {
      next();
    }, cors({ maxAge: 84600 }));

    server.use("/", router);
  }
}

export default Router;
