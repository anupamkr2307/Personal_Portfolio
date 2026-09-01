const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAchievements = async (req, res, next) => {
  try {
    const list = await prisma.achievement.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    res.json({ success: true, achievements: list });
  } catch (error) {
    next(error);
  }
};

const createAchievement = async (req, res, next) => {
  try {
    const { title, subtitle, description, icon, date, displayOrder } = req.body;
    const ach = await prisma.achievement.create({
      data: {
        title,
        subtitle,
        description,
        icon: icon || 'Trophy',
        date,
        displayOrder: Number(displayOrder || 0),
      },
    });
    res.status(201).json({ success: true, message: 'Achievement created successfully.', achievement: ach });
  } catch (error) {
    next(error);
  }
};

const updateAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.displayOrder !== undefined) data.displayOrder = Number(data.displayOrder);

    const ach = await prisma.achievement.update({
      where: { id },
      data,
    });
    res.json({ success: true, message: 'Achievement updated successfully.', achievement: ach });
  } catch (error) {
    next(error);
  }
};

const deleteAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.achievement.delete({ where: { id } });
    res.json({ success: true, message: 'Achievement deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
