import * as bodyParser from "body-parser";
import express from "express";
import swaggerUi from "swagger-ui-express";
import Router from "./router";
import * as swaggerDocument from "./swagger.json";

class App {
  private httpServer: express.Express;

  constructor() {
    this.httpServer = express();

    this.httpServer.use(bodyParser.urlencoded({ extended: true }));
    this.httpServer.use(bodyParser.json());

    new Router(this.httpServer);

    this.httpServer.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  public Start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.httpServer
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: object) => reject(err));
    });
  };
}

export default App;
