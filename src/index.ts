// Dilesh Tanna - 11/11/2020 Setting up Node-Express application

import express from "express";
// import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import { createConnection } from "./db-init/dbConn";
import cors from "cors";
import user from "./routes/user"

import logger, { httpLogger } from "./utils/logger";
import error from "./middlewares/error";
// In case of production environment, disable console logs
if (process.env.NODE_ENV === "production") {
  console.log = (msg: string) => {};
  console.info = (msg: string) => {};
  console.warn = (msg: string) => {};
  console.error = (msg: string) => {};
}
// Setting node thread pool size to 256 because the size of the DB pool is 256 plus 4 extra threads for V8
process.env.UV_THREADPOOL_SIZE = "260";

// Extending express name space to have a user property that is used by the authorize middleware
declare module "express" {
  interface Request {
    user?: any;
  }
}
//Create an instance of express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//defining a simple route
app.get('/', (req, res)=> {
    res.json({
        "message": "Welcome"
    });
});

app.set("trust-proxy", 1);

// Block all unwanted headers using helmet
// app.use(helmet());

// Disable x-powered-by header separately
app.disable("x-powered-by");

//Setup server
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.disable("etag"); //Disables caching
morgan.token("remote-addr", (req: any) => {
  return req.header("X-Real-IP") || req.ip;
});
app.use(
 morgan("common", { stream: { write: (message) => httpLogger.http(message) } })
);

 app.use("/api/user",user)
// app.use("/api/career",career)

app.use(error);

//Check if port exists in the environment else use 5000
const port = process.env.PORT || 5000;

//If the environment is test, do not start the express server
if (process.env.NODE_ENV !== "test") {
  createConnection();
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
  // app
  //   .listen(parseInt(port.toString()), "0.0.0.0", () => {
  //     //Listen the express server on the given port and log a message to the logs
  //     console.log(`Server is listening on port ${port}`);
  //   })
  //   .on("error", (err: any) => {
  //     //In case of an error, log the error to the logs
  //     console.log(JSON.stringify(err));
  //   });
}

export default app;
