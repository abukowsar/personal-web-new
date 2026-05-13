const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    return;
  }

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) {
      continue;
    }

    const [key, ...value] = line.split("=");
    process.env[key] = value.join("=");
  }
}

const projects = [
  {
    title: "AI Based Factchecking Platform (Khoj-BD)",
    description: "Artificial Intelligence Powered First Bangla Fact Checking Platform",
    tags: ["React", "Node.js", "MongoDB"],
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
      "Modern AI solutions for all your Bengali language needs - anytime, anywhere",
    tags: ["Next.js", "TypeScript", "TailwindCSS"],
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
      "A Digital Solution centralizes and automates the process of handling complaints",
    tags: ["React Native", "Firebase", "Redux"],
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
    description: "Enterprise Resource Planning, system is a type of business management",
    tags: ["React", "Storybook", "CSS-in-JS"],
    imageUrl: "/api/assets/projects/img-15.png",
    category: "Enterprise",
    year: "2023",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
];

const blogPosts = [
  {
    title: "Khoj is an AI-based fact-checking website.",
    excerpt:
      "When you ask Khoj to verify something, it first collects information from the internet, social media, news archives, and multimedia sources.",
    category: "Technology",
    date: "30 Nov, 2025",
    readTime: "5 min read",
    imageUrl: "/api/assets/blog/blog/blog1.jpg",
    icon: "News",
    color: "bg-blue-500",
    featured: true,
  },
  {
    title:
      "ICT-Learning is an international forum for the presentation and discussion of recent advances",
    excerpt:
      "Exploring the latest innovations in Information and Communication Technology through collaborative learning platforms and knowledge sharing forums.",
    category: "Education",
    date: "28 Sep, 2024",
    readTime: "7 min read",
    imageUrl: "/api/assets/blog/blog/blog2.png",
    icon: "ICT",
    color: "bg-purple-500",
    featured: true,
  },
  {
    title: "'Smart Haat' for safe purchase and sale of sacrificial animals",
    excerpt:
      "Revolutionary digital platform transforming traditional livestock markets with technology-driven solutions for secure and transparent transactions.",
    category: "Innovation",
    date: "15 Jul, 2024",
    readTime: "6 min read",
    imageUrl: "/api/assets/blog/blog/blog3.png",
    icon: "Tech",
    color: "bg-green-500",
    featured: true,
  },
  {
    title: "Digital Transformation in Government Services",
    excerpt:
      "How e-governance initiatives are reshaping public service delivery through innovative digital solutions and citizen-centric approaches.",
    category: "GovTech",
    date: "5 Jun, 2024",
    readTime: "8 min read",
    imageUrl: "/api/assets/blog/blog/blog2.png",
    icon: "Gov",
    color: "bg-orange-500",
    featured: true,
  },
  {
    title: "Cybersecurity Best Practices for Modern Organizations",
    excerpt:
      "Essential security measures and protocols to protect digital assets in an increasingly connected world.",
    category: "Security",
    date: "20 May, 2024",
    readTime: "10 min read",
    imageUrl: "/api/assets/blog/blog/blog1.jpg",
    icon: "Sec",
    color: "bg-red-500",
    featured: true,
  },
  {
    title: "AI-Powered Project Management Tools",
    excerpt:
      "Leveraging artificial intelligence to streamline project workflows, enhance team collaboration, and improve delivery outcomes.",
    category: "AI/ML",
    date: "12 Apr, 2024",
    readTime: "6 min read",
    imageUrl: "/api/assets/blog/blog/blog3.png",
    icon: "AI",
    color: "bg-cyan-500",
    featured: true,
  },
];

const books = [
  {
    title: "Child Cyber Safety",
    subtitle: "A Comprehensive Guide to Modern PM Practices",
    author: "Abu Kowsar",
    description:
      "Master the art of project management with proven methodologies, real-world case studies, and practical frameworks for success. This comprehensive guide covers traditional and agile approaches, risk management, stakeholder engagement, and leadership strategies.",
    category: "Project Management",
    rating: 4.8,
    reviews: 156,
    pages: 320,
    language: "English",
    publishYear: "2024",
    price: "$29.99",
    imageUrl: "/api/assets/blog/book/book1.png",
    color: "bg-blue-500",
    icon: "Book",
    downloadUrl: "#",
    previewUrl: "#",
    featured: true,
  },
  {
    title: "AI Integration in Business",
    subtitle: "Transforming Organizations with Artificial Intelligence",
    author: "Abu Kowsar",
    description:
      "Explore practical strategies for implementing AI solutions in business processes, from automation to decision-making systems. Learn how to identify AI opportunities, manage implementation challenges, and measure ROI.",
    category: "Technology",
    rating: 4.9,
    reviews: 203,
    pages: 280,
    language: "English",
    publishYear: "2024",
    price: "$34.99",
    imageUrl: "/api/assets/blog/book/book2.png",
    color: "bg-purple-500",
    icon: "AI",
    downloadUrl: "#",
    previewUrl: "#",
    featured: true,
  },
  {
    title: "Agile Leadership Handbook",
    subtitle: "Leading Teams in the Digital Age",
    author: "Abu Kowsar",
    description:
      "Develop agile leadership skills to navigate complex projects and inspire high-performing teams in dynamic environments. Covers servant leadership, team dynamics, and change management.",
    category: "Leadership",
    rating: 4.7,
    reviews: 128,
    pages: 250,
    language: "English",
    publishYear: "2023",
    price: "$27.99",
    imageUrl: "/api/assets/blog/book/book3.png",
    color: "bg-green-500",
    icon: "Lead",
    downloadUrl: "#",
    previewUrl: "#",
    featured: true,
  },
  {
    title: "Digital Transformation Guide",
    subtitle: "Strategies for Modern Organizations",
    author: "Abu Kowsar",
    description:
      "Navigate the digital transformation journey with proven frameworks, case studies, and implementation strategies. Learn how to build digital capabilities and drive organizational change.",
    category: "Digital Strategy",
    rating: 4.6,
    reviews: 94,
    pages: 300,
    language: "English",
    publishYear: "2023",
    price: "$31.99",
    imageUrl: "/api/assets/blog/book/book4.png",
    color: "bg-orange-500",
    icon: "Tech",
    downloadUrl: "#",
    previewUrl: "#",
    featured: true,
  },
  {
    title: "Cybersecurity for Managers",
    subtitle: "Protecting Digital Assets in the Modern Era",
    author: "Abu Kowsar",
    description:
      "Essential cybersecurity knowledge for business leaders and project managers. Covers risk assessment, security frameworks, incident response, and building security-aware cultures.",
    category: "Security",
    rating: 4.5,
    reviews: 87,
    pages: 275,
    language: "English",
    publishYear: "2023",
    price: "$28.99",
    imageUrl: "/api/assets/blog/book/book1.png",
    color: "bg-red-500",
    icon: "Sec",
    downloadUrl: "#",
    previewUrl: "#",
    featured: true,
  },
  {
    title: "Innovation Management",
    subtitle: "Driving Growth Through Creative Solutions",
    author: "Abu Kowsar",
    description:
      "Learn how to foster innovation within organizations, manage creative processes, and turn ideas into successful products and services. Includes frameworks for innovation strategy and culture building.",
    category: "Innovation",
    rating: 4.4,
    reviews: 72,
    pages: 290,
    language: "English",
    publishYear: "2022",
    price: "$26.99",
    imageUrl: "/api/assets/blog/book/book2.png",
    color: "bg-indigo-500",
    icon: "Idea",
    downloadUrl: "#",
    previewUrl: "#",
    featured: true,
  },
];

async function seedCollection(db, collectionName, items) {
  const collection = db.collection(collectionName);
  const now = new Date();
  let inserted = 0;
  let existing = 0;

  for (const item of items) {
    const result = await collection.updateOne(
      { title: item.title },
      {
        $setOnInsert: {
          ...item,
          createdAt: now,
          updatedAt: now,
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount) {
      inserted += 1;
    } else {
      existing += 1;
    }
  }

  return { collection: collectionName, inserted, existing };
}

async function main() {
  loadEnv();

  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  const db = client.db(process.env.MONGODB_DB || "personal-web-new");
  const results = [
    await seedCollection(db, "projects", projects),
    await seedCollection(db, "blog_posts", blogPosts),
    await seedCollection(db, "books", books),
  ];

  console.log(JSON.stringify(results, null, 2));
  await client.close();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
