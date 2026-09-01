const { verifyToken } = require('../utils/token');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized access. No token provided.' });
    }

    const decoded = verifyToken(token);
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true },
    });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid token. Admin user not found.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token verification failed.', error: error.message });
  }
};

module.exports = { protect };
