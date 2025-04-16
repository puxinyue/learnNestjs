import { Inject, Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EmailService {
   transport: Transporter;

   constructor(private readonly configService: ConfigService) {
    this.transport = createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get('email_user'),
        pass: this.configService.get('email_pass'),
      },
    });
   }
   async sendEmail(email: string) {
    const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const mailOptions = {
      from: this.configService.get('email_user'),
      to: email,
      subject: '验证码',
      html: `<p>您的验证码是：${code}</p>`,
    };
    await this.transport.sendMail(mailOptions);
   }
}
