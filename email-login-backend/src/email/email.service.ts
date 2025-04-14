import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EmailService {
    private transporter: Transporter;
    constructor(private readonly configService: ConfigService) {
        this.transporter = createTransport({
            host: 'smtp.qq.com',
            port: 465,
            secure: true,
            auth: {
                user: this.configService.get('email_user'),
                pass: this.configService.get('email_pass'),
            },
        });
    }
    async sendEmail(email: string, code: string) {
        const mailOptions = {
            from: this.configService.get('email_user'),
            to: email,
            subject: '验证码',
            html: `<p>您的验证码是：${code}</p>`,  
        };
        await this.transporter.sendMail(mailOptions);
    }
}