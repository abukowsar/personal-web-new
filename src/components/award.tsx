"use client";
import { useState } from "react";
import {
  Trophy,
  GraduationCap,
  Users,
  Heart,
  Award,
  Briefcase,
  BookOpen,
  Check,
  User,
  Building2,
} from "lucide-react";

export default function Awards() {
  const [activeTab, setActiveTab] = useState("individual");

  const tabs = [
    {
      id: "individual",
      label: "Individual",
      icon: User,
      description: "Personal achievements",
    },
    {
      id: "professional",
      label: "Professional",
      icon: Building2,
      description: "Career milestones",
    },
  ];

  const individualAwards = [
    {
      icon: GraduationCap,
      title: "Scholarship",
      color: "from-blue-500 to-indigo-500",
      items: [
        "PhD in Aerospace Engineering, Kyutech-Kyushu Institute of Technology, Japan",
      ],
    },
    {
      icon: Trophy,
      title: "Awards",
      color: "from-amber-500 to-orange-500",
      featured: true,
      items: [
        "Best Academic Award — Islamic University Bangladesh, 2008",
        "Best Debater Award — IUDC, 2009",
        "Crest of Honor — FTFL Program (World Bank), 2014",
        "Best Innovation Award — Arranged by the ICT Division, 2025",
      ],
    },
    {
      icon: Users,
      title: "Conference",
      color: "from-purple-500 to-pink-500",
      items: [
        "Combating Online Harassment: A Hybrid LSTM-CNN Approach to Cyberbullying Detection - ICMLA, 2025",
        "On Handling AI Tasks in CPU with Low Latency and High Performance - ICAISC 2024",
        "Visionary Leadership for Poverty Alleviation - International Conference on Leadership 2015",
        "International Conference on the Selection of the Root and Greatest Virtue of the Quran",
      ],
    },
  ];

  const professionalAwards = [
    {
      icon: Heart,
      title: "Volunteer Experience",
      color: "from-red-500 to-rose-500",
      featured: true,
      items: [
        "Covid-19 National Strategy Team - Volunteer at a local Plasma Donation in the situation of COVID-19 to service the life saving in critical moment also mentoring for promoting the freelancers near about 1000+",
      ],
    },
    {
      icon: Award,
      title: "Membership",
      color: "from-green-500 to-teal-500",
      items: [
        "Society of Quality Assurance Active Membership-AM (2025-Present)",
        "Professional Innovation Membership GIMI-IAOIP (2025 – Present)",
        "Project Management Institute PMI-2598859 (2015 – Present)",
        "Bangladesh Computer Society AM-07943 (2009 – Present)",
      ],
    },
    {
      icon: Briefcase,
      title: "Training and Workshop",
      color: "from-cyan-500 to-blue-500",
      items: [
        "Rise of Agile: A Paradigm Shift in Management - Project Management Institute",
        "Entrepreneurship & Skill Development Project - BIDA (Prime Ministers Office)",
        "Managing Projects with Microsoft Project - Rosetta Technologies",
        "Internet of Thing (IoT) - World University of Bangladesh",
        "Innovation Workshop On Design Thinking - Cloud Camp Bangladesh",
        "Information Technology Engineers Examination (ITEE) - JICA & Ministry of ICT",
      ],
    },
  ];

  const currentAwards =
    activeTab === "individual" ? individualAwards : professionalAwards;

  return (
    <section id="awards" className="py-20 px-4 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Awards
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Recognition & Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A prize or other mark of recognition given in honour of an
            achievement
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted/50 dark:bg-muted/20 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300
                    ${
                      activeTab === tab.id
                        ? "bg-background text-primary shadow-lg"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAwards.map((award, index) => {
            const Icon = award.icon;
            return (
              <div
                key={index}
                className={`
                  group relative bg-card border rounded-xl overflow-hidden
                  transition-all duration-300 hover:shadow-xl
                  ${
                    award.featured
                      ? "border-primary/50 shadow-lg shadow-primary/10"
                      : "border-border hover:border-primary/30"
                  }
                `}
              >
                {/* Featured Badge */}
                {award.featured && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-semibold">
                    Featured
                  </div>
                )}

                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`
                      w-12 h-12 rounded-lg bg-gradient-to-br ${award.color}
                      flex items-center justify-center text-white
                      group-hover:scale-110 transition-transform duration-300
                    `}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {award.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pb-6">
                  <ul className="space-y-3">
                    {award.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex gap-3 text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Gradient Effect */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-br ${award.color} 
                  opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none
                `}
                />
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            <span>View Full CV for Complete List</span>
          </div>
        </div>
      </div>
    </section>
  );
}
