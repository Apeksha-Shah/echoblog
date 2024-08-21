import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// delivery method 
// it contains the configuration details for sending emails
// TLS (Transport Layer Security) and SSL (Secure Sockets Layer) are cryptographic protocols designed to provide secure communication over a computer network.
// used to secure data transfer between a client and a email server
// SMTP (Simple Mail Transfer Protocol) is a protocol for sending e-mail messages between servers.
// port 587 is used for secure SMTP (TLS protocol)
const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    },
    host:'smtp.gmail.com',   // smtp server for gmail which sends the email
     // true for SSL (port 465), false for TLS (port 587)
    secure:false,
    port:587,   
});

export default transporter;