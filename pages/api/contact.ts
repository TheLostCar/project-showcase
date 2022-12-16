import type { NextApiRequest, NextApiResponse } from 'next'
// import * as nodemailer from 'nodemailer';

export const config = {
    runtime: 'experimental-edge',
}


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
            const { email, message } = req.body;

            return new Request('https://api.mailchannels.net/tx/v1/send', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    personalizations: [
                        {
                            to: [{ email: process.env.TO_EMAIL, name: 'Test Randy' }],
                        },
                    ],
                    from: {
                        email: 'sendertime@carl@go.quick',
                        name: 'Workers from the inside',
                    },
                    subject: `Message from ${email}`,
                    content: [
                        {
                            type: 'text/plain',
                            value: { message },
                        },
                    ],
                }),
            })
            // console.log(req)
            return new Response(JSON.stringify({ message: 'Bad Good Data' }), { status: 200 });
            // const transporter = nodemailer.createTransport({
            //     port: 465,
            //     host: "smtp.gmail.com",
            //     auth: {
            //         user: process.env.NODEMAILER_EMAIL,
            //         pass: process.env.NODEMAILER_PASSWORD,
            //     },
            //     secure: true,
            // });

            if (typeof email !== 'string' || typeof message !== 'string') return new Response(JSON.stringify({ message: 'Bad Data' }), { status: 400 });
            if (emailRegex.test(email) === false) return new Response(JSON.stringify({ message: 'Please enter valid email' }), { status: 400 });



            const mailData = {
                from: process.env.NODEMAILER_EMAIL,
                to: process.env.TO_EMAIL,
                subject: `Message from ${email}`,
                text: message,
            };

            // transporter.sendMail(mailData, function (err, info) {
            //     console.log(info)
            //     if (err) return new Response(JSON.stringify({ message: err.message }), { status: 400 });
            //     return new Response(JSON.stringify({ message: 'Message Sent Successfully' }), { status: 200 });
            // })

            break;
    }
}
