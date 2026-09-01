const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');
const { trackVisitor } = require('./middleware/analytics');
const { apiLimiter } = require('./middleware/rateLimit');

// Import Route Handlers
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const educationRoutes = require('./routes/educationRoutes');
const achievementsRoutes = require('./routes/achievementsRoutes');
const socialLinksRoutes = require('./routes/socialLinksRoutes');
const contactRoutes = require('./routes/contactRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Global Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static uploaded files for disk storage fallback
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Visitor Analytics middleware
app.use(trackVisitor);

// Rate Limiting for general API routes
app.use('/api', apiLimiter);

// Mounting Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/social-links', socialLinksRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/upload', uploadRoutes);

// Base API status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Anupam Kumar Full-Stack Portfolio API',
    timestamp: new Date().toISOString(),
  });
});

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
