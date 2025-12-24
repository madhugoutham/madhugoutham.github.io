"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const BASE_PATH = "/portfolios";

// Detailed project case studies
const projectsData: Record<string, {
    title: string;
    tagline: string;
    category: string;
    overview: string;
    problem: { title: string; description: string; painPoints: string[] };
    approach: { title: string; description: string; steps: string[] };
    techDecisions: { question: string; answer: string }[];
    architecture: { description: string };
    metrics: { label: string; value: string; description: string }[];
    results: string[];
    lessonsLearned: string[];
    technologies: string[];
    github?: string;
    timeline: string;
}> = {
    "fraud-detection": {
        title: "Multi-Agent Fraud Detection System",
        tagline: "Real-time ensemble model saving $2.1M annually",
        category: "Production ML",
        timeline: "6 months",
        overview: "Built a production fraud detection system processing 250K+ daily transactions with 95% accuracy and 45ms latency, saving $2.1M annually in prevented fraud losses.",
        problem: {
            title: "The Challenge",
            description: "The legacy rule-based fraud detection system was failing to catch sophisticated fraud patterns while generating too many false positives, causing significant customer friction.",
            painPoints: [
                "15% false positive rate causing customer complaints",
                "200ms+ latency missing time-sensitive fraud",
                "Rule-based system couldn't adapt to new fraud patterns",
                "$3M+ annual losses from undetected fraud",
            ],
        },
        approach: {
            title: "My Approach",
            description: "I designed a multi-agent ensemble architecture that combines the strengths of different model types while maintaining explainability for compliance.",
            steps: [
                "Analyzed 6 months of transaction data to identify fraud patterns",
                "Built baseline XGBoost model achieving 85% accuracy",
                "Added LSTM for sequential pattern detection",
                "Integrated rule-based layer for known fraud signatures",
                "Implemented voting mechanism with confidence thresholds",
                "Deployed on AWS SageMaker with real-time inference",
            ],
        },
        techDecisions: [
            { question: "Why ensemble instead of a single deep learning model?", answer: "Single models overfit to specific fraud patterns. The ensemble captures rule-based known patterns, tree-based feature interactions, and sequential behaviors—each model catches what others miss." },
            { question: "Why Kafka for streaming?", answer: "Need sub-100ms end-to-end latency. Kafka's partition-based architecture handles 50K+ TPS while maintaining ordering for session-based fraud detection." },
            { question: "Why not just deep learning?", answer: "Regulatory compliance requires explainability. XGBoost provides feature importance, and the rule layer gives clear audit trails. Pure DL is a black box." },
        ],
        architecture: {
            description: "Event-driven architecture with Kafka ingestion → Real-time feature engineering → Model ensemble (XGBoost + LSTM + Rules) → Voting/scoring → Action (approve/deny/review)",
        },
        metrics: [
            { label: "Accuracy", value: "95%", description: "Up from 82% with legacy system" },
            { label: "Latency", value: "45ms", description: "Down from 200ms+" },
            { label: "False Positives", value: "2.1%", description: "Down from 15%" },
            { label: "Annual Savings", value: "$2.1M", description: "Prevented fraud losses" },
        ],
        results: [
            "Reduced false positives from 15% to 2.1% — improving customer experience",
            "Decreased latency from 200ms to 45ms — enabling real-time decisioning",
            "Saved $2.1M annually in fraud losses",
            "Improved customer satisfaction scores by 15%",
            "System handles 250K+ daily transactions with 99.9% uptime",
        ],
        lessonsLearned: [
            "Start with explainable models before adding complexity — compliance teams need to understand decisions",
            "Feature engineering matters more than model architecture — 60% of accuracy gains came from features",
            "Monitor for data drift aggressively — fraud patterns change monthly",
            "Build feedback loops — false positive reviews improved model by 8%",
        ],
        technologies: ["PyTorch", "XGBoost", "Apache Kafka", "Redis", "AWS SageMaker", "Docker", "Kubernetes"],
        github: "https://github.com/madhugoutham",
    },
    "rag-credit": {
        title: "RAG-Enhanced Credit Risk Assessment",
        tagline: "LLM-powered document analysis with 87% accuracy",
        category: "GenAI / LLM",
        timeline: "4 months",
        overview: "Built a Retrieval-Augmented Generation system for credit risk analysis, reducing document review time from 4+ hours to 3 seconds while maintaining 87% accuracy in risk factor identification.",
        problem: {
            title: "The Challenge",
            description: "Credit analysts spent excessive time manually reviewing unstructured financial documents, leading to inconsistent risk assessments and bottlenecks in the approval pipeline.",
            painPoints: [
                "4+ hours per application for document review",
                "Inconsistent risk assessments between analysts",
                "15+ document types with different formats",
                "No audit trail for risk factor identification",
            ],
        },
        approach: {
            title: "My Approach",
            description: "I built a RAG pipeline that retrieves relevant context from financial documents and uses GPT-4 to identify risk factors with explainable citations.",
            steps: [
                "Analyzed 15+ document types for risk factor patterns",
                "Built document chunking strategy optimized for financial content",
                "Created Pinecone vector index with semantic embeddings",
                "Designed prompt templates for consistent risk extraction",
                "Implemented citation system for explainability",
                "Built FastAPI backend with async processing",
            ],
        },
        techDecisions: [
            { question: "Why RAG instead of fine-tuning?", answer: "Regulatory compliance requires explainability. RAG provides source citations — we can show exactly which document section led to each risk factor. Fine-tuning is a black box." },
            { question: "Why Pinecone over building our own?", answer: "Managed vector DB with sub-50ms retrieval at scale. Building our own would take 3+ months and require ongoing maintenance. Time-to-market was critical." },
            { question: "Why GPT-4 over open-source models?", answer: "For financial risk assessment, accuracy is non-negotiable. GPT-4's reasoning capability was 15% better than Llama-2-70B in our benchmarks." },
        ],
        architecture: {
            description: "Document ingestion → Chunking (500 tokens with 50 overlap) → Embedding (Ada-002) → Pinecone storage → Query → Semantic retrieval → GPT-4 analysis → Risk report with citations",
        },
        metrics: [
            { label: "Accuracy", value: "87%", description: "Risk factor identification" },
            { label: "Processing", value: "3s", description: "Per document" },
            { label: "Time Saved", value: "75%", description: "Analyst productivity" },
            { label: "Doc Types", value: "15+", description: "Formats supported" },
        ],
        results: [
            "Achieved 87% accuracy in risk factor identification",
            "Reduced analysis time from 4 hours to 3 seconds per application",
            "Processed 15+ document formats automatically",
            "Enabled explainable AI with source citations for every risk factor",
            "Improved consistency across analysts by 40%",
        ],
        lessonsLearned: [
            "Chunk size and overlap matter enormously — wrong settings caused 20% accuracy drop",
            "Prompt engineering is iterative — spent 2 weeks refining templates",
            "Always include citations — it builds trust and enables review",
            "Test with edge cases early — unusual document formats broke initial system",
        ],
        technologies: ["LangChain", "GPT-4", "Pinecone", "FastAPI", "AWS Bedrock", "Python"],
        github: "https://github.com/madhugoutham",
    },
    "environmental-ai": {
        title: "AI-Driven Environmental Mapping",
        tagline: "Award-winning satellite imagery analysis",
        category: "Computer Vision",
        timeline: "12 months (research)",
        overview: "Developed a U-Net++ CNN for surface water detection from Sentinel-2 satellite imagery, achieving 93.6% F1-score. Published in IAHS journal and won 3rd prize at IIN 2024 Sustainability Conference.",
        problem: {
            title: "The Challenge",
            description: "Manual satellite image analysis for water body detection was slow, inconsistent, and couldn't scale to the needs of climate monitoring and flood risk assessment.",
            painPoints: [
                "Manual analysis took weeks for large regions",
                "Inconsistent annotations between experts",
                "No standardized dataset for water detection",
                "Existing models failed on complex water boundaries",
            ],
        },
        approach: {
            title: "My Approach",
            description: "I developed a U-Net++ architecture with attention gates specifically designed for precise water body segmentation from satellite imagery.",
            steps: [
                "Curated USS-Water dataset from Sentinel-2 imagery",
                "Designed U-Net++ with nested skip connections",
                "Added attention gates for boundary precision",
                "Implemented data augmentation for rare water patterns",
                "Trained on GCP with hyperparameter optimization",
                "Published dataset for research community",
            ],
        },
        techDecisions: [
            { question: "Why U-Net++ over vanilla U-Net?", answer: "Nested skip connections capture fine-grained boundaries better. Water edges are often diffuse — the dense connections improved IoU by 12% over U-Net." },
            { question: "Why Sentinel-2 specifically?", answer: "Free, global coverage, 10m resolution, and 12 spectral bands including NIR which is critical for water detection. Commercial options weren't viable at scale." },
            { question: "Why attention gates?", answer: "Allows model to focus on relevant features at each skip level. Particularly useful for distinguishing water from shadows and wet soil." },
        ],
        architecture: {
            description: "Sentinel-2 tiles → Preprocessing (cloud masking, normalization) → U-Net++ with attention → Post-processing (CRF refinement) → Water mask output",
        },
        metrics: [
            { label: "F1-Score", value: "93.6%", description: "Water detection accuracy" },
            { label: "AUC", value: "0.92", description: "Classification performance" },
            { label: "IoU", value: "88%", description: "Segmentation quality" },
            { label: "Images", value: "100K+", description: "Processed successfully" },
        ],
        results: [
            "Achieved 93.6% F1-score, state-of-the-art for water detection",
            "Published research in IAHS journal (peer-reviewed)",
            "Won 3rd prize at IIN 2024 Sustainability Conference",
            "Created USS-Water dataset now used by 10+ research groups",
            "Enabled automated flood risk assessment at scale",
        ],
        lessonsLearned: [
            "Dataset quality > model complexity — most gains came from careful curation",
            "Domain-specific augmentation is crucial — random augmentation hurt performance",
            "Publish datasets, not just papers — USS-Water had more impact than the model",
            "Engage with domain experts — hydrologists caught errors we missed",
        ],
        technologies: ["PyTorch", "U-Net++", "Google Earth Engine", "TensorFlow", "GeoPandas"],
        github: "https://github.com/madhugoutham",
    },
    "real-time-scoring": {
        title: "Real-Time Fraud Scoring at Scale",
        tagline: "50M monthly events with 99ms latency",
        category: "Streaming ML",
        timeline: "8 months",
        overview: "Built a high-throughput fraud scoring system processing 50M monthly events with 99ms average latency at Experian, reducing fraud losses by 38% and saving $2.3M annually.",
        problem: {
            title: "The Challenge",
            description: "Batch processing couldn't keep up with transaction volumes. By the time models scored transactions, fraud had already occurred.",
            painPoints: [
                "Batch jobs ran every 4 hours — fraud happened in minutes",
                "Peak load caused 10+ minute delays",
                "No real-time feature aggregations available",
                "Model serving couldn't handle throughput requirements",
            ],
        },
        approach: {
            title: "My Approach",
            description: "I designed a streaming architecture with Apache Flink for real-time feature computation and optimized model serving for low-latency inference.",
            steps: [
                "Designed streaming pipeline architecture with Flink",
                "Built real-time feature store with Redis",
                "Implemented model quantization for low-latency inference",
                "Created auto-scaling infrastructure with Kubernetes",
                "Built monitoring and alerting for drift detection",
                "Load tested to 100M events/month capacity",
            ],
        },
        techDecisions: [
            { question: "Why Flink over Spark Streaming?", answer: "True event-time processing with exactly-once semantics. Financial applications can't tolerate duplicates or missed events. Flink's watermarks handle late-arriving data correctly." },
            { question: "Why model quantization?", answer: "INT8 inference reduced latency by 60% with less than 1% accuracy loss. At 50M events/month, every millisecond of latency costs money." },
            { question: "Why Redis for feature store?", answer: "Sub-millisecond reads for real-time feature retrieval. Feature aggregations (7-day averages, etc.) are pre-computed and cached." },
        ],
        architecture: {
            description: "Kafka ingestion → Flink feature computation → Redis feature store → TensorFlow Serving (quantized) → Kafka output → Downstream systems",
        },
        metrics: [
            { label: "Events", value: "50M/mo", description: "Processing capacity" },
            { label: "Latency", value: "99ms", description: "P99 response time" },
            { label: "Fraud Reduction", value: "38%", description: "Year-over-year" },
            { label: "Annual Savings", value: "$2.3M", description: "Prevented losses" },
        ],
        results: [
            "Processed 50M monthly events in real-time",
            "Achieved 99ms P99 latency (down from 4+ hours batch)",
            "Reduced fraud losses by 38% year-over-year",
            "Saved $2.3M annually in prevented fraud",
            "System scaled to handle Black Friday 3x peak load",
        ],
        lessonsLearned: [
            "Streaming is a different paradigm — batch patterns don't transfer",
            "Exactly-once semantics are hard but essential for finance",
            "Feature store is the secret weapon — real-time features changed everything",
            "Monitor everything — we caught 3 critical issues in the first month",
        ],
        technologies: ["Python", "Apache Flink", "Apache Kafka", "TensorFlow Serving", "Kubernetes", "Redis"],
        github: "https://github.com/madhugoutham",
    },
};

// Hooks
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return { ref, isVisible };
}

function useCountUp(target: number, duration = 1500, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        const numericValue = parseFloat(target.toString());
        if (isNaN(numericValue)) return;
        let startTime: number;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(numericValue * (1 - Math.pow(1 - progress, 4)));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const { ref, isVisible } = useScrollReveal();
    return <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

function MetricCard({ metric, index }: { metric: { label: string; value: string; description: string }; index: number }) {
    const { ref, isVisible } = useScrollReveal();
    const numericValue = parseFloat(metric.value);
    const count = useCountUp(isNaN(numericValue) ? 0 : numericValue, 1500, isVisible);
    const displayValue = isNaN(numericValue) ? metric.value : `${count.toFixed(numericValue % 1 === 0 ? 0 : 1)}${metric.value.replace(/[\d.]/g, '')}`;

    return (
        <div ref={ref} className="bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)] text-center" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="text-3xl md:text-4xl font-bold text-[var(--accent)] mb-2">{displayValue}</div>
            <div className="font-medium mb-1">{metric.label}</div>
            <div className="text-xs text-[var(--foreground-muted)]">{metric.description}</div>
        </div>
    );
}

export default function ProjectDetailClient({ slug }: { slug: string }) {
    const project = projectsData[slug];

    useEffect(() => {
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) document.documentElement.setAttribute("data-theme", saved);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/" className="text-[var(--accent)] hover:underline">← Back to Portfolio</Link>
                </div>
            </div>
        );
    }

    const categoryColors: Record<string, string> = {
        "Production ML": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "GenAI / LLM": "bg-purple-500/10 text-purple-400 border-purple-500/20",
        "Computer Vision": "bg-green-500/10 text-green-400 border-green-500/20",
        "Streaming ML": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    };

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Header */}
            <header className="border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/95 backdrop-blur-xl z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Portfolio
                    </Link>
                    <span className={`px-3 py-1 text-xs rounded-full border font-medium ${categoryColors[project.category] || "bg-[var(--accent)]/10 text-[var(--accent)]"}`}>
                        {project.category}
                    </span>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Hero */}
                <RevealSection>
                    <section className="mb-16">
                        <div className="flex items-center gap-3 text-sm text-[var(--foreground-muted)] mb-4">
                            <span>Case Study</span>
                            <span>•</span>
                            <span>{project.timeline}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{project.title}</h1>
                        <p className="text-xl text-[var(--foreground-secondary)] mb-6">{project.tagline}</p>
                        <p className="text-[var(--foreground-secondary)] leading-relaxed max-w-3xl">{project.overview}</p>
                    </section>
                </RevealSection>

                {/* Metrics */}
                <RevealSection delay={0.1}>
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">Key Results</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {project.metrics.map((metric, i) => (
                                <MetricCard key={metric.label} metric={metric} index={i} />
                            ))}
                        </div>
                    </section>
                </RevealSection>

                {/* Problem */}
                <RevealSection delay={0.2}>
                    <section className="mb-16">
                        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400 text-xl">!</span>
                                <h2 className="text-2xl font-bold">{project.problem.title}</h2>
                            </div>
                            <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">{project.problem.description}</p>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {project.problem.painPoints.map((point, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-[var(--background)] rounded-lg">
                                        <span className="text-red-400">✗</span>
                                        <span className="text-sm text-[var(--foreground-secondary)]">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </RevealSection>

                {/* Approach */}
                <RevealSection delay={0.3}>
                    <section className="mb-16">
                        <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 text-xl">✓</span>
                                <h2 className="text-2xl font-bold">{project.approach.title}</h2>
                            </div>
                            <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">{project.approach.description}</p>
                            <div className="space-y-3">
                                {project.approach.steps.map((step, i) => (
                                    <div key={i} className="flex items-start gap-4 p-3 bg-[var(--background)] rounded-lg">
                                        <span className="w-6 h-6 bg-[var(--accent)] rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0">{i + 1}</span>
                                        <span className="text-sm text-[var(--foreground-secondary)]">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </RevealSection>

                {/* Tech Decisions */}
                <RevealSection delay={0.4}>
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">Technical Decisions</h2>
                        <div className="space-y-4">
                            {project.techDecisions.map((decision, i) => (
                                <div key={i} className="bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)]">
                                    <h3 className="font-bold text-[var(--accent)] mb-2">{decision.question}</h3>
                                    <p className="text-[var(--foreground-secondary)] leading-relaxed">{decision.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </RevealSection>

                {/* Architecture */}
                <RevealSection delay={0.5}>
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">Architecture</h2>
                        <div className="bg-[var(--background-secondary)] rounded-2xl p-8 border border-[var(--border)]">
                            <p className="text-[var(--foreground-secondary)] leading-relaxed font-mono text-sm">{project.architecture.description}</p>
                        </div>
                    </section>
                </RevealSection>

                {/* Results */}
                <RevealSection delay={0.6}>
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">Results</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {project.results.map((result, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 bg-[var(--background-secondary)] rounded-xl border border-[var(--border)]">
                                    <span className="w-6 h-6 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] flex-shrink-0">✓</span>
                                    <span className="text-[var(--foreground-secondary)]">{result}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </RevealSection>

                {/* Lessons Learned */}
                <RevealSection delay={0.7}>
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">Lessons Learned</h2>
                        <div className="bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-2xl p-8">
                            <div className="space-y-4">
                                {project.lessonsLearned.map((lesson, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <span className="text-2xl">💡</span>
                                        <p className="text-[var(--foreground-secondary)] leading-relaxed">{lesson}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </RevealSection>

                {/* Tech Stack */}
                <RevealSection delay={0.8}>
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
                        <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="px-4 py-2 bg-[var(--background-tertiary)] border border-[var(--border)] rounded-full text-sm font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>
                </RevealSection>

                {/* CTA */}
                <RevealSection delay={0.9}>
                    <section className="text-center py-12 border-t border-[var(--border)]">
                        <h3 className="text-xl font-bold mb-4">Interested in similar solutions?</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                                Schedule a Call
                            </a>
                            <Link href="/" className="btn-secondary">
                                View More Projects
                            </Link>
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                                    View on GitHub
                                </a>
                            )}
                        </div>
                    </section>
                </RevealSection>
            </div>
        </main>
    );
}
