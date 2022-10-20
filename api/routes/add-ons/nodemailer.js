/** @format */

const nodemailer = require('nodemailer');
require('dotenv').config();

const { Mail_USER, Mail_PASSWORD2 } = process.env;

module.exports = {
  transporter: nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: Mail_USER,
      pass: Mail_PASSWORD2,
    },
  }),
  mailWelcome: (email, name) => {
    return {
      from: '"Henry bot asistant" <bootcamphenry.ecommerce@gmail.com>',
      to: email,
      subject: `Le damos la bienvenida ${name}`,
      html: `
            <img width=100% src="https://i.imgur.com/5f3UmEb.jpg" />
            `,
    };
  },

  mailOffer: (email) => {
    return {
      from: '"Henry bot asistant" <bootcamphenry.ecommerce@gmail.com>',
      to: email,
      subject: 'Henry se pone de cabeza',
      html: `
            <img width=80% src="https://i.imgur.com/YrCskdr.jpg" />
            <br/>
            <a href=https://henry-commerce.netlify.app/><b>LINK</b></a>
            `,
    };
  },

  mailChangepassword: (email, link) => {
    return {
      from: '"Henry bot asistant" <bootcamphenry.ecommerce@gmail.com>',
      to: email,
      subject: 'Cambio de contraseña',
      html: `
            <img width=80% src="https://i.imgur.com/kJFPkVH.jpg" />
            <br/>
            <a href=https://henry-commerce.netlify.app/ ><b>LINK</b></a>
            `,
    };
  },
  mailBought: (email) => {
    return {
      from: '"Henry bot asistant" <bootcamphenry.ecommerce@gmail.com>',
      to: email,
      subject: 'Purchase!!',
      html: `
            
        <img width=80% src="https://i.imgur.com/mnkuakX.png" />
        <br/>
        <a href=https://henry-commerce.netlify.app/ ><b>LINK</b></a>
        `,
    };
  },
};
