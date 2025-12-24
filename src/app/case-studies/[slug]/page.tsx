import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all case studies
export async function generateStaticParams() {
    return projects
        .filter((p) => p.caseStudySlug)
        .map((project) => ({
            slug: project.caseStudySlug,
        }));
}

// Generate metadata for each case study
export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.caseStudySlug === slug);

    if (!project) {
        return { title: "Case Study Not Found" };
    }

    return {
        title: `${project.title} | Case Study | Madhu Goutham`,
        description: project.shortDescription,
    };
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.caseStudySlug === slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                        <li>
                            <Link href="/" className="hover:text-[var(--foreground)]">
                                Home
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/case-studies" className="hover:text-[var(--foreground)]">
                                Case Studies
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-[var(--foreground)]">{project.title}</li>
                    </ol>
                </nav>

                {/* Header */}
                <header className="mb-12">
                    <div className="inline-block px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4 capitalize">
                        {project.category}
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        {project.title}
                    </h1>
                    <p className="text-xl text-[var(--foreground-secondary)]">
                        {project.shortDescription}
                    </p>
                </header>

                {/* Hero Image */}
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 mb-12 flex items-center justify-center">
                    <span className="text-9xl opacity-30">
                        {project.category === "finance" && "💰"}
                        {project.category === "research" && "🔬"}
                        {project.category === "ai" && "🤖"}
                        {project.category === "enterprise" && "🏢"}
                    </span>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {project.metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="card p-6 text-center"
                        >
                            <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                                {metric.value}
                            </div>
                            <div className="text-sm text-[var(--foreground-muted)]">
                                {metric.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content */}
                <article className="prose prose-invert max-w-none">
                    {/* Problem Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                                🎯
                            </span>
                            The Challenge
                        </h2>
                        <div className="card p-6 md:p-8">
                            <p className="text-[var(--foreground-secondary)] leading-relaxed">
                                {project.fullDescription}
                            </p>
                        </div>
                    </section>

                    {/* Solution Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                                ⚡
                            </span>
                            The Solution
                        </h2>
                        <div className="card p-6 md:p-8">
                            <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
                                I developed a comprehensive solution leveraging modern ML/AI techniques
                                and best practices in MLOps to address these challenges head-on.
                            </p>
                            <h3 className="font-semibold mb-3">Key Technical Approaches:</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                                    <svg className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Implemented ensemble methods combining multiple model architectures
                                </li>
                                <li className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                                    <svg className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Deployed scalable infrastructure on AWS for real-time inference
                                </li>
                                <li className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                                    <svg className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Built comprehensive monitoring and A/B testing pipelines
                                </li>
                                <li className="flex items-start gap-2 text-[var(--foreground-secondary)]">
                                    <svg className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Optimized model serving for low-latency production environments
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                                🛠️
                            </span>
                            Technology Stack
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 bg-[var(--background-secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground-secondary)] hover:border-[var(--primary)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Impact Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                                📈
                            </span>
                            The Impact
                        </h2>
                        <div className="card p-6 md:p-8 bg-gradient-to-br from-[var(--secondary)]/5 to-transparent">
                            <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
                                The solution delivered significant measurable improvements across key business metrics:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {project.metrics.map((metric, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 p-4 bg-[var(--background)] rounded-lg"
                                    >
                                        <div className="text-2xl font-bold text-[var(--secondary)]">
                                            {metric.value}
                                        </div>
                                        <div className="text-sm text-[var(--foreground-secondary)]">
                                            {metric.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </article>

                {/* Navigation */}
                <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between gap-4">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center gap-2 text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        All Case Studies
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    >
                        Discuss This Project
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
