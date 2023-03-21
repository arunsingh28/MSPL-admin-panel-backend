"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_useragent_1 = __importDefault(require("express-useragent"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const env_1 = __importDefault(require("../config/env"));
const errorHandler_1 = __importDefault(require("./Utils/errorHandler"));
const logger_1 = __importDefault(require("./Utils/logger"));
const DB_connection_1 = require("./Utils/DB.connection");
const Public_Router_1 = __importDefault(require("./Routers/Public.Router"));
const Private_Router_1 = __importDefault(require("./Routers/Private.Router"));
const Tutorial_Router_1 = __importDefault(require("./Routers/Tutorial.Router"));
const Nutrition_Router_1 = __importDefault(require("./Routers/Nutrition.Router"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
const cors_config_1 = __importDefault(require("../config/cors.config"));
const credentials_1 = __importDefault(require("./Utils/credentials"));
const session_1 = __importDefault(require("./Utils/session"));
const app = (0, express_1.default)();
// error handler
(0, errorHandler_1.default)();
// database connection
(0, DB_connection_1.connectDB)();
// private data sharing
app.use(credentials_1.default);
// middlewares ------------------------------------------------------------
// body parser
app.use(express_1.default.json({ limit: '50MB' }));
app.use(express_1.default.static(path_1.default.join(__dirname + '/../client/')));
// body json parser
app.use(body_parser_1.default.json());
// cookie parser
app.use((0, cookie_parser_1.default)());
// user agent middleware
app.use(express_useragent_1.default.express());
// cors
app.use((0, cors_1.default)(cors_config_1.default));
// file logger
app.use(logger_1.default.logger);
// terminal logger
app.use((req, res, next) => {
    logger_1.default.info(env_1.default._NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logger_1.default.info(env_1.default._NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS_CODE - [${req.statusCode}]`);
    });
    next();
});
// api docs route
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
// session
(0, session_1.default)(app);
// public router
app.use('/v1/api', Public_Router_1.default);
// priavte router with authorization middleware
app.use('/v2/api/', auth_middleware_1.default, Private_Router_1.default);
// tutorial router
app.use('/v2/tutorial', auth_middleware_1.default, Tutorial_Router_1.default);
// nutriotion router
app.use('/v2/nutrition', auth_middleware_1.default, Nutrition_Router_1.default);
// wrong url or incorrect url
app.get('*', (req, res) => {
    return res.send(`<p style="font-family:monospace"><mark style="border-radius:4px;padding:5px 10px;margin-right:5px;">${req.protocol}://${req.rawHeaders[1]}${req.url} </mark> is not valid.</p>`);
});
// app listener
app.listen(env_1.default._port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${env_1.default._port}`);
});
// memory used
setInterval(() => {
    const { rss, heapTotal } = process.memoryUsage();
    const report = `${rss / 1000000} + 'MB',${heapTotal / 1000000} + 'MB'`;
    logger_1.default.logEvents(report, 'Memory.csv');
    console.log('RSS(RAM consuption):', (rss / 1000000) + 'MB', 'heapTotal(Memory consume): ', (heapTotal / 1000000) + 'MB');
}, 100000);
