const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSocialLinks = async (req, res, next) => {
  try {
    const links = await prisma.socialLink.findMany({
      where: { active: true },
      orderBy: { displayOrder: 'asc' },
    });
    res.json({ success: true, socialLinks: links });
  } catch (error) {
    next(error);
  }
};

const getAllSocialLinksAdmin = async (req, res, next) => {
  try {
    const links = await prisma.socialLink.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    res.json({ success: true, socialLinks: links });
  } catch (error) {
    next(error);
  }
};

const createSocialLink = async (req, res, next) => {
  try {
    const { platform, url, icon, active, displayOrder } = req.body;
    const link = await prisma.socialLink.create({
      data: {
        platform,
        url,
        icon: icon || 'Link',
        active: active !== undefined ? Boolean(active) : true,
        displayOrder: Number(displayOrder || 0),
      },
    });
    res.status(201).json({ success: true, message: 'Social link created.', socialLink: link });
  } catch (error) {
    next(error);
  }
};

const updateSocialLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.active !== undefined) data.active = Boolean(data.active);
    if (data.displayOrder !== undefined) data.displayOrder = Number(data.displayOrder);

    const link = await prisma.socialLink.update({
      where: { id },
      data,
    });
    res.json({ success: true, message: 'Social link updated.', socialLink: link });
  } catch (error) {
    next(error);
  }
};

const deleteSocialLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.socialLink.delete({ where: { id } });
    res.json({ success: true, message: 'Social link deleted.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSocialLinks,
  getAllSocialLinksAdmin,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
};
