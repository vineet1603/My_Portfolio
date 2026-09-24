"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export type MorphItem = {
  name: string;
  meta: string;
  image: string;
  alt: string;
};

const CARD_W = 150;
const CARD_H = 105;

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

function useContainerSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });

    ro.observe(el);
    setSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

function MorphCard({
  item,
  index,
  total,
  size,
  progress,
  onSelect,
}: {
  item: MorphItem;
  index: number;
  total: number;
  size: { width: number; height: number };
  progress: ReturnType<typeof useSpring>;
  onSelect: () => void;
}) {
  const isMobile = size.width < 768;
  const minDim = Math.min(size.width, size.height) || 600;

  // Circle layout (start state)
  const circleRadius = Math.min(minDim * 0.32, 240);
  const circleAngle = (index / total) * 360 - 90;
  const circleRad = (circleAngle * Math.PI) / 180;
  const circle = {
    x: Math.cos(circleRad) * circleRadius,
    y: Math.sin(circleRad) * circleRadius,
    rotation: circleAngle + 90,
  };

  // Arc layout (end state) — a gentle rainbow across the container
  const arcRadius = Math.min(size.width || 900, (size.height || 600) * 1.6) * (isMobile ? 1.5 : 0.9);
  const apexY = -(size.height || 600) * 0.16;
  const arcCenterY = apexY + arcRadius;
  const spread = isMobile ? 40 : 50;
  const startAngle = -90 - spread / 2;
  const step = total > 1 ? spread / (total - 1) : 0;
  const arcAngle = startAngle + index * step;
  const arcRad = (arcAngle * Math.PI) / 180;
  const arc = {
    x: Math.cos(arcRad) * arcRadius,
    y: Math.sin(arcRad) * arcRadius + arcCenterY,
    rotation: arcAngle + 90,
    scale: isMobile ? 0.95 : 1.15,
  };

  const x = useTransform(progress, (p) => lerp(circle.x, arc.x, p));
  const y = useTransform(progress, (p) => lerp(circle.y, arc.y, p));
  const rotate = useTransform(progress, (p) => lerp(circle.rotation, arc.rotation, p));
  const scale = useTransform(progress, (p) => lerp(0.85, arc.scale, p));

  return (
    <motion.button
      type="button"
      tabIndex={-1}
      onClick={onSelect}
      style={{ x, y, rotate, scale, width: CARD_W, height: CARD_H }}
      className="absolute left-1/2 top-1/2 -ml-[75px] -mt-[52px] overflow-hidden rounded-sm border border-border bg-white shadow-lg transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <img src={item.image} alt="" aria-hidden="true" className="h-full w-full object-contain" />
    </motion.button>
  );
}

export function ScrollMorphCerts({
  items,
  onSelect,
  children,
}: {
  items: MorphItem[];
  onSelect: (index: number) => void;
  children?: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const size = useContainerSize(stageRef);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const raw = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);
  const progress = useSpring(raw, { stiffness: 60, damping: 22, mass: 0.6 });
  const textOpacity = useTransform(progress, [0.55, 1], [0, 1]);

  if (reduced) return <>{children}</>;


  return (
    <div ref={sectionRef} className="relative h-[95vh]" aria-hidden="true">
      <div ref={stageRef} className="sticky top-0 h-[62vh] overflow-hidden">


        <motion.p
          style={{ opacity: textOpacity }}
          className="absolute inset-x-0 bottom-8 px-6 text-center text-xs uppercase tracking-[0.35em] text-muted-foreground"
        >
          scroll — credentials in motion
        </motion.p>
        {size.width > 0 &&
          items.map((item, i) => (
            <MorphCard
              key={item.name}
              item={item}
              index={i}
              total={items.length}
              size={size}
              progress={progress}
              onSelect={() => onSelect(i)}
            />
          ))}
      </div>
    </div>
  );
}
