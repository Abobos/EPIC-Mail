import jwt from 'jsonwebtoken';

const generateToken = userDetails => jwt.sign({ userId: userDetails.id, userEmail: userDetails.email}, 
  process.env.SECRET_KEY, 
  { expiresIn: '1d' });

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.decoded = decoded;
    return next();
  } catch (e) {
    return res.status(401).json({
      message: 'auth failed',
    });
  }
};

export { generateToken, verifyToken };
