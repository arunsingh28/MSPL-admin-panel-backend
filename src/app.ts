import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import userAgent from 'express-useragent'
import cors from 'cors'
import path from 'path'
import env from '../config/env'
import errorHandler from './Utils/errorHandler';
import logger from './Utils/logger';
import { connectDB } from './Utils/DB.connection'
import publicRouter from './Routers/Public.Router'
import privateRouter from './Routers/Private.Router'
import tutorialRouter from './Routers/Tutorial.Router'
import NutritionRouter from './Routers/Nutrition.Router';
import authorization from './middlewares/auth.middleware';
import corsOptions from '../config/cors.config';
import credentials from './Utils/credentials';
import swaggerUI from 'swagger-ui-express'
import swaggerDocs from '../docs/swagger';
import session from './Utils/session'
import compress from 'compression'
import mobileAuth from './middlewares/mobileAuth.middleware';
import mobileRouter from './Routers/mobile.Router';
import waterCronJob from './services/cronJob'

const app: Express = express();

// reset water intake to 0
waterCronJob.schedule

// error handler
errorHandler()

// database connection
connectDB()

// private data sharing
app.use(credentials)


// middlewares ------------------------------------------------------------
// body parser
app.use(express.json({ limit: '50MB' }))
app.use(express.static(path.join(__dirname + '/../client/')))
app.use(express.urlencoded({ extended: true, limit: '50MB' }))

// body json parser
app.use(bodyParser.json())
// cookie parser
app.use(cookieParser())
// user agent middleware
app.use(userAgent.express())

// cors
app.use(cors(corsOptions))

// file logger
app.use(logger.logger)

// terminal logger
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(env._NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`)
  res.on('finish', () => {
    logger.info(env._NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS_CODE - [${res.statusCode}]`)
  })
  next()
})

// api docs route
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// session
session(app)

// compression
app.use(compress({
  level: 6,
  threshold: 10 * 1000,
  filter: (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) {
      return false
    }
    return compress.filter(req, res)
  }
}))

// public router
app.use('/v1/api', publicRouter)
// priavte router with authorization middleware
app.use('/v2/api', authorization, privateRouter)
// tutorial router
app.use('/v2/lms', authorization, tutorialRouter)
// nutriotion router
app.use('/v2/nutrition', authorization, NutritionRouter)
// mobile apis
app.use('/v2/mobile', mobileAuth, mobileRouter)

app.use('/lesson/:id', (req: Request, res: Response) => {
  return res.render('index.html')
})

// wrong url or incorrect url
app.get('*', (req: Request, res: Response) => {
  return res.send(`<p style="font-family:monospace"><mark style="border-radius:4px;padding:5px 10px;margin-right:5px;">${req.protocol}://${req.rawHeaders[1]}${req.url} </mark> is not valid.</p>`)
})


// app listener
app.listen(env._port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${env._port}`);
});


// memory used
setInterval(() => {
  const { rss, heapTotal } = process.memoryUsage()
  const report = `${rss / 1000000} + 'MB',${heapTotal / 1000000} + 'MB'`
  logger.logEvents(report, 'Memory.csv')
  console.log('RSS(RAM consuption):', (rss / 1000000) + 'MB', 'heapTotal(Memory consume): ', (heapTotal / 1000000) + 'MB')
}, 100000)