const Router=require('express').Router
const router=Router()
const controller =require('../controller/appcontroler')
const auth=require('../middleware/auth')
const registerEmail=require("../controller/mail")


/**POST method */
  router.route('/register').post(controller.registerU)
  router.route('/registerMail').post(registerEmail)
  router.route('/authenticate').post(controller.authUser,(req, res) => res.end())
  router.route('/login').post(controller.authUser,controller.login)


  //**GET method */
  router.route('/username/:username').get(controller.getUser)
  router.route('/generateOPT').get(controller.authUser,auth.localvariable,controller.genOTP)
  router.route('/verifyOPT').get(controller.authUser,controller.verifyOTP)
  router.route('/createResetSession').get(controller.createResetSession)


  /**PUT method */
  router.route('/updateuser').put(auth.auth,controller.updateUser)
  router.route('/resetpassword').put(controller.authUser,controller.resetPassword)
module.exports = router;