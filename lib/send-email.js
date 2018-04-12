const EmailClient = require('./EmailClient');

module.exports = (opts, subject, message) => {
  const { user, password, recipients } = opts;
  const emailClient = new EmailClient(user, password);
  emailClient.sendEmail(recipients, subject, message);
};
