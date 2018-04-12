/* eslint no-console: 0 */
const nodemailer = require('nodemailer');

module.exports = class {
  constructor(user, pass) {
    if (typeof user !== 'string')
      throw new TypeError('Expected a string for "user"');
    if (typeof pass !== 'string')
      throw new TypeError('Expected a string for "pass"');
    this.user = user;

    this.transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user,
        pass
      }
    });
  }

  sendEmail(recipients, subject, message) {
    let to;
    if (Array.isArray(recipients)) to = recipients.join(',');
    else if (typeof recipients === 'string') to = recipients;
    else throw new TypeError('Expected a string or array for "to"');

    if (typeof subject !== 'string')
      throw new TypeError('Expected a string for "subject"');
    if (typeof message !== 'string')
      throw new TypeError('Expected a string for "message"');

    const mailOptions = {
      from: this.user,
      to,
      subject,
      text: message
    };

    this.transport.sendMail(mailOptions, error => {
      if (error) {
        console.error(error);
      }
    });
  }
};
