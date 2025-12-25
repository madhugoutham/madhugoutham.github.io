"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const BASE_PATH = "/portfolios";

export default function IDCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    // Motion values for interaction
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth "hanging" feel
    const rotateX = useSpring(useTransform(y, [-100, 100], [4, -4]), {
        stiffness: 100,
        damping: 12,
        mass: 0.8,
    });

    const rotateY = useSpring(useTransform(x, [-100, 100], [-6, 6]), {
        stiffness: 100,
        damping: 12,
        mass: 0.8,
    });

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1200px" }}
            // Dramatic drop from sky
            initial={{ y: -600, rotate: -30, opacity: 0 }}
            animate={{
                y: 0,
                rotate: [null, 25, -18, 12, -7, 4, 0],
                opacity: 1
            }}
            transition={{
                y: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
                rotate: { duration: 3, ease: "easeOut", times: [0, 0.12, 0.28, 0.45, 0.65, 0.82, 1] },
                opacity: { duration: 0.5 }
            }}
        >
            {/* SUPER LONG LANYARD - Extends from sky (above viewport) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-6 flex flex-col items-center" style={{ height: '400px' }}>
                <div className="w-3 flex-1 bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 rounded-t-full">
                    <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-zinc-400/50 via-zinc-500/30 to-transparent" />
                </div>
            </div>

            {/* Card container with origin at top for pendulum */}
            <div className="flex flex-col items-center origin-top">
                {/* Connector clip - Grey metallic */}
                <div className="w-8 h-6 bg-gradient-to-b from-zinc-500 to-zinc-600 rounded-lg shadow-lg mb-[-2px] z-10 flex items-center justify-center">
                    <div className="w-4 h-2 bg-zinc-400 rounded-full" />
                </div>

                {/* Short visible strap */}
                <div className="w-3 h-6 bg-gradient-to-b from-zinc-800 to-zinc-900 mb-[-2px]" />

                {/* Tag Badge - AMGR */}
                <motion.div
                    className="px-5 py-2.5 bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 rounded-xl flex items-center justify-center shadow-2xl border border-zinc-600 cursor-pointer mb-2 z-10"
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="text-xs text-zinc-300 tracking-[0.25em] font-mono font-bold">AMGR</span>
                </motion.div>

                {/* Connector to card */}
                <div className="w-10 h-3 bg-gradient-to-b from-zinc-500 to-zinc-600 rounded-b-xl shadow-md flex items-center justify-center mb-[-6px] z-10">
                    <div className="w-5 h-1 bg-zinc-400 rounded-full" />
                </div>

                {/* HORIZONTAL ID Card - Credit card style */}
                <motion.div
                    ref={cardRef}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="w-[380px] h-[220px] bg-zinc-100 dark:bg-zinc-850 rounded-lg shadow-2xl border border-zinc-300 dark:border-zinc-700 overflow-hidden relative"
                >
                    {/* Matte texture overlay */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,_#000_0.5px,_transparent_0)] bg-[size:4px_4px] pointer-events-none" />

                    {/* Left side - Dark header stripe */}
                    <div className="absolute left-0 top-0 bottom-0 w-[100px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,_#666_1px,_transparent_0)] bg-[size:6px_6px]" />
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/40 mb-2" />
                        <span className="text-zinc-300 font-bold tracking-widest text-[10px] writing-mode-vertical" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>ENGINEER</span>
                    </div>

                    {/* Main content area */}
                    <div className="ml-[100px] h-full flex items-center p-5 gap-5">
                        {/* Photo */}
                        <div className="w-[90px] h-[90px] bg-zinc-200 dark:bg-zinc-700 rounded-lg p-1 shadow-lg overflow-hidden border-2 border-zinc-300 dark:border-zinc-600 flex-shrink-0">
                            <Image
                                src={`${BASE_PATH}/profile.jpg`}
                                alt="Profile"
                                width={90}
                                height={90}
                                className="w-full h-full object-cover rounded-md"
                                priority
                            />
                        </div>

                        {/* Info - Copper/Burnt orange text (#a83b00) */}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base font-bold tracking-tight leading-tight mb-1" style={{ color: '#a83b00' }}>
                                Madhu Goutham Reddy Ambati
                            </h2>
                            <div className="text-[11px] font-semibold tracking-wide uppercase mb-3" style={{ color: '#a83b00', opacity: 0.85 }}>
                                Senior Data Scientist
                            </div>

                            <div className="flex gap-4 text-[10px] font-mono font-semibold" style={{ color: '#a83b00', opacity: 0.75 }}>
                                <span>ID: 1212</span>
                                <span>EXP: 6+ YRS</span>
                            </div>

                            {/* Barcode */}
                            <div className="h-4 w-full flex gap-[1px] mt-3 opacity-40">
                                {[...Array(40)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-zinc-700 dark:bg-zinc-400"
                                        style={{ width: "2px", height: `${40 + Math.random() * 60}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
