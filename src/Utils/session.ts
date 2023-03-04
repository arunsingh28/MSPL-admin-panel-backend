import session from 'express-session'
import { RegisterDocument } from '../Interface/emp.interface'
import { Express } from 'express'

declare module 'express-session' {
    interface SessionData {
        user: RegisterDocument
    }
}

export default function (app: Express) {
    app.use(session({
        name: 'connection_id',
        secret: 'connectionid',
        proxy: true,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 }
    }))

    app.set('trust proxy', 1)

}
