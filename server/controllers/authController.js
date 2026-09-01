const { PrismaClient } = require('@prisma/client');
const { comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/token');

const prisma = new PrismaClient();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = generateToken({ id: admin.id, email: admin.email });

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
};

const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
};

module.exports = {
  login,
  me,
  logout,
};
