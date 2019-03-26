import jwt from 'jsonwebtoken';

const generateToken = userDetails => jwt.sign({ userId: userDetails.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (e) {
    return res.status(401).json({
      message: 'auth failed',
    });
  }
  return next();
};

export { generateToken, verifyToken };
