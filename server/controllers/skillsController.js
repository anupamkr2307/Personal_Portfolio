const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSkills = async (req, res, next) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { displayOrder: 'asc' }],
    });

    // Group skills by category for convenience
    const grouped = skills.reduce((acc, skill) => {
      const cat = skill.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});

    res.json({ success: true, count: skills.length, skills, grouped });
  } catch (error) {
    next(error);
  }
};

const createSkill = async (req, res, next) => {
  try {
    const { name, category, proficiency, icon, displayOrder } = req.body;
    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        proficiency: Number(proficiency || 80),
        icon,
        displayOrder: Number(displayOrder || 0),
      },
    });
    res.status(201).json({ success: true, message: 'Skill created successfully.', skill });
  } catch (error) {
    next(error);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (data.proficiency !== undefined) data.proficiency = Number(data.proficiency);
    if (data.displayOrder !== undefined) data.displayOrder = Number(data.displayOrder);

    const skill = await prisma.skill.update({
      where: { id },
      data,
    });
    res.json({ success: true, message: 'Skill updated successfully.', skill });
  } catch (error) {
    next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    res.json({ success: true, message: 'Skill deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
