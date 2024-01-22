const mailer=require('nodemailer')
const mailgen=require('mailgen');
//.env



const transporter = mailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maryam58@ethereal.email',
        pass: 'wWdSDqS8UAy913g622'
    }
});
  let mailcreate=new mailgen({
    theme:"default",
    product:{
        name:"Verify mail",
        link:"https://mailgen.js/"
    }
  })

  //POST http://localhost/api/registeremail
  //params  username ,mail,subject,text

    module.exports= registerEmail =async (req,res)=>{
        const {OTP} =req.app.locals
        const {username ,email,subject,text}=req.body
        var semail={
            body:{
                name:username,
                intro:text?text+OTP : `Hello ${username}. Wee glad to have you here !!!` ,
                outro:"Need help,request to this mail, we whould love to help"
            }
        }
    var mailBody=mailcreate.generate(semail)

    let message={
         from: "valerie.stracke@ethereal.email",
         to: email,
         subject:subject,
         html:mailBody
    }
    transporter.sendMail(message)
    .then(()=>{return res.status(200).send("Wait for your email")})

    .catch((err)=>{return res.status(400).send({err}) })

  }