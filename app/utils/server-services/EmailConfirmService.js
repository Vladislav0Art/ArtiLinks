
const uuidv4 = require('uuid').v4;
const nodemailer = require('nodemailer');
// models
const EmailConfirmation = require('../db/models/EmailConfirmation');
const PasswordRecovery = require('../db/models/PasswordRecovery');


class EmailConfirmService {
	// saves instance of email confirmation in db 
	static createEmailConfirmationInstance = async (userId) => {
		const uid = uuidv4();
		const emailConfirmationInstance = new EmailConfirmation({ uid, userId });
		return await emailConfirmationInstance.save();
	};


	// saves instance of password recovery in db
	static createPasswordRecoveryInstance = async (email) => {
		const uid = uuidv4();
		const passwordRecoveryInstance = new PasswordRecovery({ uid, email });
		return await passwordRecoveryInstance.save();
	};


	static createTransporter = () => {
		// create reusable transporter object using the default SMTP transport
		// the credentials are secret
		transporter = nodemailer.createTransport({
			host: process.env.smtp.host,
			port: process.env.smtp.port,
			secure: process.env.smtp.isSecure, 
			auth: {
				user: process.env.smtp.email, // generated ethereal user
				pass: process.env.smtp.password // generated ethereal password
			}
		});
		return transporter;
	};


	// sending confirmation email via modemailer 
	static sendConfirmationEmail = async ({ uid, userEmail, host }) => new Promise((resolve, reject) => {
		// creating link for email verifying
		const confirmationLink = `http://${host}/api/auth/confirm/${uid}`;

		// creating html output for nodemailer
		const output = `
			<h1>Confirm your email by clicking the link below:</h1>
			<p>In case you have not tried to register on the website <b>ArtiLinks</b> ignore this message</p>
			<a href="${confirmationLink}">Confirm email</a>
		`;
		
		const transporter = this.createTransporter();

		// send mail with defined transport object
		transporter.sendMail({
			from: `"ArtiLinks" <${process.env.smtp.email}>`, // sender address
			to: userEmail,
			subject: 'Email confirmation',
			html: output // html body
		}, (err, info) => {
			// error occured
			if(err) {
				return reject(err);
			}

			resolve(info);
		});

	});

	// sends email with password reset link to the provided email
	static sendPasswordRecoveryEmail = async ({ uid, userEmail, host }) => new Promise((resolve, reject) => {
		const recoveryLink = `http://${host}/auth/recovery/${uid}`;
		
		const output = `
			<h1>Click the link below to reset the old password and create a new one:</h1>
			<p>In case you have not tried to reset your password on <b>ArtiLinks</b> domain ignore this message</p>
			<p>The reset link will be expired in 1 hour</p>
			<a href="${recoveryLink}">Reset password</a>
		`;

		const transporter = this.createTransporter();

		// send mail with defined transport object
		transporter.sendMail({
			from: `"ArtiLinks" <${process.env.smtp.email}>`, // sender address
			to: userEmail,
			subject: 'Password recovery',
			html: output // html body
		}, (err, info) => {
			// if error occured during sending
			if(err) {
				return reject(err);
			}

			resolve(info);
		});

	});

};


module.exports = EmailConfirmService;