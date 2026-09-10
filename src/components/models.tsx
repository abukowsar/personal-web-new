"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, Cpu, Database, ExternalLink, Github, Target } from "lucide-react";

type Model = {
  id?: string;
  title: string;
  description: string;
  category: string;
  architecture: string;
  trainingData: string;
  performance: string;
  useCase: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
};

const fallbackModels: Model[] = [
  {
    title: "Bangla Fact-Verification Model",
    description:
      "An NLP classification model that scores the veracity of claims made in Bengali news and social media posts, powering the Khoj-BD fact-checking platform.",
    category: "NLP",
    architecture: "Fine-tuned XLM-RoBERTa (transformer encoder)",
    trainingData: "50K+ hand-verified Bengali news claims and fact-check archives",
    performance: "94% F1 score on held-out verification benchmark",
    useCase: "Real-time claim verification for the Khoj-BD platform",
    tags: ["NLP", "Bengali", "Transformers", "PyTorch"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Bangla LLM",
    description:
      "A generative language model tuned for Bengali, supporting conversation, translation, summarization, and text generation for the Bangla AI platform.",
    category: "LLM",
    architecture: "Decoder-only transformer, instruction-tuned",
    trainingData: "Large-scale Bengali web corpus plus curated instruction pairs",
    performance: "Outperforms baseline models on internal Bengali benchmark suite",
    useCase: "Conversational AI, translation, and text generation in Bengali",
    tags: ["LLM", "Bengali", "Generative AI"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export default function Models() {
  const [models, setModels] = useState<Model[]>(fallbackModels);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const response = await fetch("/api/content/models");
        const data = await response.json();

        if (Array.isArray(data.items) && data.items.length > 0) {
          setModels(data.items);
        }
      } catch (error) {
        console.error("Unable to load models:", error);
      }
    };

    loadModels();
  }, []);

  return (
    <section id="models" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            AI / ML
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Models
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Machine learning models I&apos;ve built and deployed, from architecture and
            training data to real-world performance and use case.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {models.map((model) => (
            <div
              key={model.id || model.title}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-all hover:shadow-lg"
            >
              <div className="relative h-40 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent overflow-hidden">
                {model.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={model.imageUrl}
                    alt={model.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <BrainCircuit className="h-14 w-14 text-accent/40" />
                  </div>
                )}
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground rounded-lg text-xs font-semibold">
                  {model.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {model.title}
                </h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  {model.description}
                </p>

                <div className="space-y-3 mb-5 rounded-lg border border-border bg-background/60 p-4">
                  {model.architecture && (
                    <div className="flex items-start gap-2.5 text-sm">
                      <Cpu className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Architecture</p>
                        <p className="text-muted-foreground">{model.architecture}</p>
                      </div>
                    </div>
                  )}
                  {model.trainingData && (
                    <div className="flex items-start gap-2.5 text-sm">
                      <Database className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Training Data</p>
                        <p className="text-muted-foreground">{model.trainingData}</p>
                      </div>
                    </div>
                  )}
                  {model.performance && (
                    <div className="flex items-start gap-2.5 text-sm">
                      <Target className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Performance</p>
                        <p className="text-muted-foreground">{model.performance}</p>
                      </div>
                    </div>
                  )}
                  {model.useCase && (
                    <div className="flex items-start gap-2.5 text-sm">
                      <BrainCircuit className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Use Case</p>
                        <p className="text-muted-foreground">{model.useCase}</p>
                      </div>
                    </div>
                  )}
                </div>

                {model.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {model.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  {model.liveUrl && model.liveUrl !== "#" && (
                    <a
                      href={model.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                  {model.githubUrl && model.githubUrl !== "#" && (
                    <a
                      href={model.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
