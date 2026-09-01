const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProjects = async (req, res, next) => {
  try {
    const { category, search, featured } = req.query;

    const where = {};
    if (category && category !== 'All') {
      where.category = { contains: category, mode: 'insensitive' };
    }
    if (featured === 'true') {
      where.featured = true;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { technologies: { contains: search, mode: 'insensitive' } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
    });

    const parsedProjects = projects.map(p => ({
      ...p,
      technologies: JSON.parse(p.technologies || '[]'),
      gallery: JSON.parse(p.gallery || '[]'),
    }));

    res.json({ success: true, count: parsedProjects.length, projects: parsedProjects });
  } catch (error) {
    next(error);
  }
};

const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findUnique({ where: { slug } });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    const parsedProject = {
      ...project,
      technologies: JSON.parse(project.technologies || '[]'),
      gallery: JSON.parse(project.gallery || '[]'),
    };

    res.json({ success: true, project: parsedProject });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      description,
      longDescription,
      problemStatement,
      solution,
      architecture,
      challenges,
      results,
      image,
      gallery,
      technologies,
      githubUrl,
      liveUrl,
      featured,
      category,
      displayOrder,
    } = req.body;

    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const project = await prisma.project.create({
      data: {
        title,
        slug: finalSlug,
        description,
        longDescription,
        problemStatement,
        solution,
        architecture,
        challenges,
        results,
        image,
        gallery: Array.isArray(gallery) ? JSON.stringify(gallery) : (gallery || '[]'),
        technologies: Array.isArray(technologies) ? JSON.stringify(technologies) : (technologies || '[]'),
        githubUrl,
        liveUrl,
        featured: Boolean(featured),
        category: category || 'Full-Stack',
        displayOrder: Number(displayOrder || 0),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      project: {
        ...project,
        technologies: JSON.parse(project.technologies),
        gallery: JSON.parse(project.gallery),
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (data.gallery !== undefined && Array.isArray(data.gallery)) {
      data.gallery = JSON.stringify(data.gallery);
    }
    if (data.technologies !== undefined && Array.isArray(data.technologies)) {
      data.technologies = JSON.stringify(data.technologies);
    }
    if (data.featured !== undefined) {
      data.featured = Boolean(data.featured);
    }
    if (data.displayOrder !== undefined) {
      data.displayOrder = Number(data.displayOrder);
    }

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    res.json({
      success: true,
      message: 'Project updated successfully.',
      project: {
        ...project,
        technologies: JSON.parse(project.technologies),
        gallery: JSON.parse(project.gallery),
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
