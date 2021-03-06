import jwt from 'jsonwebtoken';

export const generateToken = userDetails => jwt.sign(userDetails, process.env.SECRET_KEY, { expiresIn: '1d' });

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.decoded = decoded;
    return next();
  } catch (e) {
    return res.status(401).json({
      status: 'fail',
      error: 'Authentification failed',
    });
  }
};

// export { generateToken, verifyToken };
