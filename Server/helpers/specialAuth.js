function isEmail(email) {
  if (/^[A-Za-z0-9_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
    return true;
  }
  return false;
}

const trim = (req, res, next) => {
  const userData = {};
  Object.keys(req.body).forEach((property) => {
    const value = req.body[property];
    Object.assign(userData, { [property]: value.trim() });
  });
  req.body = userData;
  return next();
};

const transformEmail = (req, res, next) => {
  if (req.body.email) {
    const email = req.body.email.toLowerCase();
    req.body.email = email;
  }
  return next();
};

const splitUsers = (req, res, next) => {
  if (!req.body.users) {
    return res.status(400).json({
      status: 'failed',
      error: '\'users\' is required: you haven\'t add any user',
    });
  }
  const { users } = req.body;
  const validMemberEmails = [];
  const groupEmails = users.replace(/\s/g,'').split(',');
  const filteredGroupEmails = groupEmails.filter(email => email !== '');
  for (const memberEmail of filteredGroupEmails) {
    if (isEmail(memberEmail)) {
      validMemberEmails.push(memberEmail);
    } else {
      return res.status(400).json({
        status: 'failed',
        error: `${memberEmail} is not a valid email`,
      });
    }
  }
  req.body.users = validMemberEmails;
  return next();
};

export { trim, transformEmail, splitUsers };
