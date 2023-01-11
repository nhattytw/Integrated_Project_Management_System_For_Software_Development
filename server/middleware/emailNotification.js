// import nodemailer from "nodemailer"
const nodemailer = require('nodemailer')
// change the above from import to const

const dev_added_to_team =`Subject: Welcome to the Team!

Dear Employee, 

We\’re excited to have you aboard and look forward to seeing what you can do as part of our team! 

You bring a unique set of skills and abilities that will only add to our dynamic atmosphere. We're confident that your presence will make an immediate impact on the success of our efforts.  

Please take time to familiarize yourself with the specific objectives for our team and contact us if you have any questions about how you can best contribute. 

As part of the team, we encourage open communication and collaboration between each other. Be sure to reach out to fellow teammates if you need assistance at any time or want feedback on any ideas. 

Thank you again for joining our team! Let's work together and make great things happen!`

const shceduledMeeting =`Dear EMPLOYEE, 

This is to remind you of your upcoming meeting taking place on DATE at TIME.

The meeting will be held on ZOOM and check your IMPS notifications. Please make sure that you are there on time and prepared for the discussion. 


Thank you very much. 

Best regards, 
Ahaz software solutions`

const mailNotifications=(devList,type)=>{
  let text = ``
  if (type === 'addToteam'){
    text = dev_added_to_team
  }
  else if (type === 'meeting'){
    text = shceduledMeeting
  }
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'roblexetipms@gmail.com',
        pass: 'ssvxsubbsfpfyjoy'
      }
    });
    
    var mailOptions = {
      from: 'roblexetipms@gmail.com',
      to: devList,
      subject: {text},
      text: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}



module.exports = mailNotifications;