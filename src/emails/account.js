const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    // sgMail.send({
    //     to: email,
    //     from: 'sendify.mailer@gmail.com',
    //     subject: 'Thanks for joining in!',
    //     text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    // })
}

const sendCancelationEmail = (email, name) => {
    // sgMail.send({
    //     to: email,
    //     from: 'sendify.mailer@gmail.com',
    //     subject: 'Hope you will come back!',
    //     text: `Hope you will come back, ${name}. Application is updated day-by-day so you will be able
    //     to find a new features in the nearest feature.`
    // })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}