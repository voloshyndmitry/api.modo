import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "src/DTO/create-client.dto";
const nodemailer = require("nodemailer");
require("dotenv").config();

const mailTransport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  secure: true,
  secureConnection: false, // TLS requires secureConnection to be false
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  port: process.env.EMAIL_PORT,
  debug: true,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

interface MailOptions {
  to: string;
  subject: string;
  text: string;
}

@Injectable()
export class MailService {
  private getEmailOptionsFromUser(data: CreateClientDto): MailOptions {
    let text = `Congratulations ${data.name} ${data.surname}!
        You have successfully registered.
        Email: ${data.email}
        Date of Birth: ${data.dob}
        Gender: ${data.gender}
        Phone: ${data.phone}
        Address: ${data.address.streetAddress1}, ${data.address.streetAddress2}, ${data.address.postalCode}, ${data.address.province}, ${data.address.city}, ${data.address.country}
        Payment Option: ${data.paymentOption}
        Medical Behavioral Info: ${data.medicalBehavioralInfo}
        Price: $${data.price}`;

        

    if (data.memberships){
      text += `\nMemberships: ${data.memberships.join(", ")}`;
    }

    text += `Thank you for your registration!
    
    Best regards,
    Champion Sport Club`;

    const mailOptions = {
      to: data.email,
      subject: "CHAMPION CLUB: Registration successful!",
      text,
    };
    return mailOptions;
  }

  async send(data: {
    to: string;
    subject: string;
    text: string;
  }): Promise<void> {
    try {
      const from = process.env.EMAIL_FROM;
      await mailTransport.sendMail({ from, ...data });
      console.log("Email sent successfully");
    } catch (err) {
      console.log("Failed to send email");
      console.error(err);
    }
    return;
  }

  async sendUserConfirmation(data: CreateClientDto) {
    const mailOptions = this.getEmailOptionsFromUser(data);
    this.send(mailOptions);
  }
}
