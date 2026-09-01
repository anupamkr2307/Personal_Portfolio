const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getEducation = async (req, res, next) => {
  try {
    const list = await prisma.education.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    const parsed = list.map(edu => ({
      ...edu,
      coursework: JSON.parse(edu.coursework || '[]'),
      achievements: JSON.parse(edu.achievements || '[]'),
    }));

    res.json({ success: true, education: parsed });
  } catch (error) {
    next(error);
  }
};

const createEducation = async (req, res, next) => {
  try {
    const { degree, institution, fieldOfStudy, startYear, endYear, current, coursework, achievements, displayOrder } = req.body;
    const edu = await prisma.education.create({
      data: {
        degree,
        institution,
        fieldOfStudy,
        startYear,
        endYear: endYear || 'Present',
        current: Boolean(current),
        coursework: Array.isArray(coursework) ? JSON.stringify(coursework) : (coursework || '[]'),
        achievements: Array.isArray(achievements) ? JSON.stringify(achievements) : (achievements || '[]'),
        displayOrder: Number(displayOrder || 0),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Education created successfully.',
      education: {
        ...edu,
        coursework: JSON.parse(edu.coursework),
        achievements: JSON.parse(edu.achievements),
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (data.coursework !== undefined && Array.isArray(data.coursework)) {
      data.coursework = JSON.stringify(data.coursework);
    }
    if (data.achievements !== undefined && Array.isArray(data.achievements)) {
      data.achievements = JSON.stringify(data.achievements);
    }
    if (data.current !== undefined) data.current = Boolean(data.current);
    if (data.displayOrder !== undefined) data.displayOrder = Number(data.displayOrder);

    const edu = await prisma.education.update({
      where: { id },
      data,
    });

    res.json({
      success: true,
      message: 'Education updated successfully.',
      education: {
        ...edu,
        coursework: JSON.parse(edu.coursework),
        achievements: JSON.parse(edu.achievements),
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.education.delete({ where: { id } });
    res.json({ success: true, message: 'Education entry deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};
