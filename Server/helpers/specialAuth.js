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

export { trim, transformEmail };
