import { Request, Response } from "express";

interface PackageFile {
  name: string;
  description: string;
  version: string;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageFile: PackageFile = require("../../package.json");

const versions = (req: unknown, res: any) => {
  res.json([
    {
      version: 1,
      path: "/api/v1",
    },
  ]);
};

const ping = (req: Request, res: Response) => {
  const { name, description, version } = packageFile;
  const uptime = process.uptime();
  res.json({ name, description, version, uptime });
};

export { ping, versions };
