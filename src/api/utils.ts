import { Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-var-requires
import serverInfo from "../../package.json";

interface APIVersion {
  version: number;
  path: string;
}
interface ServerInfo {
  name: string;
  description: string;
  version: string;
}

const apiVersion: APIVersion = {
  version: 1,
  path: "/api/v1",
};

const versions: APIVersion[] = [apiVersion];

const getVersions = (req: Request, res: Response) => {
  res.json(versions);
};

const ping = (req: Request, res: Response) => {
  const { name, description, version }: ServerInfo = serverInfo;

  const uptime = process.uptime();
  res.json({ name, description, version, uptime });
};

export { ping, apiVersion, getVersions };
