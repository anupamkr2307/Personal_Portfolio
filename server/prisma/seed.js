const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Updating Database with Exact Resume Information for Anupam Kumar...');

  // 1. Seed Admin
  const adminEmail = process.env.ADMIN_EMAIL || 'anupamkr2307@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPassword123!';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Anupam Kumar',
      },
    });
  }

  // 2. Profile with exact Resume Summary
  await prisma.profile.deleteMany();
  await prisma.profile.create({
    data: {
      name: 'Anupam Kumar',
      title: 'Web Developer | AI/ML Learner | Database Learner',
      headline: 'Full-stack software developer skilled in React, Node.js, and Flask',
      bio: 'Full-stack software developer skilled in React, Node.js, and Flask, with strong problem-solving abilities and a solid foundation in Data Structures, DBMS, and OOPs. Experienced in building scalable web applications and machine learning models using Python.',
      about: 'I am a Full-stack software developer pursuing B.Tech in Computer Science at Jaypee University of Engineering and Technology, Guna (2023-2027). Experienced in building responsive React frontends, Express/Flask REST APIs, machine learning prediction models (scikit-learn, RoBERTa NLP), and managing SQL databases.',
      profileImage: '/uploads/anupam_profile.jpg',
      resumeUrl: '/Anupam_Kumar_Resume.pdf',
      email: 'anupamkr2307@gmail.com',
      githubUrl: 'https://github.com/anupamkr2307',
      linkedinUrl: 'https://www.linkedin.com/in/anupam-kumar-7305a8280',
      dsaSolved: 200,
      projectsCount: 3,
      hackathonAchievement: 'Secured Top-5 position at IgNITion Tech Fest 2025 Hackathon',
      totalTechnologies: 16,
    },
  });

  // 3. Skills matching exact Resume breakdown
  await prisma.skill.deleteMany();
  const skillsData = [
    // Programming Languages
    { name: 'C++', category: 'Programming', proficiency: 88, icon: 'Code2', displayOrder: 1 },
    { name: 'Python', category: 'Programming', proficiency: 90, icon: 'Terminal', displayOrder: 2 },
    { name: 'JavaScript', category: 'Programming', proficiency: 88, icon: 'FileCode', displayOrder: 3 },

    // Frameworks & Libraries
    { name: 'React', category: 'Frontend', proficiency: 90, icon: 'Atom', displayOrder: 1 },
    { name: 'Node.js', category: 'Backend', proficiency: 85, icon: 'Server', displayOrder: 2 },
    { name: 'Flask', category: 'Backend', proficiency: 85, icon: 'Flame', displayOrder: 3 },
    { name: 'Bootstrap', category: 'Frontend', proficiency: 82, icon: 'Box', displayOrder: 4 },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, icon: 'Sparkles', displayOrder: 5 },

    // Machine Learning
    { name: 'scikit-learn', category: 'AI / ML', proficiency: 85, icon: 'Bot', displayOrder: 1 },
    { name: 'pandas', category: 'AI / ML', proficiency: 88, icon: 'Table', displayOrder: 2 },
    { name: 'NumPy', category: 'AI / ML', proficiency: 85, icon: 'Binary', displayOrder: 3 },
    { name: 'Linear Regression', category: 'AI / ML', proficiency: 88, icon: 'TrendingUp', displayOrder: 4 },
    { name: 'RoBERTa NLP', category: 'AI / ML', proficiency: 82, icon: 'Brain', displayOrder: 5 },

    // Databases
    { name: 'MySQL', category: 'Databases', proficiency: 85, icon: 'Database', displayOrder: 1 },
    { name: 'PostgreSQL', category: 'Databases', proficiency: 88, icon: 'Layers', displayOrder: 2 },
    { name: 'MongoDB', category: 'Databases', proficiency: 80, icon: 'FolderGit2', displayOrder: 3 },
    { name: 'SQLite', category: 'Databases', proficiency: 85, icon: 'HardDrive', displayOrder: 4 },

    // Tools & Platforms
    { name: 'Git', category: 'Tools', proficiency: 90, icon: 'GitBranch', displayOrder: 1 },
    { name: 'GitHub', category: 'Tools', proficiency: 92, icon: 'Github', displayOrder: 2 },
    { name: 'VS Code', category: 'Tools', proficiency: 95, icon: 'Monitor', displayOrder: 3 },
    { name: 'Jupyter Notebook', category: 'Tools', proficiency: 88, icon: 'BookOpen', displayOrder: 4 },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({ data: skill });
  }

  // 4. Projects matching exact Resume content
  await prisma.project.deleteMany();
  const projectsData = [
    {
      title: 'Smart Irrigation System',
      slug: 'smart-irrigation',
      description: 'An ML-powered smart irrigation system improving water efficiency by ~30% using environmental IoT sensors and scikit-learn models deployed with Flask.',
      longDescription: 'Smart Irrigation is an intelligent machine-learning application built to optimize agricultural water usage. By analyzing real-time IoT sensor measurements including soil moisture, ambient temperature, and relative humidity, the system trains ML models using Python and scikit-learn to predict irrigation requirements, improving water efficiency by ~30%.',
      problemStatement: 'Conventional farming water management relies on rigid manual schedules or simple thresholds, leading to massive water waste or crop under-hydration.',
      solution: 'Trained predictive ML models with Python and scikit-learn utilizing IoT sensor data (soil moisture, temperature, humidity) and deployed using Flask.',
      architecture: 'IoT Sensors -> Python Data Preprocessing -> scikit-learn ML Model -> Flask Server REST API -> Web Dashboard.',
      challenges: 'Handling noisy IoT sensor data streams and fine-tuning model hyper-parameters for high cross-validation accuracy.',
      results: 'Improved overall irrigation water efficiency by ~30% in trial tests.',
      image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=1200&q=80'
      ]),
      technologies: JSON.stringify(['Python', 'scikit-learn', 'IoT Sensors', 'Flask', 'HTML/CSS']),
      githubUrl: 'https://github.com/anupamkr2307/Smart-irrigation',
      liveUrl: 'https://github.com/anupamkr2307/Smart-irrigation',
      featured: true,
      category: 'AI/ML & IoT',
      displayOrder: 1,
    },
    {
      title: 'Auto Mind – Car Price Prediction',
      slug: 'auto-mind',
      description: 'Built a car price prediction system achieving 85% accuracy using Linear Regression with Python, scikit-learn, pandas, NumPy, and Flask.',
      longDescription: 'Auto Mind is a used car price prediction application achieving 85% prediction accuracy using Linear Regression. The system performs Exploratory Data Analysis (EDA) to identify key price factors such as mileage, vehicle age, and brand impact on pre-owned car valuation.',
      problemStatement: 'Determining fair market price for pre-owned vehicles is opaque and prone to price discrepancies.',
      solution: 'Utilized Python, scikit-learn, pandas, and NumPy for data preprocessing and model training. Developed a Flask-based web application enabling real-time price prediction.',
      architecture: 'Python Dataset -> Pandas/NumPy Preprocessing -> Linear Regression Model -> Flask Web Server.',
      challenges: 'Cleaning multi-dimensional vehicle datasets, removing outliers, and encoding categorical vehicle features smoothly.',
      results: 'Achieved 85% price prediction accuracy and provided transparent pricing insights via EDA.',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
      ]),
      technologies: JSON.stringify(['Python', 'scikit-learn', 'pandas', 'NumPy', 'Linear Regression', 'Flask']),
      githubUrl: 'https://github.com/anupamkr2307/Auto_Mind',
      liveUrl: 'https://github.com/anupamkr2307/Auto_Mind',
      featured: true,
      category: 'Machine Learning',
      displayOrder: 2,
    },
    {
      title: 'Mental Health Support System',
      slug: 'mental-health-support',
      description: 'Full-stack web application enabling doctor-patient interactions, role-based auth, AJAX real-time chat, AI emotion detection with RoBERTa NLP, and UPI payment QR.',
      longDescription: 'Mental Health Support System is a full-stack web application enabling secure doctor-patient interactions for mental health care. Features include role-based authentication with separate dashboards for doctors and patients, appointment management, real-time chat using AJAX polling, AI-based emotion detection using a RoBERTa model to analyze user sentiment, prescription management, UPI payment QR generation, and a responsive mobile-friendly UI.',
      problemStatement: 'Accessibility to qualified mental healthcare requires private consultations, sentiment tracking, and simplified prescription/payment systems.',
      solution: 'Developed a full-stack platform incorporating AI-based emotion detection using a RoBERTa NLP model to analyze patient sentiment and integrated UPI payment QR generation.',
      architecture: 'Flask Web Framework -> SQLite Database -> RoBERTa NLP Model -> AJAX Real-Time Chat & UPI Payment Engine.',
      challenges: 'Integrating deep learning transformer sentiment analysis while maintaining fast request-response cycles.',
      results: 'Delivered an interactive medical platform with doctor/patient portals, prescription tracking, and automated sentiment charts.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80'
      ]),
      technologies: JSON.stringify(['Flask', 'Python', 'SQLite', 'AJAX', 'RoBERTa NLP', 'UPI Payment QR']),
      githubUrl: 'https://github.com/anupamkr2307',
      liveUrl: 'https://github.com/anupamkr2307',
      featured: true,
      category: 'Full-Stack & NLP',
      displayOrder: 3,
    },
  ];

  for (const proj of projectsData) {
    await prisma.project.create({ data: proj });
  }

  // 5. Experience matching exact Resume
  await prisma.experience.deleteMany();
  await prisma.experience.create({
    data: {
      role: 'Web Developer Intern',
      company: 'Vault of Codes',
      location: 'Remote',
      startDate: 'Jun 2025',
      endDate: 'Jul 2025',
      current: false,
      description: 'Built responsive React components, integrated REST APIs using Node.js and Flask, and collaborated using Git/GitHub version control.',
      bulletPoints: JSON.stringify([
        'Built responsive React components, improving overall user experience across devices.',
        'Integrated REST APIs using Node.js and Flask for seamless frontend-backend communication.',
        'Used Git and GitHub for efficient version control and collaboration.'
      ]),
      displayOrder: 1,
    },
  });

  // 6. Education matching exact Resume
  await prisma.education.deleteMany();
  await prisma.education.create({
    data: {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Jaypee University of Engineering and Technology, Guna',
      fieldOfStudy: 'Computer Science',
      startYear: '2023',
      endYear: '2027',
      current: true,
      coursework: JSON.stringify([
        'Data Structures & Algorithms',
        'Database Management Systems (DBMS)',
        'Object-Oriented Programming (OOPs)',
        'Problem Solving'
      ]),
      achievements: JSON.stringify([
        'Solved 200+ DSA problems across LeetCode, Codeforces, and CodeChef',
        'Secured Top-5 position at IgNITion Tech Fest 2025 Hackathon'
      ]),
      displayOrder: 1,
    },
  });

  // 7. Achievements matching exact Resume
  await prisma.achievement.deleteMany();
  const achData = [
    {
      title: 'Solved 200+ DSA Problems',
      subtitle: 'LeetCode, Codeforces & CodeChef',
      description: 'Solved 200+ DSA problems across LeetCode, Codeforces, and CodeChef with strong focus on arrays, trees, dynamic programming, and algorithm optimization.',
      icon: 'Code',
      date: '2025',
      displayOrder: 1,
    },
    {
      title: 'Secured Top-5 Position at IgNITion Tech Fest 2025 Hackathon',
      subtitle: 'IgNITion Tech Fest 2025',
      description: 'Achieved a Top-5 ranking in the competitive IgNITion Tech Fest 2025 Hackathon by pitching and engineering an innovative software solution.',
      icon: 'Trophy',
      date: '2025',
      displayOrder: 2,
    },
    {
      title: 'Web Developer Internship at Vault of Codes',
      subtitle: 'Vault of Codes (Remote)',
      description: 'Successfully completed Web Developer Internship building React components and integrating Node.js/Flask REST APIs.',
      icon: 'Briefcase',
      date: 'Jun 2025 – Jul 2025',
      displayOrder: 3,
    },
  ];

  for (const ach of achData) {
    await prisma.achievement.create({ data: ach });
  }

  console.log('🎉 Database updated with exact Resume data!');
}

main()
  .catch(e => {
    console.error('❌ Error updating seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
