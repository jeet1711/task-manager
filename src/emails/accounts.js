const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox4b458963f865458ab55227b25542b34d.mailgun.org';
const apiKey = '9bd8cdd90a8871bb9f35fdc2b7014624-203ef6d0-2b4b7aab';
const mg = mailgun({apiKey: apiKey , domain: DOMAIN});

const userConfig = async function(email, name) {
  const data = {
      from: 'noreply@hisabkitab.com',
      to: email,
      subject: 'Welcome User',
      text: `Hello ${name}, hope you enjoy using our app..!!`
  };
  return mg.messages().send(data).then(data=>{
      console.log("Mail sent")
      return { type:'success', message:"A confirmation email has been sent to your email id." }
  }).catch((error)=>{
      console.log(error)
      return { type:'error', message:"Unable to send email"}
  })
}

const userCancel = async function(email, name) {
  const data = {
      from: 'noreply@hisabkitab.com',
      to: email,
      subject: 'User Cancellation',
      text: `Hello ${name},we got a cancellation request from you. Hope you enjoyed using our app, please give us your valueable feedback..!!`
  };
  return mg.messages().send(data).then(data=>{
      console.log("Cancellation Mail sent")
      return { type:'success', message:"A cancellation email has been sent to your email id." }
  }).catch((error)=>{
      console.log(error)
      return { type:'error', message:"Unable to send email"}
  })
}

module.exports = { userConfig, userCancel };

