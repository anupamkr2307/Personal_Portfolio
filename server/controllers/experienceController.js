const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getExperience = async (req, res, next) => {
  try {
    const list = await prisma.experience.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    const parsed = list.map(exp => ({
      ...exp,
      bulletPoints: JSON.parse(exp.bulletPoints || '[]'),
    }));

    res.json({ success: true, experience: parsed });
  } catch (error) {
    next(error);
  }
};

const createExperience = async (req, res, next) => {
  try {
    const { role, company, location, startDate, endDate, current, description, bulletPoints, displayOrder } = req.body;
    const exp = await prisma.experience.create({
      data: {
        role,
        company,
        location,
        startDate,
        endDate: endDate || 'Present',
        current: Boolean(current),
        description,
        bulletPoints: Array.isArray(bulletPoints) ? JSON.stringify(bulletPoints) : (bulletPoints || '[]'),
        displayOrder: Number(displayOrder || 0),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Experience created successfully.',
      experience: { ...exp, bulletPoints: JSON.parse(exp.bulletPoints) },
    });
  } catch (error) {
    next(error);
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (data.bulletPoints !== undefined && Array.isArray(data.bulletPoints)) {
      data.bulletPoints = JSON.stringify(data.bulletPoints);
    }
    if (data.current !== undefined) data.current = Boolean(data.current);
    if (data.displayOrder !== undefined) data.displayOrder = Number(data.displayOrder);

    const exp = await prisma.experience.update({
      where: { id },
      data,
    });

    res.json({
      success: true,
      message: 'Experience updated successfully.',
      experience: { ...exp, bulletPoints: JSON.parse(exp.bulletPoints) },
    });
  } catch (error) {
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.experience.delete({ where: { id } });
    res.json({ success: true, message: 'Experience deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
