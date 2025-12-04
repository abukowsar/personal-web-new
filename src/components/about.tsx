"use client";

import { useState } from "react";

export default function About() {
  const [activeTab, setActiveTab] = useState("skills");

  const skills = [
    { name: "Project Management", level: 95, color: "bg-red-500" },
    { name: "Agile / Scrum", level: 90, color: "bg-primary" },
    { name: "Change Management", level: 85, color: "bg-green-500" },
    { name: "Jira / Confluence", level: 80, color: "bg-yellow-500" },
    { name: "Risk Management", level: 80, color: "bg-cyan-500" },
    { name: "Stakeholder Communication", level: 80, color: "bg-purple-500" },
    { name: "Digital Transformation", level: 90, color: "bg-blue-500" },
  ];

  const experiences = [
    {
      title: "Programmer",
      company:
        "Dept. of ICT, ICT Division, Ministry of Posts Telecommunications and ICT",
      period: "2019 - Present",
      duration: "6 years",
      description:
        "Working closely with analysts, designers and staff, Producing detailed specifications and writing the program codes, Testing the product in controlled, real situations before going live, Preparation of training manuals for users, Maintaining the systems once they are up and running.",
    },
    {
      title: "Project Manager",
      company: "Bright Tech Company, Ltd.",
      period: "2015 - 2019",
      duration: "4 years",
      description:
        "Design, development, and maintenance of software solutions and databases that streamline organizational processes and improve service delivery for large-scale rollouts.",
    },
    {
      title: "Technical Project Manager",
      company: "Bangladesh Canada Friendship Technology Ltd. (BCF Tech)",
      period: "2013 - 2015",
      duration: "2 years",
      description:
        "Develop comprehensive project plans that merge customer requirements with company goals and coordinate various managers and technical personnel during all project phases, from initial development through implementation.",
    },
    {
      title: "Sr. Application Analyst",
      company: "Confidence Group of Industries Ltd.",
      period: "2012 - 2013",
      duration: "1 year",
      description:
        "Developed and implemented a site-wide productivity improvement plan which increased overall productivity by over 20% of the whole industry.",
    },
    {
      title: "Executive IT and Operation",
      company: "Bangkok Hospital Dhaka Office",
      period: "2011 - 2012",
      duration: "1 year",
      description:
        "Managed multiple ERP application - Hospital Planning and Control System (HPCS) projects for manufacturing facilities throughout the Asia Pacific region.",
    },
  ];

  const education = [
    {
      degree: "PgD in Information and Communication Technology",
      institution: "Bangladesh Computer Council (BCC)",
      period: "2014 - 2015",
      duration: "1 year",
    },
    {
      degree: "MSc in Computer Science and Engineering",
      institution: "Islamic University Bangladesh",
      period: "2008 - 2009",
      duration: "1 year",
    },
    {
      degree: "BSc in Computer Science and Engineering",
      institution: "Islamic University Bangladesh",
      period: "2004 - 2008",
      duration: "4 years",
    },
  ];

  const certifications = [
    {
      name: "X-Road Central Server Administrator",
      issuer: "X-Road",
      date: "July 2025",
    },
    {
      name: "Lean Six Sigma White Belt Certificate",
      issuer: "The Council for Six Sigma Certification (CSSC)",
      date: "April 2025",
    },
    {
      name: "Agile Certified Practitioner (PMI-ACP)",
      issuer: "Project Management Institute (PMI), USA",
      date: "July 2020",
    },
    {
      name: "Transition to Fabric for a Power BI",
      issuer: "Microsoft",
      date: "March 2025",
    },
    {
      name: "Generative AI: Introduction and Applications",
      issuer: "IBM",
      date: "February 2025",
    },
    {
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute (PMI), USA",
      date: "April 2020",
    },
    {
      name: "Microsoft Azure Security",
      issuer: "Microsoft Corporation",
      date: "November 2022",
    },
  ];

  const whatIDo = [
    {
      icon: "🚀",
      title: "Product Delivery",
      description: "End-to-end product delivery from MVP to Scale",
    },
    {
      icon: "🏃‍♂️",
      title: "Agile Leadership",
      description: "Agile coaching and Scrum Mastery",
    },
    {
      icon: "🛡️",
      title: "Risk Management",
      description: "Project rescue and risk mitigation",
    },
    {
      icon: "📊",
      title: "PMO Excellence",
      description: "PMO setup, reporting & dashboards",
    },
  ];

  const coreStrengths = [
    {
      icon: "🔄",
      text: "Agile transformations & Scrum coaching",
    },
    {
      icon: "📈",
      text: "Change Management and Reform",
    },
    {
      icon: "🎯",
      text: "KPI-driven delivery",
    },
    {
      icon: "🔌",
      text: "IoT & hardware product delivery",
    },
  ];

  const tabs = [
    { id: "skills", label: "Tech & Tools" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Academic" },
    { id: "certifications", label: "Professional" },
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 bg-background transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Get To Know Me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            About Me
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - About & Lists */}
          <div className="lg:col-span-5 space-y-6">
            {/* Profile Summary Card */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-card to-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />

              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      Technical Project Manager
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      12+ Years of Excellence
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed  text-sm text-balance mb-6">
                  I&lsquo;m a Technical Project Manager with extensive
                  experience delivering software and hardware products. I
                  specialize in Agile transformations, building and coaching
                  high-performing teams, and driving measurable improvements in
                  delivery and customer satisfaction.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-bold text-primary">10+</p>
                    <p className="text-xs text-muted-foreground">Innovations</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-bold text-green-500">30%</p>
                    <p className="text-xs text-muted-foreground">Reduced delays</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <p className="text-2xl font-bold text-violet-500">20%</p>
                    <p className="text-xs text-muted-foreground">Customer satisfaction ↑</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What I Do - Grid Layout */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                  🎯
                </span>
                What I Do
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {whatIDo.map((item, index) => (
                  <div key={index} className="flex gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm mb-0.5 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Strengths - Compact Layout */}
            {/* <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/5 via-card to-card border border-border/50 hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-lg">
                  💪
                </span>
                Core Strengths
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {coreStrengths.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 group p-3 rounded-lg hover:bg-green-500/5 transition-colors cursor-pointer"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-7 ">
            <div className="p-8 rounded-2xl bg-card border border-border/50">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-8 p-1 bg-secondary/50 rounded-xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 flex-1 min-w-[120px] ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[540px] max-h-[540px]">
                {/* Skills Tab */}
                {activeTab === "skills" && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h4 className="text-lg font-semibold text-foreground mb-6">
                      Technical Proficiency
                    </h4>
                    {skills.map((skill, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-muted-foreground font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-3 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Experience Tab - Fixed timeline dots */}
                {activeTab === "experience" && (
                  <div className="space-y-6 animate-in fade-in duration-300 min-h-[540px] max-h-[540px] overflow-y-auto scrollbar-hide pl-3">
                    {experiences.map((exp, index) => (
                      <div key={index} className="relative pl-8 pb-6 group">
                        {/* Timeline line */}
                        {index !== experiences.length - 1 && (
                          <div className="absolute left-2 top-4 bottom-0 w-[2px] bg-border" />
                        )}
                        {/* Timeline dot - Fixed positioning */}
                        <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background group-hover:scale-125 transition-transform" />

                        <div className="p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors ml-2">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h5 className="text-lg font-bold text-foreground">
                              {exp.title}
                            </h5>
                            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                              {exp.duration}
                            </span>
                          </div>
                          <p className="text-primary font-medium mb-2">
                            {exp.company}
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            {exp.period}
                          </p>
                          <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education Tab - Fixed timeline dots */}
                {activeTab === "education" && (
                  <div className="space-y-6 animate-in fade-in duration-300 min-h-[540px] max-h-[540px] overflow-y-auto scrollbar-hide pl-3">
                    {education.map((edu, index) => (
                      <div key={index} className="relative pl-8 pb-6 group">
                        {/* Timeline line */}
                        {index !== education.length - 1 && (
                          <div className="absolute left-2 top-4 bottom-0 w-[2px] bg-border" />
                        )}
                        {/* Timeline dot - Fixed positioning */}
                        <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-green-500 border-4 border-background group-hover:scale-125 transition-transform" />

                        <div className="p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors ml-2">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h5 className="text-lg font-bold text-foreground">
                              {edu.degree}
                            </h5>
                            <span className="px-3 py-1 text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                              {edu.duration}
                            </span>
                          </div>
                          <p className="text-primary font-medium mb-1">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {edu.period}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications Tab - Fixed timeline dots */}
                {activeTab === "certifications" && (
                  <div className="space-y-4 animate-in fade-in duration-300 min-h-[540px] max-h-[540px] overflow-y-auto scrollbar-hide pl-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="relative pl-8 pb-4 group">
                        {/* Timeline line */}
                        {index !== certifications.length - 1 && (
                          <div className="absolute left-2 top-4 bottom-0 w-[2px] bg-border" />
                        )}
                        {/* Timeline dot - Fixed positioning */}
                        <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-violet-500 border-4 border-background group-hover:scale-125 transition-transform" />

                        <div className="p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors ml-2">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h5 className="text-base font-bold text-foreground mb-1">
                                {cert.name}
                              </h5>
                              <p className="text-sm text-primary font-medium">
                                {cert.issuer}
                              </p>
                            </div>
                            <span className="px-3 py-1 text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full whitespace-nowrap">
                              {cert.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "12+", label: "Years Experience", icon: "📅" },
            { value: "50+", label: "Projects Delivered", icon: "🚀" },
            { value: "7+", label: "Certifications", icon: "🏆" },
            { value: "100%", label: "Client Satisfaction", icon: "⭐" },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-card border border-border/50 text-center hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-5xl opacity-5 group-hover:opacity-10 transition-opacity">
                {stat.icon}
              </div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform relative">
                {stat.value}
              </p>
              <p className="text-muted-foreground font-medium relative">
                {stat.label}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
