require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
const emailTemplate = require('./emailTemplate');
const app = express();
const port = process.env.PORT || 3000;

// Configura el transporte de nodemailer
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SENDER_ADDRESS, // Tu correo electrónico de Gmail
    pass: process.env.EMAIL_SENDER_PASSWORD // Tu contraseña de Gmail
  }
});

app.use(express.static('public'));

// Verifica si la fecha del regalo está establecida
if (!process.env.GIFT_DATE) {
  console.error('ERROR: La variable de entorno GIFT_DATE no está establecida.');
  process.exit(1);
}

// Ruta para obtener la fecha del regalo
app.get('/target-date', (req, res) => {
  const targetDate = moment.tz(process.env.GIFT_DATE, "America/Mexico_City").format();
  res.json({ targetDate });
});


// Ruta para enviar correo electrónico
app.post('/send-email', (req, res) => {
    const recipientList = process.env.GIFT_RECIPIENT_EMAILS.split(',');
    const recipientName = process.env.GIFT_RECIPIENT_NAME;
    let mailOptions = {
        from: process.env.EMAIL_SENDER_ADDRESS,
        to: recipientList,
        subject: 'Mensaje Navideño 🎄',
        html: emailTemplate // Usa el diseño HTML como cuerpo del correo
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500).send(`¡Ups! 😞 ${recipientName}, lamentablemente no pudimos enviar tu regalo a tus correos electrónicos: ${process.env.GIFT_RECIPIENT_EMAILS}. Por favor, comunícate con los organizadores de los regalos para que te envíen el regalo de forma manual. ¡Disfruta tu regalo de todas formas! 🎁`);
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).send(`Todo salió perfecto 🎄🎅🎁 😁, ${recipientName} 😉. ¡Yupi! Por favor, revisa cualquiera de estos correos electrónicos tuyos: ${process.env.GIFT_RECIPIENT_EMAILS} y disfruta de tu regalo de Navidad. ¡Feliz Navidad! 🎉🎄`);
        }
    });
});


// Ruta para obtener la información del destinatario
app.get('/get-recipient-info', (req, res) => {
  const recipientName = process.env.GIFT_RECIPIENT_NAME;
  const giftDate = process.env.GIFT_DATE;
  res.json({ recipientName, giftDate });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
