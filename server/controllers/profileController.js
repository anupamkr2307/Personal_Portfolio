const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProfile = async (req, res, next) => {
  try {
    let profile = await prisma.profile.findFirst();
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          name: 'Anupam Kumar',
          title: 'Web Developer | AI/ML Learner | Database Learner',
          email: 'anupamkr2307@gmail.com',
          githubUrl: 'https://github.com/anupamkr2307',
          linkedinUrl: 'https://www.linkedin.com/in/anupam-kumar-7305a8280',
        },
      });
    }
    res.json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    let profile = await prisma.profile.findFirst();
    const data = req.body;

    // Convert string numbers to numbers if present
    if (data.dsaSolved !== undefined) data.dsaSolved = Number(data.dsaSolved);
    if (data.projectsCount !== undefined) data.projectsCount = Number(data.projectsCount);
    if (data.totalTechnologies !== undefined) data.totalTechnologies = Number(data.totalTechnologies);

    if (profile) {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data,
      });
    } else {
      profile = await prisma.profile.create({ data });
    }

    res.json({ success: true, message: 'Profile updated successfully.', profile });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };
