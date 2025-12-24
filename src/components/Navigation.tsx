"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]"
                    : "bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-105">
                        MG
                    </div>
                    <span className="hidden sm:block font-semibold text-lg">
                        Madhu<span className="text-[var(--primary)]">.</span>dev
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/resume.pdf"
                        className="px-4 py-2 text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                    >
                        Resume
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    >
                        Let&apos;s Talk
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-[var(--foreground)]"
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[var(--background-secondary)] border-t border-[var(--border)]">
                    <div className="px-6 py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors py-2"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 pt-4 border-t border-[var(--border)]">
                            <Link
                                href="/resume.pdf"
                                className="py-2 text-[var(--foreground-secondary)]"
                            >
                                Download Resume
                            </Link>
                            <Link
                                href="/contact"
                                className="px-6 py-3 bg-[var(--primary)] text-white rounded-full font-medium text-center"
                            >
                                Let&apos;s Talk
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
