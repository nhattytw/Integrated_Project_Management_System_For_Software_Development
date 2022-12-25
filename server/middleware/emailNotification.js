import nodemailer from "nodemailer"
// const nodemailer = require('nodemailer')
// change the above from import to const

const projectCreationEmailNotifications=()=>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'roblexetipms@gmail.com',
        pass: 'ssvxsubbsfpfyjoy'
      }
    });
    
    var mailOptions = {
      from: 'israeldark8@gmail.com',
      to: 'roblexetipms@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}
module.exports = projectCreationEmailNotifications;