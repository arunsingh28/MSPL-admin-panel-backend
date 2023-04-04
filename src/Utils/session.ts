import session from 'express-session'
import { EmpDocument } from '../Interface/emp.interface'
import { Express } from 'express'


interface IToken {
    id: string;
    iat: number;
    exp: number;
}


declare module 'express-session' {
    interface SessionData {
        user: EmpDocument
        decoded: IToken
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
