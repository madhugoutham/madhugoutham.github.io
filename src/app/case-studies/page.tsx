import Link from "next/link";
import { projects } from "@/data/portfolio";

export default function CaseStudiesPage() {
    const caseStudyProjects = projects.filter((p) => p.caseStudySlug);

    return (
        <div className="min-h-screen py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        Case <span className="gradient-text">Studies</span>
                    </h1>
                    <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto text-lg">
                        Deep dives into my most impactful projects, exploring the problems,
                        solutions, and measurable business outcomes.
                    </p>
                </div>

                {/* Case Studies List */}
                <div className="space-y-8">
                    {caseStudyProjects.map((project, index) => (
                        <Link
                            key={project.id}
                            href={`/case-studies/${project.caseStudySlug}`}
                            className="block group"
                        >
                            <article className="card p-8 md:p-10 flex flex-col md:flex-row gap-8">
                                {/* Image */}
                                <div className="md:w-1/3 aspect-video md:aspect-square rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-7xl opacity-50">
                                        {project.category === "finance" && "💰"}
                                        {project.category === "research" && "🔬"}
                                        {project.category === "ai" && "🤖"}
                                        {project.category === "enterprise" && "🏢"}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    {/* Number & Category */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-5xl font-bold text-[var(--primary)]/20">
                                            0{index + 1}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium capitalize">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[var(--primary)] transition-colors">
                                        {project.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-[var(--foreground-secondary)] mb-6">
                                        {project.fullDescription}
                                    </p>

                                    {/* Metrics */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                        {project.metrics.map((metric, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-[var(--background-tertiary)] rounded-lg p-3 text-center"
                                            >
                                                <div className="text-xl font-bold text-[var(--secondary)]">
                                                    {metric.value}
                                                </div>
                                                <div className="text-xs text-[var(--foreground-muted)]">
                                                    {metric.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 text-sm text-[var(--foreground-secondary)] border border-[var(--border)] rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Read More */}
                                    <div className="mt-6 flex items-center gap-2 text-[var(--primary)] font-medium group-hover:gap-4 transition-all">
                                        Read Case Study
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
