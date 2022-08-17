import cors from "cors";
import * as express from "express";
import { v4 as Uuid } from "uuid";
import { Customer } from "./models";

class Router {
  constructor(server: express.Express) {
    const router = express.Router();

    const customers = new Map<string, Customer>();
    customers.set(Uuid(), { name: "Obi Wan", dob: new Date("2001-01-02"), isHired: false, ssn: "123-12-3123" });
    customers.set(Uuid(), { name: "Qui-Gon Jinn", dob: new Date("1985-11-05"), isHired: false, ssn: "298-29-8298" });

    router.get("/", (req: express.Request, res: express.Response) => {
      res.json({
        message: `Nothing to see here, [url]/customers instead.`,
      });
    });

    //get all customers
    router.get("/customers", cors(), (req: express.Request, res: express.Response) => {
      res.json({ customers: [...customers.values()] });
    });

    //create new customer
    router.post("/customers", cors(), (req: express.Request, res: express.Response) => {
      try {
        const customer: Customer = { ...req.body };
        const uuid = Uuid();

        customers.set(uuid, customer);
        res.json({ uuid });
      } catch (e) {
        res.status(400).send(JSON.stringify({ error: "problem with posted data" }));
      }
    });

    //get customer by id
    router.get("/customers/:id", cors(), (req: express.Request, res: express.Response) => {
      if (customers.has(req.params.id)) {
        res.json({ customer: customers.get(req.params.id) });
      } else {
        res.status(404).send(JSON.stringify({ error: "no such customer" }));
      }
    });

    //update customer
    router.put("/customers/:id", cors(), (req: express.Request, res: express.Response) => {
      try {
        const uuid = req.params.id;

        if (customers.has(uuid)) {
          const customer: Customer = { ...req.body };
          customers.set(uuid, customer);
          res.json({ customer: customers.get(uuid) });
        } else {
          res.status(404).send(JSON.stringify({ error: "no such customer" }));
        }
      } catch (e) {
        res.status(400).send(JSON.stringify({ error: "problem with posted data" }));
      }
    });

    //delete customer
    router.delete("/customers/:id", cors(), (req: express.Request, res: express.Response) => {
      const uuid = req.params.id;
      if (customers.has(uuid)) {
        customers.delete(uuid);
        res.json({ uuid });
      } else {
        res.status(404).send(JSON.stringify({ error: "no such customer" }));
      }
    });

    // router.options("*", cors());

    server.use((req, resp, next) => {
      next();
    }, cors({ maxAge: 84600 }));

    server.use("/", router);
  }
}

export default Router;
