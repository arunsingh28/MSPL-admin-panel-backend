import { NextFunction, Response, Request } from "express"
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import path from 'path'

const getTimeStamp = (): string => {
    return new Date().toISOString()
}

// file logger message
const logEvents = async (message: string | undefined, fileName: string) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
    const logMessage = `${dateTime}, ${uuid()}, ${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '../../logs'))) {
            fs.mkdirSync(path.join(__dirname, '../../logs'))
            const heading = `Date,Id,Message\n`;
            fs.writeFileSync(path.join(__dirname, '../../logs', fileName), heading)
        }
        else fs.appendFile(path.join(__dirname, '../../logs', fileName), logMessage, (err) => {
            if (err) throw err
        })
    } catch (error: any) {
        console.log('\n:::::::File Error:::::::::\n', error.message, '\n\n')
    }
}

// file logger
const logger = (req: Request, res: Response, next: NextFunction) => {
    logEvents(`${req.method} ${req.path}`, 'reqLog.csv')
    next()
}

// terminal logger
const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object)
    } else {
        console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`)
    }
}

export default { logEvents, logger, info }