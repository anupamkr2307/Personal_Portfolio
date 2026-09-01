const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAnalyticsStats = async (req, res, next) => {
  try {
    const totalProjects = await prisma.project.count();
    const totalSkills = await prisma.skill.count();
    const totalExperience = await prisma.experience.count();
    const totalAchievements = await prisma.achievement.count();
    const totalMessages = await prisma.contactMessage.count();
    const unreadMessages = await prisma.contactMessage.count({ where: { isRead: false } });

    const totalVisitors = await prisma.visitor.count();
    const totalPageViews = await prisma.pageView.count();

    // Visitor device breakdown
    const visitors = await prisma.visitor.findMany({ select: { deviceType: true, browser: true } });
    const deviceStats = visitors.reduce((acc, v) => {
      acc[v.deviceType] = (acc[v.deviceType] || 0) + 1;
      return acc;
    }, {});

    const browserStats = visitors.reduce((acc, v) => {
      acc[v.browser] = (acc[v.browser] || 0) + 1;
      return acc;
    }, {});

    // Recent 5 messages
    const recentMessages = await prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    // Recent 5 page views
    const recentPageViews = await prisma.pageView.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { visitor: { select: { browser: true, deviceType: true } } },
    });

    res.json({
      success: true,
      stats: {
        totalProjects,
        totalSkills,
        totalExperience,
        totalAchievements,
        totalMessages,
        unreadMessages,
        totalVisitors,
        totalPageViews,
        deviceStats,
        browserStats,
        recentMessages,
        recentPageViews,
      },
    });
  } catch (error) {
    next(error);
  }
};

const trackManualPageView = async (req, res, next) => {
  try {
    const { path } = req.body;
    if (!path) return res.status(400).json({ success: false, message: 'Path required' });

    res.json({ success: true, message: 'Tracked' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalyticsStats,
  trackManualPageView,
};
