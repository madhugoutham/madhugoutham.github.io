"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/portfolio";

const categories = [
    { id: "all", label: "All Projects" },
    { id: "finance", label: "Finance" },
    { id: "ai", label: "AI/LLM" },
    { id: "research", label: "Research" },
    { id: "enterprise", label: "Enterprise" },
];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredProjects =
        activeCategory === "all"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <div className="min-h-screen py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        My <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto text-lg">
                        A collection of production ML systems, research projects, and
                        AI-driven solutions I&apos;ve built across finance, healthcare, and
                        technology sectors.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === category.id
                                    ? "bg-[var(--primary)] text-white"
                                    : "bg-[var(--background-secondary)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] border border-[var(--border)]"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={
                                project.caseStudySlug
                                    ? `/case-studies/${project.caseStudySlug}`
                                    : "#"
                            }
                            className="card p-6 group cursor-pointer"
                        >
                            {/* Project Image */}
                            <div className="aspect-video rounded-lg bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 mb-6 flex items-center justify-center overflow-hidden">
                                <div className="text-6xl opacity-50">
                                    {project.category === "finance" && "💰"}
                                    {project.category === "research" && "🔬"}
                                    {project.category === "ai" && "🤖"}
                                    {project.category === "enterprise" && "🏢"}
                                </div>
                            </div>

                            {/* Featured Badge */}
                            {project.featured && (
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs font-medium mb-3">
                                    <svg
                                        className="w-3 h-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Featured
                                </div>
                            )}

                            {/* Category */}
                            <div className="inline-block px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium mb-4 capitalize ml-2">
                                {project.category}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--primary)] transition-colors">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[var(--foreground-secondary)] text-sm mb-4 line-clamp-2">
                                {project.shortDescription}
                            </p>

                            {/* Metrics */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.metrics.slice(0, 2).map((metric, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 rounded-full bg-[var(--background-tertiary)] text-xs"
                                    >
                                        <span className="text-[var(--secondary)] font-semibold">
                                            {metric.value}
                                        </span>{" "}
                                        <span className="text-[var(--foreground-muted)]">
                                            {metric.label}
                                        </span>
                                    </span>
                                ))}
                            </div>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-0.5 text-xs text-[var(--foreground-muted)] border border-[var(--border)] rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-[var(--foreground-muted)]">
                            No projects found in this category.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
