const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const parseUserAgent = (uaString = '') => {
  let browser = 'Other';
  let deviceType = 'desktop';

  if (/mobile/i.test(uaString)) deviceType = 'mobile';
  else if (/tablet|ipad/i.test(uaString)) deviceType = 'tablet';

  if (/chrome|crios/i.test(uaString)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(uaString)) browser = 'Firefox';
  else if (/safari/i.test(uaString) && !/chrome/i.test(uaString)) browser = 'Safari';
  else if (/edg/i.test(uaString)) browser = 'Edge';

  return { browser, deviceType };
};

const trackVisitor = async (req, res, next) => {
  // Ignore admin endpoints or static assets
  if (req.path.startsWith('/api/admin') || req.path.startsWith('/api/auth') || req.method !== 'GET') {
    return next();
  }

  try {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(rawIp).digest('hex');
    const userAgent = req.headers['user-agent'] || '';
    const { browser, deviceType } = parseUserAgent(userAgent);
    const referrer = req.headers['referer'] || req.headers['referrer'] || null;

    let visitor = await prisma.visitor.findUnique({ where: { ipHash } });

    if (visitor) {
      visitor = await prisma.visitor.update({
        where: { id: visitor.id },
        data: {
          visitCount: { increment: 1 },
          lastVisit: new Date(),
          deviceType,
          browser,
        },
      });
    } else {
      visitor = await prisma.visitor.create({
        data: {
          ipHash,
          userAgent: userAgent.substring(0, 255),
          deviceType,
          browser,
        },
      });
    }

    // Record page view async
    prisma.pageView.create({
      data: {
        path: req.path,
        visitorId: visitor.id,
        referrer: referrer ? referrer.substring(0, 255) : null,
      },
    }).catch(err => console.error('PageView track error:', err.message));

  } catch (err) {
    console.error('Analytics tracking error:', err.message);
  }

  next();
};

module.exports = { trackVisitor };
