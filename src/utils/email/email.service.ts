import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendVerificationEmail(email: string, token: string): boolean {
    const emailInfo = {
      to: email,
      from: `"4Dist" <${process.env.MAIL_USER}>`,
      subject: 'Verify your email',
      text: 'Verify your email text',
      html: `<p>Click <a href="https://api.4dist.com/v1/account/email?token=${token}">here</a> to verify your email.</p>`,
    };

    this.mailerService
      .sendMail(emailInfo)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        throw new ConflictException(error);
      });
    return true;
  }

  sendFindEmail(email: string, authCode: string): boolean {
    const emailInfo = {
      to: email,
      from: `"4Dist" <${process.env.MAIL_USER}>`,
      subject: 'Please enter the verification code in the 4dist appversioning and re-enter your password.',
      text: 'Please enter the verification code in the 4dist appversioning and re-enter your password.',
      html: `<p>Your verification code is <h1>${authCode}</h1>.</p>`,
    };

    this.mailerService
      .sendMail(emailInfo)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        throw new ConflictException(error);
      });
    return true;
  }
}
