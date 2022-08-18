import cors from "cors";
import * as express from "express";

import { apiVersion, customerApi, getVersions, ping } from "./api";

const API_BASE = apiVersion.path;

class Router {
  constructor(server: express.Express) {
    const router = express.Router();

    router.get("/", getVersions);
    router.get("/ping", ping);

    //  TODO: move defs to separate file

    //get all customers
    router.get(`${API_BASE}/customers`, cors(), customerApi.fetchAll);

    //create new customer
    router.post(`${API_BASE}/customers`, cors(), customerApi.createOne);

    //get customer by id
    router.get(`${API_BASE}/customers/:id`, cors(), customerApi.fetchOne);

    //update customer
    router.put(`${API_BASE}/customers/:id`, cors(), customerApi.updateOne);

    //delete customer
    router.delete(`${API_BASE}/customers/:id`, cors(), customerApi.deleteOne);

    server.use((req, resp, next) => {
      next();
    }, cors({ maxAge: 84600 }));

    server.use("/", router);
  }
}

export default Router;
