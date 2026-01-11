"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Download } from "lucide-react";
import Header from "@/components/header";
import ImageLightbox from "@/components/image-lightbox";
import Footer from "@/components/footer";

// Import blog images
import blog1 from "@/assets/images/blog/blog/blog1.jpg";
import blog2 from "@/assets/images/blog/blog/blog2.png";
import blog3 from "@/assets/images/blog/blog/blog3.png";

export default function News() {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
  }>({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
  });

  const allNews = [
    {
      id: 1,
      title: "Khoj is an AI-based fact-checking website",
      excerpt: "When you ask Khoj to verify something, it first collects information from the internet, social media, news archives, and multimedia sources.",
      fullContent: "Khoj represents a revolutionary approach to combating misinformation in the digital age. This AI-powered fact-checking platform leverages advanced natural language processing and machine learning algorithms to verify claims across multiple sources. The system automatically crawls through vast databases of verified information, cross-references claims with authoritative sources, and provides users with comprehensive fact-check reports. What sets Khoj apart is its ability to process Bengali content with high accuracy, making it the first of its kind for Bangla-speaking communities.",
      category: "Technology",
      date: "30 Nov, 2025",
      readTime: "5 min read",
      image: blog1,
      icon: "🌐",
      color: "bg-blue-500",
      author: "Abu Kowsar",
      tags: ["AI", "Fact-checking", "Bengali", "Technology"]
    },
    {
      id: 2,
      title: "ICT-Learning is an international forum for the presentation and discussion of recent advances",
      excerpt: "Exploring the latest innovations in Information and Communication Technology through collaborative learning platforms and knowledge sharing forums.",
      fullContent: "The ICT-Learning international forum serves as a premier platform for researchers, educators, and industry professionals to share cutting-edge developments in information and communication technology. This year's forum focuses on emerging trends such as artificial intelligence in education, blockchain applications in learning management systems, and the integration of virtual reality in remote learning environments. The forum brings together thought leaders from over 50 countries to discuss practical implementations and future directions of ICT in education.",
      category: "Education",
      date: "28 Sep, 2024",
      readTime: "7 min read",
      image: blog2,
      icon: "📱",
      color: "bg-purple-500",
      author: "Dr. Sarah Ahmed",
      tags: ["Education", "ICT", "Learning", "Innovation"]
    },
    {
      id: 3,
      title: "'Smart Haat' for safe purchase and sale of sacrificial animals",
      excerpt: "Revolutionary digital platform transforming traditional livestock markets with technology-driven solutions for secure and transparent transactions.",
      fullContent: "Smart Haat represents a paradigm shift in traditional livestock trading, particularly during religious festivals. This innovative digital platform ensures transparency, fair pricing, and animal welfare standards while maintaining the cultural significance of traditional markets. The system includes features such as digital certificates for animal health, blockchain-based transaction records, GPS tracking for delivery, and integrated payment systems. The platform has successfully reduced fraud by 85% and improved farmer income by providing direct access to consumers.",
      category: "Innovation",
      date: "15 Jul, 2024",
      readTime: "6 min read",
      image: blog3,
      icon: "🚀",
      color: "bg-green-500",
      author: "Mohammad Rahman",
      tags: ["Innovation", "Agriculture", "Digital Platform", "Blockchain"]
    },
    {
      id: 4,
      title: "Digital Transformation in Government Services",
      excerpt: "How e-governance initiatives are reshaping public service delivery through innovative digital solutions and citizen-centric approaches.",
      fullContent: "The digital transformation of government services has accelerated significantly, with citizen-centric design at its core. Modern e-governance platforms are leveraging cloud computing, artificial intelligence, and mobile-first approaches to deliver seamless public services. Key achievements include 90% reduction in processing time for government applications, 24/7 service availability, and improved transparency through real-time tracking systems. The integration of digital identity systems and blockchain technology has enhanced security while simplifying citizen interactions with government agencies.",
      category: "GovTech",
      date: "5 Jun, 2024",
      readTime: "8 min read",
      image: blog2,
      icon: "🏛️",
      color: "bg-orange-500",
      author: "Fatima Khan",
      tags: ["Government", "Digital Transformation", "E-governance", "Public Service"]
    },
    {
      id: 5,
      title: "Cybersecurity Best Practices for Modern Organizations",
      excerpt: "Essential security measures and protocols to protect digital assets in an increasingly connected world.",
      fullContent: "As cyber threats evolve in sophistication and frequency, organizations must adopt comprehensive cybersecurity strategies. This includes implementing zero-trust architecture, regular security audits, employee training programs, and incident response plans. Modern cybersecurity frameworks emphasize proactive threat detection using AI-powered monitoring systems, multi-factor authentication, and encrypted communications. Organizations that have implemented these practices report 70% fewer security incidents and significantly reduced recovery times when breaches do occur.",
      category: "Security",
      date: "20 May, 2024",
      readTime: "10 min read",
      image: blog1,
      icon: "🔐",
      color: "bg-red-500",
      author: "Alex Thompson",
      tags: ["Cybersecurity", "Data Protection", "Risk Management", "Technology"]
    },
    {
      id: 6,
      title: "AI-Powered Project Management Tools",
      excerpt: "Leveraging artificial intelligence to streamline project workflows, enhance team collaboration, and improve delivery outcomes.",
      fullContent: "Artificial intelligence is revolutionizing project management by automating routine tasks, predicting project risks, and optimizing resource allocation. Modern AI-powered tools can analyze historical project data to provide accurate timeline estimates, identify potential bottlenecks before they occur, and suggest optimal team compositions. These tools have shown to improve project success rates by 40% and reduce delivery times by an average of 25%. The integration of natural language processing allows for automated status reporting and intelligent task prioritization.",
      category: "AI/ML",
      date: "12 Apr, 2024",
      readTime: "6 min read",
      image: blog3,
      icon: "🤖",
      color: "bg-cyan-500",
      author: "Dr. Priya Sharma",
      tags: ["AI", "Project Management", "Automation", "Productivity"]
    }
  ];

  const categories = ["All", "Technology", "Education", "Innovation", "GovTech", "Security", "AI/ML"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<typeof allNews[0] | null>(null);

  const filteredNews = selectedCategory === "All" 
    ? allNews 
    : allNews.filter(article => article.category === selectedCategory);

  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setLightboxState({
      isOpen: true,
      imageSrc,
      imageAlt,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState({
      ...lightboxState,
      isOpen: false,
    });
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (selectedArticle) {
    return (
      <>

        <div className="min-h-screen bg-background">
          {/* Article Header */}
          <div className="bg-gradient-to-br from-background via-background to-accent/5 py-12">
            <div className="max-w-4xl mx-auto px-4">
              <Link 
                href="/news" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to News
              </Link>
              
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-4 ${selectedArticle.color}`}>
                  {selectedArticle.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {selectedArticle.title}
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedArticle.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                  <span>By {selectedArticle.author}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="py-12">
            <div className="max-w-4xl mx-auto px-4">
              <div className="mb-8">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover rounded-xl"
                />
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {selectedArticle.excerpt}
                </p>
                <div className="text-foreground leading-relaxed">
                  {selectedArticle.fullContent.split('. ').map((sentence, index) => (
                    <p key={index} className="mb-4">
                      {sentence}{sentence.endsWith('.') ? '' : '.'}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
        <Header />
      <div className="min-h-screen bg-background">
        {/* Header - Hero Style */}
        <div className="bg-gradient-to-br from-background via-background to-accent/5 py-20">
          <div className="max-w-6xl mx-auto px-4">

            
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                News Update
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I am pleased to share that I have successfully contributed to the development and launch of multiple technology-driven digital platforms, focusing on STEM education, Artificial Intelligence (AI), and Cyber Safety initiatives.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="py-8 bg-background border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((article) => (
                <article
                  key={article.id}
                  className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-all hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="relative h-48 bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${article.color}`}>
                        {article.category}
                      </span>
                    </div>
                    <div className={`absolute -bottom-6 -right-6 w-20 h-20 ${article.color} rounded-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                      <span className="text-3xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                        {article.icon}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={lightboxState.isOpen}
        imageSrc={lightboxState.imageSrc}
        imageAlt={lightboxState.imageAlt}
        onClose={handleCloseLightbox}
      />
      
      <Footer />
    </>
  );
}