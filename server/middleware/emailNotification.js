const nodemailer = require('nodemailer')

const randomString = Math.random().toString(36).slice(-8)

const mailNotifications = (devList, type, project, team) => {
  let text = ``

  if (type === 'addToteams') {
    text = `Subject: Welcome to the ${team}!
Dear Employee,

  We are excited to have you aboard and look forward to seeing what you can do as part of our team ${team}! 

You bring a unique set of skills and abilities that will only add to our dynamic atmosphere.We're confident that your presence will make an immediate impact on the success of our efforts.  

Please take time to familiarize yourself with the specific objectives for our team and contact us if you have any questions about how you can best contribute. 

As part of the team, we encourage open communication and collaboration between each other.Be sure to reach out to fellow teammates if you need assistance at any time or want feedback on any ideas. 

Thank you again for joining our team! Let's work together and make great things happen!


Best Regards,
  Ahaz Software and Web Technologies
`
  }
  else if (type === 'meeting') {
    text = `Subject: Meeing Reminder

Dear Employee,

  This is to remind you of your upcoming meeting.

The meeting will be held on ZOOM and check your IMPS notifications.Please make sure that you are there on time and prepared for the discussion. 


Thank you very much. 

Best Regards,
  Ahaz Software and Web Technologies
`
  }
  else if (type === 'forgotPass') {
    text = `Subject: Password Reset Key

Dear User, 

You must have forgotten your password. 

We have contacted you because you have attemptted to change your password. 

Secret Key: ${randomString}

If its not you that initiated this, disgard this email. 

We thank you for not sharing your password. 

Best Regards, 
Ahaz Software and Web Technologies
`
  }
  else if (type === 'assign') {
    text = `Subject: Team Assignment

Dear Employee,

  This is to inform you that your team ${team} have been assigned to the project ${project}.

Please check your IPMS Assignment page for details of the assignment.


Thank you very much. 

Best Regards,
  Ahaz Software and Web Technologies
    `
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
    subject: { text },
    text: text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return randomString
}

module.exports = mailNotifications;