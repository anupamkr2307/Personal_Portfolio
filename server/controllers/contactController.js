const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields (name, email, subject, message) are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        ipAddress,
        userAgent,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully. Anupam will get back to you soon.',
      id: contactMessage.id,
    });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    next(error);
  }
};

const updateMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isRead, isReplied } = req.body;

    const data = {};
    if (isRead !== undefined) data.isRead = Boolean(isRead);
    if (isReplied !== undefined) data.isReplied = Boolean(isReplied);

    const message = await prisma.contactMessage.update({
      where: { id },
      data,
    });

    res.json({ success: true, message: 'Contact message updated.', contactMessage: message });
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id } });
    res.json({ success: true, message: 'Contact message deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactForm,
  getMessages,
  updateMessageStatus,
  deleteMessage,
};
