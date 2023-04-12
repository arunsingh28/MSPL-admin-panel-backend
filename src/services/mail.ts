import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtppro.zoho.in",
        secure: true,
        port: 465,
        auth: {
            user: 'info@sportylife.in',
            pass: 'PurpleCity@Think123$!?'
        }
    })
    // 535 Authentication Failed
    const mailOptions = {
        from: 'info@sportylife.in',
        to,
        subject,
        html
    }

    const cb = await transporter.sendMail(mailOptions)
    return cb
}

