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
    const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), {
        stiffness: 120,
        damping: 15,
        mass: 1,
    });

    const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), {
        stiffness: 120,
        damping: 15,
        mass: 1,
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
            className="flex flex-col items-center origin-top"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1200px" }}
            // Enhanced drop from top - like badge falling from ceiling
            initial={{ y: -400, rotate: -25, opacity: 0, scale: 0.8 }}
            animate={{
                y: 0,
                rotate: [null, 20, -15, 10, -6, 3, 0],
                opacity: 1,
                scale: 1
            }}
            transition={{
                y: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                rotate: { duration: 2.5, ease: "easeOut", times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1] },
                opacity: { duration: 0.4 },
                scale: { duration: 0.8, ease: "easeOut" }
            }}
        >
            {/* Lanyard - Dual Tone Black/Silver */}
            <div className="flex flex-col items-center mb-[-16px] z-10">
                {/* Clip at top - Silver metallic */}
                <div className="w-6 h-4 bg-gradient-to-b from-zinc-300 to-zinc-400 rounded-sm shadow-md" />

                {/* Lanyard Strap - Black with silver edge */}
                <div className="relative w-4 h-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 rounded-sm" />
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-zinc-500/50" />
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-zinc-500/50" />
                </div>

                {/* Tag Badge - Black/Silver dual tone */}
                <motion.div
                    className="px-4 py-2 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 rounded-lg flex items-center justify-center shadow-xl border border-zinc-600/50 cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="text-[10px] text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-100 tracking-[0.2em] font-mono font-bold">LABS</span>
                </motion.div>

                {/* Connector - Silver clip */}
                <div className="w-10 h-5 bg-gradient-to-b from-zinc-400 to-zinc-500 rounded-b-lg mt-1 shadow-md flex items-center justify-center">
                    <div className="w-6 h-2 bg-zinc-300 rounded-full" />
                </div>
            </div>

            {/* Card - Black/Silver Dual Tone */}
            <motion.div
                ref={cardRef}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-[280px] bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-2xl border border-zinc-300 dark:border-zinc-700 overflow-hidden relative"
            >
                {/* Card Header - Metallic black gradient */}
                <div className="h-28 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_2px_2px,_#555_1px,_transparent_0)] bg-[size:10px_10px]" />
                    {/* Silver accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-400 to-transparent" />
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-white font-bold tracking-widest text-lg z-10 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                        ENGINEER
                    </div>
                </div>

                {/* Photo Container */}
                <div className="relative flex justify-center" style={{ marginTop: "-48px" }}>
                    <div className="w-24 h-24 bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-zinc-700 dark:to-zinc-800 rounded-xl p-1 shadow-xl rotate-3 overflow-hidden border-2 border-zinc-300 dark:border-zinc-600">
                        <Image
                            src={`${BASE_PATH}/profile.jpg`}
                            alt="Profile"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover rounded-lg"
                            priority
                        />
                    </div>
                </div>

                {/* Info */}
                <div className="pt-4 pb-6 px-6 text-center">
                    <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight mb-1">
                        Madhu Goutham Reddy Ambati
                    </h2>
                    <div className="text-xs font-medium text-zinc-500 tracking-wide uppercase mb-4">
                        Senior Data Scientist
                    </div>

                    <div className="flex justify-center gap-6 text-xs text-zinc-400 font-mono mb-4">
                        <span>ID: 1212</span>
                        <span>EXP: 6+ YRS</span>
                    </div>

                    {/* Barcode - Silver tones */}
                    <div className="h-6 w-full flex justify-center gap-[2px] opacity-50">
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-gradient-to-b from-zinc-700 to-zinc-900 dark:from-zinc-300 dark:to-zinc-500"
                                style={{ width: "2px", height: `${25 + Math.random() * 75}%` }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
