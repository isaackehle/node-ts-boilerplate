import { Request, Response } from "express";
import { v4 as Uuid } from "uuid";
import { Customer } from "../models";

class CustomerApi {
  customers = new Map<string, Customer>();

  constructor() {
    this.customers.set(Uuid(), { name: "Obi Wan", dob: new Date("2001-01-02"), isHired: false, ssn: "123-12-3123" });
    this.customers.set(Uuid(), { name: "Qui-Gon Jinn", dob: new Date("1985-11-05"), isHired: false, ssn: "298-29-8298" });
  }

  fetchAll = (req: Request, res: Response) => {
    res.json({ tmp: [], customers: [...this.customers.values()] });
  };

  createOne = (req: Request, res: Response) => {
    try {
      const customer: Customer = { ...req.body };
      const uuid = Uuid();

      this.customers.set(uuid, customer);
      res.json({ uuid });
    } catch (e) {
      res.status(400).send(JSON.stringify({ error: "problem with posted data" }));
    }
  };

  getOne = (req: Request, res: Response) => {
    if (this.customers.has(req.params.id)) {
      res.json({ customer: this.customers.get(req.params.id) });
    } else {
      res.status(404).send(JSON.stringify({ error: "no such customer" }));
    }
  };

  updateOne = (req: Request, res: Response) => {
    try {
      const uuid = req.params.id;

      if (this.customers.has(uuid)) {
        const customer: Customer = { ...req.body };
        this.customers.set(uuid, customer);
        res.json({ customer: this.customers.get(uuid) });
      } else {
        res.status(404).send(JSON.stringify({ error: "no such customer" }));
      }
    } catch (e) {
      res.status(400).send(JSON.stringify({ error: "problem with posted data" }));
    }
  };

  deleteOne = (req: Request, res: Response) => {
    const uuid = req.params.id;
    if (this.customers.has(uuid)) {
      this.customers.delete(uuid);
      res.json({ uuid });
    } else {
      res.status(404).send(JSON.stringify({ error: "no such customer" }));
    }
  };
}

export const customerApi = new CustomerApi();
