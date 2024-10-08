const generateOTP = require("../utils/otp.js")
const nodeMailer = require("nodemailer")
require("dotenv").config()
class OtpController {
    constructor(otpUseCase) {
        this.otpUseCase = otpUseCase
    }

    async CreateOtp(req, res) {
        //create otp and send email here
        const {email} = req.body
        try {
            const otp = generateOTP()
            const createdOtp = await this.otpUseCase.CreateOtp(otp, email)
            //the email sending functionality here now
            const MAIL_SETTINGS = {
                service : 'gmail',
                auth : {
                    user : process.env.MAIL_EMAIL,
                    pass: process.env.MAIL_PASSWORD
                }
            }

            const transporter = nodeMailer.createTransport(MAIL_SETTINGS)
            const header = "Account Verification"
            let info = await transporter.sendMail({
                from : process.env.MAIL_EMAIL,
                to : email,
                subject: 'OTP Verification',
                html: `
                    <html>
                        <head>
                            <style>
                                body {
                                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                                    line-height: 1.5;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }

                                .header {
                                    background-color: #2D298E;
                                    padding: 20px;
                                    text-align: center;
                                }

                                .header h1 {
                                    color: #ffffff;
                                    margin: 0;
                                    font-size: 28px;
                                }

                                .content {
                                    padding: 20px;
                                    background-color: #ffffff;
                                }

                                .content p {
                                    margin-bottom: 15px;
                                    font-size: 18px;
                                    color: #333333;
                                }

                                .content h3 {
                                    color: #2D298E;
                                    margin: 0 0 10px;
                                    font-size: 20px;
                                }

                                .footer {
                                    background-color: #f9f9f9;
                                    padding: 20px;
                                    text-align: center;
                                }

                                .footer p {
                                    margin: 0;
                                    font-size: 16px;
                                    color: #888888;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="header">
			                    <h1>` + header + `</h1>
		                    </div>
                            <div class = "content">
                                <p>Thank you for signing up. To verify your account and complete the signup process, please use the following verification code:</p>
                                <h3>` + otp + `</h3>
                                <p><strong>This verification code is valid for 5 minutes.</strong> Please enter it on the verification page to proceed.</p>
                                <p>If you did not sign up for the BlogApp, please ignore this email.</p>
                            </div>
                        </body>
                    </html>
                        `,
            })
            res.status(200).json({
                success : true,
                message : "otp created successfully and verification email sent"
            })
        } catch(err) {
            console.log(err.message)
            res.status(500).json({
                success : false,
                message : "error while creating otp"
            })
        }
    }
}

module.exports = OtpController