"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Layers,
  Rocket,
  Target,
} from "lucide-react";

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
  overview?: string;
  keyFeatures?: string[];
  methodology?: string;
  metrics?: string[];
  roadmap?: string;
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
    overview:
      "Misinformation spreads fastest in languages that mainstream fact-checking tools ignore. This model was built to close that gap for Bengali: it reads a claim pulled from a news article, Facebook post, or forwarded message, and returns a calibrated veracity score (True / False / Misleading / Unverified) along with the supporting evidence it matched against. It's the classification engine behind Khoj-BD, the first Bangla-language automated fact-checking platform.",
    keyFeatures: [
      "Claim extraction from raw, informal Bengali text (including transliterated and code-mixed input)",
      "Evidence retrieval against a continuously updated archive of verified Bengali fact-checks and news sources",
      "Four-way veracity classification with a confidence score, not just a binary true/false label",
      "Sub-second inference, fast enough for real-time checking inside a chat or browser-extension workflow",
    ],
    methodology:
      "The model fine-tunes XLM-RoBERTa's multilingual encoder on a Bengali-specific claim-verification task, using a retrieval-augmented setup: a claim is first matched against a vector index of verified fact-check archives and news reports, and the retrieved evidence is fed alongside the claim into the classification head. Training data was hand-verified in partnership with Bengali-language fact-checkers to avoid the label noise that sinks most non-English NLP projects.",
    metrics: [
      "94% F1 score on the held-out verification benchmark",
      "91% precision on the 'False' class, the highest-stakes category for a fact-checking tool",
      "< 800ms average inference latency per claim, including evidence retrieval",
    ],
    roadmap:
      "Next milestones: extending coverage to image-based misinformation (screenshots of fabricated headlines) and a public API so newsrooms and civic-tech projects can integrate verification directly into their own tools.",
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
    overview:
      "Most large language models treat Bengali as an afterthought, trained on a sliver of multilingual data and prone to breaking down on idiom, script mixing, and regional dialects. Bangla LLM is a generative model built specifically for Bengali as a first-class language, powering the Bangla AI platform's conversation, translation, and writing-assistant features for over 260 million Bengali speakers.",
    keyFeatures: [
      "Natural, context-aware Bengali conversation that holds up across formal and colloquial registers",
      "Bidirectional Bengali ↔ English translation tuned for meaning, not literal word substitution",
      "Long-document summarization for Bengali news, reports, and academic text",
      "Instruction-following for everyday writing tasks: drafting, rephrasing, and tone adjustment in Bengali",
    ],
    methodology:
      "Built on a decoder-only transformer architecture and instruction-tuned in two stages: broad pre-training on a large-scale Bengali web corpus to build fluency, followed by supervised fine-tuning on curated instruction/response pairs covering conversation, translation, and summarization tasks. Particular attention went into tokenizer design, since off-the-shelf multilingual tokenizers fragment Bengali script inefficiently and quietly hurt quality.",
    metrics: [
      "Outperforms general-purpose multilingual baselines on the internal Bengali benchmark suite (conversation coherence, translation accuracy, summarization quality)",
      "Meaningfully lower token fragmentation on Bengali script versus off-the-shelf multilingual tokenizers, directly improving both cost and fluency",
    ],
    roadmap:
      "Actively expanding instruction-tuning data for domain-specific use cases (legal, educational, and customer-support Bengali), with retrieval-augmented generation planned to ground responses in verified sources.",
  },
];

export default function Models() {
  const [models, setModels] = useState<Model[]>(fallbackModels);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

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

  if (selectedModel) {
    const hasLive = selectedModel.liveUrl && selectedModel.liveUrl !== "#";
    const hasGithub = selectedModel.githubUrl && selectedModel.githubUrl !== "#";

    return (
      <section id="models" className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedModel(null)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Models
          </button>

          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {selectedModel.category}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {selectedModel.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            {selectedModel.overview || selectedModel.description}
          </p>

          {selectedModel.keyFeatures && selectedModel.keyFeatures.length > 0 && (
            <div className="mb-10">
              <h3 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
                <Layers className="w-5 h-5 text-accent" />
                Key Features
              </h3>
              <ul className="space-y-3">
                {selectedModel.keyFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-accent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-2.5 text-sm mb-1">
                <Cpu className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <p className="font-semibold text-foreground">Architecture</p>
              </div>
              <p className="text-sm text-muted-foreground">{selectedModel.architecture}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-2.5 text-sm mb-1">
                <Database className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <p className="font-semibold text-foreground">Training Data</p>
              </div>
              <p className="text-sm text-muted-foreground">{selectedModel.trainingData}</p>
            </div>
          </div>

          {selectedModel.methodology && (
            <div className="mb-10">
              <h3 className="flex items-center gap-2 text-xl font-bold text-foreground mb-3">
                <BrainCircuit className="w-5 h-5 text-accent" />
                Methodology
              </h3>
              <p className="text-muted-foreground leading-relaxed">{selectedModel.methodology}</p>
            </div>
          )}

          {selectedModel.metrics && selectedModel.metrics.length > 0 && (
            <div className="mb-10">
              <h3 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
                <Target className="w-5 h-5 text-accent" />
                Performance
              </h3>
              <ul className="space-y-3">
                {selectedModel.metrics.map((metric, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-accent shrink-0" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-10 rounded-xl border border-border bg-card p-5">
            <div className="flex items-start gap-2.5 text-sm mb-1">
              <BrainCircuit className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <p className="font-semibold text-foreground">Use Case</p>
            </div>
            <p className="text-sm text-muted-foreground">{selectedModel.useCase}</p>
          </div>

          {selectedModel.roadmap && (
            <div className="mb-10">
              <h3 className="flex items-center gap-2 text-xl font-bold text-foreground mb-3">
                <Rocket className="w-5 h-5 text-accent" />
                What&apos;s Next
              </h3>
              <p className="text-muted-foreground leading-relaxed">{selectedModel.roadmap}</p>
            </div>
          )}

          {selectedModel.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {selectedModel.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {(hasLive || hasGithub) && (
            <div className="flex gap-3">
              {hasLive && (
                <a
                  href={selectedModel.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              )}
              {hasGithub && (
                <a
                  href={selectedModel.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

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
                  <button
                    onClick={() => setSelectedModel(model)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Layers className="w-4 h-4" />
                    View Details
                  </button>
                  {model.liveUrl && model.liveUrl !== "#" && (
                    <a
                      href={model.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
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
