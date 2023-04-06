import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        secure: true,
        port: 465,
        auth: {
            user: 'mail',
            pass: 'eeaz1EubA1FK'
        }
    })
    // 535 Authentication Failed
    const mailOptions = {
        from: 'dev@sportylife.in',
        to,
        subject: 'Reset Password',
        html
    }

   const cb = await transporter.sendMail(mailOptions)
   return cb
}

