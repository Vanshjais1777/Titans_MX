import nodemailer from "nodemailer";

// Function to create a transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',  // or other services like 'smtp', 'sendgrid'
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASSWORD
        }
    });
};

// Function to send an email
export const sendEmail = (recipient, subject, mailContent) => {
    // Create the mail options
    const mailOptions = {
        from: process.env.MAIL_ID,
        to: recipient,
        subject: subject,
        text: mailContent
    };

    // Create the transporter
    const transporter = createTransporter();

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
