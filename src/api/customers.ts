import { Request, Response } from "express";
import { Client } from "pg";
import format from "pg-format";
import { v4 as Uuid } from "uuid";
import Logger from "../config/logger";
import { pgConn } from "../config/postgres";
import { Customer } from "../models";

class CustomerApi {
  private TABLE = "customers";

  private createClient = (res: Response): Client | undefined => {
    try {
      const client = pgConn.getClient();
      client.connect();
      return client;
    } catch (e) {
      Logger.error(e);
      res.status(400).send(JSON.stringify({ error: "failed getting client" }));
    }
  };
  private getId = (req: Request) => req.params.id;
  private getCustomerFromBody = (req: Request, res: Response): Customer | null => {
    try {
      const customer: Customer = { ...req.body };
      return customer;
    } catch (e) {
      Logger.error(e);
      res.status(400).send(JSON.stringify({ error: "problem with posted data" }));
    }

    return null;
  };

  fetchAll = async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const client = this.createClient(res)!;

    try {
      const ret = await client.query(`SELECT * from ${this.TABLE}`);
      const customers = ret.rows;
      res.json(customers);
      client.end();
    } catch (e) {
      Logger.error(e);
    }
  };

  fetchOne = async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const client = this.createClient(res)!;

    const uuid = this.getId(req);

    try {
      const q = format("SELECT * FROM %I WHERE id = %L", this.TABLE, uuid);
      const ret = await client.query(q);
      res.json(ret.rows[0]);
      client.end();
    } catch (e) {
      Logger.error(e);
      res.status(404).send(JSON.stringify({ error: "no such customer" }));
    }
  };

  createOne = async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const client = this.createClient(res)!;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const customer = this.getCustomerFromBody(req, res)!;
    const uuid = Uuid();

    // TODO: Verify parameters

    const { name, dob, ssn } = customer;

    try {
      const q = format("INSERT INTO %I (name, dob, ssn) VALUES('%s', '%s', '%s')", this.TABLE, name, new Date(dob).toUTCString(), ssn);
      const ret = await client.query(q);
      Logger.debug({ uuid, ret });

      res.json(uuid);
      client.end();
    } catch (e) {
      Logger.error(e);
    }
  };

  updateOne = async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const client = this.createClient(res)!;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const customer = this.getCustomerFromBody(req, res)!;
    const uuid = this.getId(req);

    // TODO: Verify parameters

    const { name, dob, ssn } = customer;

    try {
      const q = format(
        "UPDATE %I SET name = %L, dob = %L, ssn = %L WHERE ID = %L",
        this.TABLE,
        name,
        new Date(dob).toUTCString(),
        ssn,
        uuid
      );

      Logger.debug({ uuid, q });

      const ret = await client.query(q);
      Logger.debug({ uuid, ret });

      res.json(uuid);
      client.end();
    } catch (e) {
      Logger.error(e);
      res.status(404).send(JSON.stringify({ error: "no such customer" }));
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const client = this.createClient(res)!;
    const uuid = this.getId(req);

    try {
      const q = format("DELETE FROM %I WHERE id IN (%L)", this.TABLE, uuid);
      const ret = await client.query(q);
      const rowCount = ret.rowCount;

      res.json({ uuid, rowCount });
      client.end();
    } catch (e) {
      Logger.error(e);
      res.status(404).send(JSON.stringify({ error: "no such customer" }));
    }
  };
}

export const customerApi = new CustomerApi();
