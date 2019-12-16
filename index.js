const express = require('express')
const app = express()
const smtpEmail = require('./sendEmail').smtpEmail
const gmailEmail = require('./sendEmail').gmailEmail

//middlewres
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/sendEmail', (req, res)=>{
  const options = {
    // from: 'oye.opeyemi.oye@gmail.com',
    from: '"Opeyemi" <ope@oaafoundation.com>',
    to: req.body.email,
    subject: 'Welcome To Our Web Page',
    html:`<div>
            <h1>Email has been sent</h1>
          </div>`
  }
  // gmailEmail(options, res)
  smtpEmail(options, res)
})

//set-up view for production
if(process.env.NODE_ENV === 'production'){
	app.use(express.static('views/build'))
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'build', 'index.html'))
  })
}

//use the server's port or a defined one
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`The app is running on port ${PORT}`))
