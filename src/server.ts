import app from "./app";
import Logger from "./config/logger";

const port = parseInt(process.env.PORT || "3000");

const server = new app()
  .Start(port)
  .then((port) => Logger.info(`Server running on port ${port}`))
  .catch((error) => {
    Logger.error(error);
    process.exit(1);
  });

export default server;
