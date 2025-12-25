"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const BASE_PATH = "";
const COPPER = "#a83b00";

export default function IDCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

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
      {/* LANYARD from sky */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-6 flex flex-col items-center" style={{ height: '400px' }}>
        <div className="w-3 flex-1 bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 rounded-t-full">
          <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-zinc-400/50 via-zinc-500/30 to-transparent" />
        </div>
      </div>

      <div className="flex flex-col items-center origin-top">
        {/* Clip */}
        <div className="w-8 h-6 bg-gradient-to-b from-zinc-500 to-zinc-600 rounded-md shadow-lg mb-[-2px] z-10 flex items-center justify-center">
          <div className="w-4 h-2 bg-zinc-400 rounded-full" />
        </div>

        {/* Strap */}
        <div className="w-3 h-8 bg-gradient-to-b from-zinc-800 to-zinc-900 mb-[-2px]" />

        {/* AMGR Tag with copper */}
        <motion.div
          className="px-5 py-2.5 rounded-md flex items-center justify-center shadow-2xl cursor-pointer mb-2 z-10"
          style={{
            background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
            border: `1px solid ${COPPER}`
          }}
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xs tracking-[0.25em] font-mono font-bold" style={{ color: COPPER }}>AMGR</span>
        </motion.div>

        {/* Connector */}
        <div className="w-10 h-4 bg-gradient-to-b from-zinc-500 to-zinc-600 rounded-b-md shadow-md flex items-center justify-center mb-[-8px] z-10">
          <div className="w-5 h-1.5 bg-zinc-400 rounded-full" />
        </div>

        {/* DUAL TONE VERTICAL ID CARD - Real ID shape */}
        <motion.div
          ref={cardRef}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-[280px] h-[380px] rounded-md shadow-2xl overflow-hidden relative"
        >
          {/* Copper border */}
          <div className="absolute inset-0 rounded-md" style={{ border: `2px solid ${COPPER}` }} />

          {/* TOP HALF - Deep Black */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2"
            style={{
              background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, #151515 100%)'
            }}
          >
            {/* Subtle texture */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,_#333_0.5px,_transparent_0)] bg-[size:8px_8px]" />

            {/* ENGINEER Header */}
            <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${COPPER}, transparent)` }} />
              <div className="font-bold tracking-widest text-sm flex items-center gap-2" style={{ color: '#e4e4e7' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: COPPER, boxShadow: `0 0 10px ${COPPER}` }} />
                ENGINEER
              </div>
            </div>
          </div>

          {/* BOTTOM HALF - Shining Silver Grey */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2"
            style={{
              background: 'linear-gradient(180deg, #a1a1aa 0%, #d4d4d8 30%, #e4e4e7 50%, #d4d4d8 70%, #a1a1aa 100%)'
            }}
          >
            {/* Shine effect */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 45%, transparent 60%)'
              }}
            />
          </div>

          {/* Photo - Centered at the half line */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 'calc(50% - 50px)' }}>
            <div
              className="w-[100px] h-[100px] rounded-md p-1 shadow-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #3a3a3a, #2a2a2a)',
                border: `2px solid ${COPPER}`
              }}
            >
              <Image
                src={`${BASE_PATH}/profile.jpg`}
                alt="Profile"
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-sm"
                priority
              />
            </div>
          </div>

          {/* Info on bottom silver section */}
          <div className="absolute bottom-0 left-0 right-0 h-[calc(50%-60px)] flex flex-col items-center justify-center px-6 text-center">
            <h2 className="text-base font-bold tracking-tight leading-tight mb-1" style={{ color: '#18181b' }}>
              Madhu Goutham Reddy Ambati
            </h2>
            <div className="text-[11px] font-semibold tracking-wide uppercase mb-3" style={{ color: COPPER }}>
              Senior Data Scientist
            </div>

            <div className="flex justify-center gap-5 text-[10px] font-mono font-semibold mb-3" style={{ color: '#3f3f46' }}>
              <span>ID: 1212</span>
              <span>EXP: 6+ YRS</span>
            </div>

            {/* Barcode */}
            <div className="h-5 w-3/4 flex justify-center gap-[1px] opacity-60">
              {[...Array(35)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "2px",
                    height: `${30 + Math.random() * 70}%`,
                    backgroundColor: i % 6 === 0 ? COPPER : '#52525b'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom copper accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${COPPER}, transparent)` }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
