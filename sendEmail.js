const express = require('express')
const router = express.Router()

//email
const MailConfig = require('./email')
const gmailTransport = MailConfig.GmailTransport
const smtpTransport = MailConfig.SMTPTransport

const gmailEmail = (options, res)=>{
  gmailTransport.sendMail(options, (error,info) => {
    if(error) res.json(error)
    res.json(info)
  });
}

const smtpEmail = (options, res) => {
  smtpTransport.verify((error, success) => {
      if(error) {
        res.json({error})
      } else {
        smtpTransport.sendMail(options, (error,info) => {
          if(error) {
            res.json({error})
          }
          res.json({info});
        });
      }
  })
}

module.exports = {smtpEmail, gmailEmail}
