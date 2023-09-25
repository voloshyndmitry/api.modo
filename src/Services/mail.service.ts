import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "src/DTO/create-client.dto";
import getConfirmationEmail from "./emailTemplates/confirmationEmail.template"
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
    const dateObj = new Date(data.dob);
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const dob = year + "/" + month + "/" + day;

    let text = `Congratulations ${data.name} ${data.surname}!
        You have successfully registered.
        Email: ${data.email}
        Date of Birth: ${dob}
        Gender: ${data.gender}
        Phone: ${data.phone}
        Address: ${data.address.streetAddress1}, ${data.address.streetAddress2}, ${data.address.postalCode}, ${data.address.province}, ${data.address.city}, ${data.address.country}
        Payment Option: ${data.paymentOption}
        to payment@championclub.ca
        Medical Behavioral Info: ${data.medicalBehavioralInfo}
        Price: $${data.price} (Including 5% GST)
        `;

    if (data.memberships) {
      text += `\nMemberships: ${data.memberships.join(", ")}
      `;
    }

    text += `\nThank you for your registration!
    
    Best regards,
    Champion Sport Club
    ___________
 

 
    www.champiomclub.ca
    phone: (587) 838 0453
    12686 48 St SE, Calgary, AB, T2Z 0B1
     
    Champion Karate is a business name used by The Champion Sport Club Inc.

    `;

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
    html?: string
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
    const html = getConfirmationEmail(data)
    this.send({ ...mailOptions, html });
  }
}
