const nodemailer = require('nodemailer');
const fs = require('fs');
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: '454100270@qq.com',
        pass: 'cbpnbyurgxuebgfa'
    }
})

const mailOptions = {
    from: '454100270@qq.com',
    to: '454100270@qq.com',
    subject: 'Hello',
    text: 'Hello world2',
    html: fs.readFileSync('./test.html', 'utf-8')
}

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Message sent: ' + info.response);
    }
})

