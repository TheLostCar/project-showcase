import type { NextApiRequest, NextApiResponse } from 'next'
import * as nodemailer from 'nodemailer'

type Data = {
    message: string
}

// Regex from https://github.com/manishsaraan/email-validator/blob/master/index.js
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'POST':
            // console.log(req)
            const transporter = nodemailer.createTransport({
                port: 465,
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_PASSWORD,
                },
                secure: true,
            });

            const { email, message } = req.body;
            if (typeof email !== 'string' || typeof message !== 'string') return res.status(400).json({ message: 'Bad Data' });
            if (emailRegex.test(email) === false) return res.status(400).json({ message: 'Please enter valid email' })



            const mailData = {
                from: process.env.NODEMAILER_EMAIL,
                to: process.env.TO_EMAIL,
                subject: `Message from ${email}`,
                text: message,
            };

            transporter.sendMail(mailData, function (err, info) {
                console.log(info)
                if (err) return res.status(400).json({ message: err.message });
                return res.status(200).json({ message: 'Message sent successfully' });
            })

            break;
    }
}
