const app = require('./app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Verify DB Connection
    await prisma.$connect();
    console.log('⚡ Connected successfully to Database via Prisma ORM.');

    app.listen(PORT, () => {
      console.log(`🚀 Anupam Portfolio REST API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to Database:', error.message);
    process.exit(1);
  }
}

startServer();
