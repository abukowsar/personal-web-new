const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

function loadEnv() {
  for (const file of [".env", ".env.local"]) {
    const envPath = path.join(process.cwd(), file);

    if (!fs.existsSync(envPath)) {
      continue;
    }

    for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
      if (!line || line.trim().startsWith("#") || !line.includes("=")) {
        continue;
      }

      const index = line.indexOf("=");
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();

      process.env[key] = value;
    }
  }
}

const projects = [
  {
    title: "AI Based Factchecking Platform (Khoj-BD)",
    description:
      "Artificial Intelligence Powered First Bangla Fact Checking Platform. This platform uses advanced NLP and machine learning algorithms to verify news and information in Bengali language.",
    tags: ["React", "Node.js", "MongoDB", "AI/ML", "NLP"],
    imageUrl: "/api/assets/projects/img-1.png",
    category: "AI/ML",
    year: "2024",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "LLM Platform (Bangla AI)",
    description:
      "Modern AI solutions for all your Bengali language needs - anytime, anywhere. A comprehensive language model platform specifically designed for Bengali language processing.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "OpenAI", "Python"],
    imageUrl: "/api/assets/projects/img-2.png",
    category: "AI/ML",
    year: "2024",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Complaint Management System",
    description:
      "A Digital Solution centralizes and automates the process of handling complaints. Streamlines workflow from complaint submission to resolution with real-time tracking.",
    tags: ["React Native", "Firebase", "Redux", "Node.js"],
    imageUrl: "/api/assets/projects/img-3.png",
    category: "Enterprise",
    year: "2023",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "ERP System",
    description:
      "Enterprise Resource Planning system is a type of business management software that integrates various business processes and functions into a unified system.",
    tags: ["React", "Storybook", "CSS-in-JS", "PostgreSQL", "Docker"],
    imageUrl: "/api/assets/projects/img-15.png",
    category: "Enterprise",
    year: "2023",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "E-commerce Platform",
    description:
      "Modern e-commerce solution with advanced features including AI-powered recommendations, real-time inventory management, and seamless payment integration.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Docker"],
    imageUrl: "/api/assets/projects/img-5.png",
    category: "E-commerce",
    year: "2023",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Healthcare Management System",
    description:
      "Comprehensive healthcare management platform for hospitals and clinics with patient management, appointment scheduling, and medical records.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
    imageUrl: "/api/assets/projects/img-6.png",
    category: "Healthcare",
    year: "2022",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Learning Management System",
    description:
      "Comprehensive LMS platform for educational institutions with course management, student tracking, and interactive learning tools.",
    tags: ["React", "Express.js", "MySQL", "WebRTC", "AWS S3"],
    imageUrl: "/api/assets/projects/img-2.png",
    category: "Education",
    year: "2023",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Real Estate Platform",
    description:
      "Modern real estate platform with property listings, virtual tours, mortgage calculator, and agent management system.",
    tags: ["Vue.js", "Laravel", "PostgreSQL", "Stripe", "Google Maps API"],
    imageUrl: "/api/assets/projects/img-8.png",
    category: "Real Estate",
    year: "2022",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
];

async function main() {
  loadEnv();

  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }

  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });
  await client.connect();

  const dbName = process.env.MONGODB_DB || "personal-web-new";
  const collection = client.db(dbName).collection("projects");
  const now = new Date();

  let inserted = 0;
  let updated = 0;

  for (const project of projects) {
    const result = await collection.updateOne(
      { title: project.title },
      {
        $set: {
          ...project,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );

    inserted += result.upsertedCount || 0;
    updated += result.matchedCount || 0;
  }

  await collection.createIndex({ createdAt: -1 });
  await collection.createIndex({ featured: -1, createdAt: -1 });

  const total = await collection.countDocuments();

  console.log(
    JSON.stringify(
      {
        db: dbName,
        collection: "projects",
        inserted,
        updated,
        total,
      },
      null,
      2
    )
  );

  await client.close();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
