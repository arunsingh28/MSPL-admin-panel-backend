import nodemailer from 'nodemailer'
import env from '../../config/env'
import resetPassword from '../../mail_templates/resetPassword'
import welcome from '../../mail_templates/welcome'


export const sendEmail = async (to: string,type:string,name: string,otp?:number, password?: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: env.MAIL_DOMAIN_ID,
                pass: env.MAIL_DOMAIN_PASS
            },
            tls: {
                ciphers: 'SSLv3'
            }
        })
        // reset password
        if(type === env.MAIL_RESET_PASSWORD){
            const info = await transporter.sendMail({
                from: env.MAIL_DOMAIN_ID,
                to: to,
                subject: 'Reset Password',
                html: resetPassword(name,otp!)
            }).then((info) => {
                return info.response
            })
            .catch((err) => {
                return err.message
            })
        }
        // welcome
        if(type === env.MAIL_WELCOME){
            const info = await transporter.sendMail({
                from: env.MAIL_DOMAIN_ID,
                to: to,
                subject: 'Welcome',
                html: welcome(name,password!)
            }).then((info) => {
                return info.response
            })
            .catch((err) => {
                return err.message
            })
        }
    } catch (err:any) {
        return err.message
    }
}