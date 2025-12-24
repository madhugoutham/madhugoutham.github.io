import { Metadata } from "next";
import ProjectDetailClient from "./ProjectDetailClient";

// Project slugs for static generation
const projectSlugs = ["fraud-detection", "rag-credit", "environmental-ai", "real-time-scoring"];

export function generateStaticParams() {
    return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const titles: Record<string, string> = {
        "fraud-detection": "Multi-Agent Fraud Detection | Madhu Goutham",
        "rag-credit": "RAG Credit Risk Assessment | Madhu Goutham",
        "environmental-ai": "Environmental AI Mapping | Madhu Goutham",
        "real-time-scoring": "Real-Time Fraud Scoring | Madhu Goutham",
    };
    return {
        title: titles[slug] || "Project | Madhu Goutham",
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <ProjectDetailClient slug={slug} />;
}
