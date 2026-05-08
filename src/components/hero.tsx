"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Download, Award, Users, Calendar, CheckCircle, Star, Briefcase, X, Send } from "lucide-react";
import ownImage from "@/assets/images/about.png";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titles = [
    "Technical Project Manager",
    "AI Integration Specialist",
    "Transform Digital Era"
  ];

  useEffect(() => {
    setMounted(true);
  setIsVisible(true);

    const titleInterval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(titleInterval);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Consultation Request - ${formData.service}`,
          message: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Service: ${formData.service}

Message:
${formData.message}
          `,
        }),
      });

      if (response.ok) {
        alert("Consultation request sent successfully!");
        setShowConsultationModal(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: ""
        });
      } else {
        alert("Failed to send consultation request. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 px-4 py-20"
    >
      {/* Animated Background Elements */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-14 md:gap-12 items-center">
        <div className=" order-2 md:order-1 space-y-6">
          <div className="space-y-4">
            {/* Professional Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certified Project Management Professional</span>
          </div>

          {/* Main Header */}

            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              I'm Engr Abu Kowsar <span className="text-accent">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-semibold">PMP</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-semibold">PMI-ACP</span>
            </span>
            </h1>

          {/* Animated Title */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className="h-16 flex items-center">
                <h3 className="text-3xl md:text-4xl font-bold text-accent leading-tight">
                  {titles[currentTitle]}
                </h3>
              </div>

 {/* Description */}
            <p className="text-lg text-muted-foreground">
              Delivering high-impact projects across software, hardware, and manufacturing. Expert in Agile methodologies, cross-functional team leadership, and digital transformation.
            </p>
          </div>
</div>

            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >


</div>
          {/* Key Highlights */}
          <div
            className={`transition-all duration-1000 delay-800 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/30 transition-all">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-foreground">30% Faster Delivery</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/30 transition-all">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-foreground">20% Higher Satisfaction</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/30 transition-all">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-foreground">100+ Team Members Led</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/30 transition-all">
                <Briefcase className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-foreground">12+ Years Experience</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={() => setShowConsultationModal(true)}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
             Book a consultation
            </button>
            <Link
              href="#projects"
              className="px-6 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View Projects
            </Link>
          </div>
</div>


        <div className="order-1 md:order-2 flex flex-col items-center w-full">
          <div className="relative w-full h-[450px] flex items-center justify-center">
          {/* Main avatar circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-60 h-60 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border-2 border-accent/20">
              <div
                className={`text-8xl transition-transform duration-1000 ${
                  mounted ? "scale-100" : "scale-75"
                }`}
              >
                <Image
                  src={ownImage}
                  alt="Avatar"
                  className="rounded-full object-cover"
                  width={220}
                  height={220}
                />
              </div>
            </div>
          </div>

          {/* Beautiful Floating Skill Cards */}

            {/* Top Left - Project Management */}
          <div className={`absolute  top-4 left-0 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              animation: mounted ? "float 6s ease-in-out infinite" : "none",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold text-sm text-foreground">Project Management</p>
                <p className="text-xs text-muted-foreground">PMP Certified</p>
              </div>
            </div>
          </div>

          {/* Floating card - Next.js */}
          <div
            className={`absolute bottom-8 right-0 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              animation: mounted ? "float 8s ease-in-out infinite 1s" : "none",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold text-sm text-foreground">AI Integration</p>
                <p className="text-xs text-muted-foreground">Specialist</p>
              </div>
            </div>
          </div>

          {/* Floating card - TypeScript */}
          <div
            className={`absolute top-1/7 md:top-1/3 right-0 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              animation: mounted
                ? "float 7s ease-in-out infinite 0.5s"
                : "none",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  Agile Specialist
                </p>
                <p className="text-xs text-muted-foreground">PMI-ACP</p>
              </div>
            </div>
          </div>

          {/* Floating card - Tailwind */}
          <div
            className={`absolute bottom-12 left-0 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm transition-all duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              animation: mounted
                ? "float 8s ease-in-out infinite 1.5s"
                : "none",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  Industrial Designer
                </p>
                <p className="text-xs text-muted-foreground">Specialist</p>
              </div>
          </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>

          </div>

          <div
            className={`w-full flex flex-col items-center transition-all duration-1000 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >


            {/* Availability Badge */}
             <div className="text-center mb-6">
               <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
                {/*<h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Engr Abu Kowsar
                </h3>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-semibold">PMP</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-semibold">PMI-ACP</span>
              </div>
              <p className="text-lg font-semibold text-teal-600 dark:text-teal-400 mb-4">
                Technical Project Manager
              </p>*/}
                 </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Available</span>
                <span className="text-sm text-green-600 dark:text-green-400">Part-time / Consulting</span>
              </div>

{/* Download Resume Button */}
<div className="mb-8 flex justify-center">
        <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg text-sm cursor-pointer w-[200px] md:w-auto"
            >
              <Download size={18} />
              Download Resume (PDF)
            </button>
           </div>
                {/* Social Links - Single Row */}
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/abukowsar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800/70 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg font-medium transition-all hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
              >
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/abukowsar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg font-medium transition-all hover:scale-105 border border-blue-200/50 dark:border-blue-800/50"
              >
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://www.upwork.com/freelancers/~012c55c5f14b141b4a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 rounded-lg font-medium transition-all hover:scale-105 border border-green-200/50 dark:border-green-800/50"
              >
                <span className="text-sm">Upwork</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
      <style>{`
         @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(1deg);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float.delay-300 {
          animation-delay: 0.3s;
        }
        
        .animate-float.delay-600 {
          animation-delay: 0.6s;
        }
        
        .animate-float.delay-900 {
          animation-delay: 0.9s;
        }
        
        @keyframes animate-spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: animate-spin-slow 25s linear infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background border border-border rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">Book a Consultation</h3>
                <button
                  onClick={() => setShowConsultationModal(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Service Interested In *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a service</option>
                    <option value="AI Integration">AI Integration</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Digital Transformation">Digital Transformation</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="STEM Education">STEM Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us about your project or consultation needs..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowConsultationModal(false)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
