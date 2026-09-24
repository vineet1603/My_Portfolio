"use client";

import { useCallback, useId } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

const initEngine = async (engine: Engine) => {
  await loadSlim(engine);
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  const controls = useAnimation();
  const generatedId = useId().replace(/[^a-zA-Z0-9]/g, "");

  const particlesLoaded = useCallback(
    async (container?: Container) => {
      if (container) {
        controls.start({ opacity: 1, transition: { duration: 1 } });
      }
    },
    [controls],
  );

  return (
    <motion.div animate={controls} aria-hidden="true" className={cn("opacity-0", className)}>
      <ParticlesProvider init={initEngine}>
        <Particles
          id={id || `sparkles-${generatedId}`}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: background || "transparent" } },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: false, mode: "push" },
                onHover: { enable: false, mode: "repulse" },
                resize: { enable: true },
              },
            },
            particles: {
              color: { value: particleColor || "#ffffff" },
              move: {
                enable: true,
                direction: "none",
                outModes: { default: "out" },
                random: false,
                straight: false,
                speed: { min: 0.1, max: 1 },
              },
              number: {
                density: { enable: true, width: 400, height: 400 },
                value: particleDensity || 120,
              },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                  enable: true,
                  speed: speed || 4,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                },
              },
              shape: { type: "circle" },
              size: { value: { min: minSize || 1, max: maxSize || 3 } },
            },
            detectRetina: true,
          }}
        />
      </ParticlesProvider>
    </motion.div>
  );
};
