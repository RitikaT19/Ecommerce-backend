"use strict";
// Dilesh Tanna - 11/11/2020 Setting up Node-Express application
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import helmet from "helmet";
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbConn_1 = require("./db-init/dbConn");
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const logger_1 = require("./utils/logger");
const error_1 = __importDefault(require("./middlewares/error"));
// In case of production environment, disable console logs
if (process.env.NODE_ENV === "production") {
    console.log = (msg) => { };
    console.info = (msg) => { };
    console.warn = (msg) => { };
    console.error = (msg) => { };
}
// Setting node thread pool size to 256 because the size of the DB pool is 256 plus 4 extra threads for V8
process.env.UV_THREADPOOL_SIZE = "260";
//Create an instance of express
const app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//defining a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome"
    });
});
app.set("trust-proxy", 1);
// Disable x-powered-by header separately
app.disable("x-powered-by");
//Setup server
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false,
}));
app.disable("etag"); //Disables caching
morgan_1.default.token("remote-addr", (req) => {
    return req.header("X-Real-IP") || req.ip;
});
app.use(morgan_1.default("common", { stream: { write: (message) => logger_1.httpLogger.http(message) } }));
app.use("/api/auth", auth_1.default);
// app.use("/api/career",career)
app.use(error_1.default);
//Check if port exists in the environment else use 5000
const port = process.env.PORT || 5000;
//If the environment is test, do not start the express server
if (process.env.NODE_ENV !== "test") {
    dbConn_1.createConnection();
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map