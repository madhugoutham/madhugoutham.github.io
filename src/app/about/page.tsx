import Link from "next/link";
import { experience, certifications, publications } from "@/data/portfolio";

export default function AboutPage() {
    return (
        <div className="min-h-screen py-24 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-5xl font-bold text-white">
                        MG
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        About <span className="gradient-text">Me</span>
                    </h1>
                    <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto text-lg">
                        AI/ML Engineer passionate about building production-grade systems
                        that deliver measurable business impact.
                    </p>
                </div>

                {/* Bio Section */}
                <section className="mb-20">
                    <div className="card p-8 md:p-12">
                        <h2 className="text-2xl font-bold mb-6 gradient-text">My Story</h2>
                        <div className="space-y-4 text-[var(--foreground-secondary)] leading-relaxed">
                            <p>
                                With over 6 years of experience in data science and machine learning,
                                I&apos;ve had the privilege of working across diverse industries—from fintech
                                giants processing millions of transactions daily to cutting-edge research
                                institutions pushing the boundaries of AI.
                            </p>
                            <p>
                                My journey began in India, where I developed a passion for solving complex
                                problems with data at Stanley Black & Decker. This led me to roles at TCS
                                and Experian, where I built real-time fraud detection systems that saved
                                millions of dollars annually.
                            </p>
                            <p>
                                Currently pursuing my Master&apos;s in Computer Science at Northern Illinois
                                University, I&apos;ve combined academic research with practical applications,
                                publishing work on environmental AI and building production systems at KeyBank.
                            </p>
                            <p>
                                I believe in the power of AI to solve real-world problems—but only when built
                                with rigor, ethics, and a deep understanding of business needs. Every model
                                I deploy is designed not just to perform well on metrics, but to create
                                tangible value.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Experience Timeline */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-10 text-center">
                        Professional <span className="gradient-text">Journey</span>
                    </h2>
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border)]" />

                        {experience.map((job, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-[var(--primary)] border-4 border-[var(--background)]" />

                                {/* Content */}
                                <div
                                    className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                                        }`}
                                >
                                    <div className="card p-6">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="text-sm text-[var(--primary)] font-medium">
                                                {job.period}
                                            </span>
                                            <span className="text-[var(--foreground-muted)]">•</span>
                                            <span className="text-sm text-[var(--foreground-muted)]">
                                                {job.location}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                                        <p className="text-[var(--foreground-secondary)] mb-4">
                                            {job.company}
                                        </p>
                                        <ul className="space-y-2">
                                            {job.highlights.map((highlight, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-2 text-sm text-[var(--foreground-secondary)]"
                                                >
                                                    <svg
                                                        className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-10 text-center">
                        <span className="gradient-text">Education</span>
                    </h2>
                    <div className="card p-8 text-center">
                        <div className="text-4xl mb-4">🎓</div>
                        <h3 className="text-xl font-bold mb-2">Master of Science in Computer Science</h3>
                        <p className="text-[var(--primary)] mb-2">Northern Illinois University</p>
                        <p className="text-[var(--foreground-muted)]">Aug 2023 - May 2025</p>
                    </div>
                </section>

                {/* Certifications */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-10 text-center">
                        <span className="gradient-text">Certifications</span>
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                className="card p-5 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-6 h-6 text-[var(--primary)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium">{cert}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Publications */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-10 text-center">
                        <span className="gradient-text">Publications</span>
                    </h2>
                    <div className="space-y-4">
                        {publications.map((pub, index) => (
                            <div key={index} className="card p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">{pub.title}</h3>
                                        <p className="text-sm text-[var(--foreground-secondary)]">
                                            {pub.journal}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-sm text-[var(--foreground-muted)]">
                                            {pub.year}
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${pub.status === "Published"
                                                    ? "bg-[var(--secondary)]/10 text-[var(--secondary)]"
                                                    : "bg-[var(--accent)]/10 text-[var(--accent)]"
                                                }`}
                                        >
                                            {pub.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center">
                    <div className="card p-12 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5">
                        <h2 className="text-2xl font-bold mb-4">
                            Let&apos;s Work Together
                        </h2>
                        <p className="text-[var(--foreground-secondary)] mb-8 max-w-md mx-auto">
                            I&apos;m always interested in discussing new opportunities and
                            challenging problems in AI/ML.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white rounded-full font-semibold transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                        >
                            Get in Touch
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
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
