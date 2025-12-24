"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// Project Data
const projectsData: Record<string, {
    title: string;
    category: string;
    description: string;
    impact: string;
    problem: string;
    solution: string;
    technologies: string[];
    metrics: { label: string; value: number; suffix?: string }[];
    timeline: { phase: string; description: string }[];
    results: string[];
}> = {
    "fraud-detection": {
        title: "Multi-Agent Fraud Detection System",
        category: "Finance / Production ML",
        description: "Real-time ensemble model processing 250K+ daily transactions with 95% accuracy and 45ms latency.",
        impact: "$2.1M Annual Savings",
        problem: "Legacy fraud detection systems had high false positive rates (8%) and slow response times (200ms+), causing customer friction and delayed threat detection.",
        solution: "Designed a multi-agent ensemble architecture combining XGBoost, LightGBM, and neural networks with real-time feature engineering using Apache Kafka and Redis caching.",
        technologies: ["PyTorch", "XGBoost", "AWS SageMaker", "Kafka", "Redis", "Docker", "Kubernetes"],
        metrics: [
            { label: "Accuracy", value: 95, suffix: "%" },
            { label: "Latency", value: 45, suffix: "ms" },
            { label: "False Positive", value: 2.1, suffix: "%" },
            { label: "Transactions", value: 250, suffix: "K+" },
        ],
        timeline: [
            { phase: "Research & Design", description: "Analyzed existing system, identified bottlenecks, designed multi-agent architecture" },
            { phase: "Data Pipeline", description: "Built real-time feature engineering with Kafka streams and Redis caching" },
            { phase: "Model Development", description: "Trained ensemble of XGBoost, LightGBM, and neural network models" },
            { phase: "Deployment", description: "Deployed on AWS SageMaker with auto-scaling and A/B testing" },
        ],
        results: [
            "Reduced false positives from 8% to 2.1%",
            "Decreased latency from 200ms to 45ms",
            "Saved $2.1M annually in fraud losses",
            "Improved customer satisfaction by 15%",
        ],
    },
    "rag-credit": {
        title: "RAG-Enhanced Credit Risk Assessment",
        category: "GenAI / LLM",
        description: "LLM-powered system for intelligent credit risk analysis with 87% accuracy in risk factor identification.",
        impact: "87% Accuracy",
        problem: "Credit risk analysts spent 4+ hours manually reviewing unstructured financial documents, leading to inconsistent risk assessments.",
        solution: "Built a Retrieval-Augmented Generation (RAG) system using GPT-4 with Pinecone vector database for semantic search across financial documents.",
        technologies: ["LangChain", "GPT-4", "Pinecone", "FastAPI", "AWS Bedrock", "Python"],
        metrics: [
            { label: "Accuracy", value: 87, suffix: "%" },
            { label: "Speed", value: 3, suffix: "s" },
            { label: "Doc Types", value: 15, suffix: "+" },
            { label: "Time Saved", value: 75, suffix: "%" },
        ],
        timeline: [
            { phase: "Document Analysis", description: "Analyzed 15+ document types for risk factors" },
            { phase: "Vector DB Setup", description: "Built Pinecone index with chunked embeddings" },
            { phase: "RAG Pipeline", description: "Integrated LangChain with GPT-4 for context-aware analysis" },
            { phase: "API Development", description: "Built FastAPI backend with async processing" },
        ],
        results: [
            "Achieved 87% accuracy in risk identification",
            "Reduced analysis time from 4 hours to 3 seconds",
            "Processed 15+ document formats automatically",
            "Enabled explainable AI with source citations",
        ],
    },
    "environmental-ai": {
        title: "AI-Driven Environmental Mapping",
        category: "Computer Vision / Research",
        description: "Award-winning U-Net++ CNN for surface water detection achieving 93.6% F1-score. Won 3rd prize at IIN 2024.",
        impact: "93.6% F1-Score",
        problem: "Manual satellite image analysis for water body detection was time-consuming and inconsistent, hindering flood risk assessment.",
        solution: "Developed U-Net++ architecture with attention gates for precise water body segmentation from Sentinel-2 satellite imagery.",
        technologies: ["PyTorch", "U-Net++", "Google Earth Engine", "TensorFlow", "GeoPandas"],
        metrics: [
            { label: "F1-Score", value: 93.6, suffix: "%" },
            { label: "AUC", value: 92, suffix: "%" },
            { label: "IoU", value: 88, suffix: "%" },
            { label: "Images", value: 100, suffix: "K+" },
        ],
        timeline: [
            { phase: "Data Collection", description: "Curated USS-Water dataset from Sentinel-2 imagery" },
            { phase: "Model Architecture", description: "Designed U-Net++ with attention mechanisms" },
            { phase: "Training", description: "Trained on GCP with data augmentation" },
            { phase: "Publication", description: "Published in IAHS journal, won 3rd prize IIN" },
        ],
        results: [
            "Published research in IAHS journal",
            "Won 3rd prize at IIN 2024 Sustainability Conference",
            "Created USS-Water dataset for research community",
            "Enabled automated flood risk assessment",
        ],
    },
    "real-time-scoring": {
        title: "Real-Time Fraud Scoring at Scale",
        category: "Finance / Streaming",
        description: "High-throughput fraud scoring system processing 50M monthly events with 99ms latency at Experian.",
        impact: "$2.3M Saved",
        problem: "Existing batch processing couldn't keep up with transaction volumes, causing delayed fraud detection and increased losses.",
        solution: "Built streaming architecture with Apache Flink for real-time feature computation and TensorFlow Serving for model inference.",
        technologies: ["Python", "Apache Flink", "Kubernetes", "TensorFlow Serving", "AWS"],
        metrics: [
            { label: "Events", value: 50, suffix: "M" },
            { label: "Latency", value: 99, suffix: "ms" },
            { label: "Reduction", value: 38, suffix: "%" },
            { label: "Savings", value: 2.3, suffix: "M" },
        ],
        timeline: [
            { phase: "Architecture Design", description: "Designed streaming pipeline with Flink" },
            { phase: "Feature Engineering", description: "Built real-time feature store" },
            { phase: "Model Optimization", description: "Quantized models for low-latency inference" },
            { phase: "Scale Testing", description: "Load tested to 100M events/month capacity" },
        ],
        results: [
            "Processed 50M monthly events in real-time",
            "Achieved 99ms average latency",
            "Reduced fraud losses by 38%",
            "Saved $2.3M annually",
        ],
    },
};

// Hooks
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return { ref, isVisible };
}

function useCountUp(target: number, duration = 2000, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(target * (1 - Math.pow(1 - progress, 4)));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
}

// Components
function MetricCard({ metric, index }: { metric: { label: string; value: number; suffix?: string }; index: number }) {
    const { ref, isVisible } = useScrollReveal();
    const count = useCountUp(metric.value, 1500, isVisible);

    return (
        <div ref={ref} className="bg-[var(--background-secondary)] rounded-2xl p-8 border border-[var(--border)] text-center transition-all hover:border-[var(--accent)]/50" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="text-4xl md:text-5xl font-bold text-[var(--accent)] mb-3">
                {count.toFixed(metric.value % 1 === 0 ? 0 : 1)}{metric.suffix}
            </div>
            <div className="text-sm text-[var(--foreground-secondary)]">{metric.label}</div>
        </div>
    );
}

function BarChart({ data }: { data: { label: string; value: number }[] }) {
    const { ref, isVisible } = useScrollReveal();
    const max = Math.max(...data.map(d => d.value));

    return (
        <div ref={ref} className="space-y-6">
            {data.map((item, i) => (
                <div key={item.label} className="flex items-center gap-4">
                    <div className="w-28 text-sm text-[var(--foreground-secondary)] text-right">{item.label}</div>
                    <div className="flex-1 h-10 bg-[var(--background-tertiary)] rounded-xl overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] rounded-xl flex items-center justify-end pr-4 transition-all duration-1000 ease-out"
                            style={{ width: isVisible ? `${(item.value / max) * 100}%` : "0%", transitionDelay: `${i * 0.15}s` }}
                        >
                            <span className="text-sm font-bold text-white">{item.value}{item.value < 100 ? (item.value < 10 ? "s" : "%") : "%"}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function Timeline({ items }: { items: { phase: string; description: string }[] }) {
    const { ref, isVisible } = useScrollReveal();

    return (
        <div ref={ref} className="relative">
            <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-light)]" />
            {items.map((item, i) => (
                <div key={i} className={`relative pl-14 pb-10 last:pb-0 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} style={{ transitionDelay: `${i * 0.15}s` }}>
                    <div className="absolute left-2.5 w-6 h-6 bg-[var(--accent)] rounded-full border-4 border-[var(--background)] flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{i + 1}</span>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{item.phase}</h4>
                    <p className="text-[var(--foreground-secondary)] leading-relaxed">{item.description}</p>
                </div>
            ))}
        </div>
    );
}

export default function ProjectDetailClient({ slug }: { slug: string }) {
    const project = projectsData[slug];

    useEffect(() => {
        // Apply theme from localStorage
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) {
            document.documentElement.setAttribute("data-theme", saved);
        }
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

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Header */}
            <header className="border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/90 backdrop-blur-xl z-50">
                <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Portfolio
                    </Link>
                    <span className="px-4 py-1.5 text-xs rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-medium">{project.category}</span>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-16">
                {/* Hero */}
                <section className="mb-20">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{project.title}</h1>
                    <p className="text-xl text-[var(--foreground-secondary)] mb-8 max-w-3xl leading-relaxed">{project.description}</p>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--accent)]/10 rounded-full text-[var(--accent)] font-semibold text-lg">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Impact: {project.impact}
                    </div>
                </section>

                {/* Metrics */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-10">Key Metrics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {project.metrics.map((metric, i) => (
                            <MetricCard key={metric.label} metric={metric} index={i} />
                        ))}
                    </div>
                </section>

                {/* Performance Visualization */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-10">Performance Breakdown</h2>
                    <div className="bg-[var(--background-secondary)] rounded-3xl p-10 border border-[var(--border)]">
                        <BarChart data={project.metrics.map(m => ({ label: m.label, value: m.value }))} />
                    </div>
                </section>

                {/* Problem & Solution */}
                <section className="mb-20 grid md:grid-cols-2 gap-8">
                    <div className="bg-[var(--background-secondary)] rounded-3xl p-10 border border-[var(--border)]">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 text-xl">!</span>
                            The Problem
                        </h3>
                        <p className="text-[var(--foreground-secondary)] leading-relaxed text-lg">{project.problem}</p>
                    </div>
                    <div className="bg-[var(--background-secondary)] rounded-3xl p-10 border border-[var(--border)]">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 text-xl">✓</span>
                            The Solution
                        </h3>
                        <p className="text-[var(--foreground-secondary)] leading-relaxed text-lg">{project.solution}</p>
                    </div>
                </section>

                {/* Timeline */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-10">Development Timeline</h2>
                    <div className="bg-[var(--background-secondary)] rounded-3xl p-10 border border-[var(--border)]">
                        <Timeline items={project.timeline} />
                    </div>
                </section>

                {/* Results */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-10">Key Results</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {project.results.map((result, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 bg-[var(--background-secondary)] rounded-2xl border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors">
                                <span className="w-8 h-8 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] flex-shrink-0">✓</span>
                                <span className="text-[var(--foreground-secondary)] text-lg leading-relaxed">{result}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-10">Technology Stack</h2>
                    <div className="flex flex-wrap gap-4">
                        {project.technologies.map((tech) => (
                            <span key={tech} className="px-5 py-2.5 bg-[var(--background-tertiary)] border border-[var(--border)] rounded-full text-sm font-medium hover:border-[var(--accent)]/50 transition-colors">
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-16 border-t border-[var(--border)]">
                    <h3 className="text-2xl font-bold mb-6">Interested in similar solutions?</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/#contact" className="btn-primary">
                            Get in Touch
                        </Link>
                        <Link href="/" className="btn-secondary">
                            View More Projects
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
