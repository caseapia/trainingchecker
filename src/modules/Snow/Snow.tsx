import React, { useEffect, useRef, useCallback } from 'react';
import styles from './Snow.module.scss';

interface Vector2 {
  x: number;
  y: number;
}

class Particle {
  origin: Vector2;
  position: Vector2;
  velocity: Vector2;
  size: number;
  amplitude: number;
  dx: number;

  constructor(origin: Vector2, velocity: Vector2, size: number, amplitude: number) {
    this.origin = origin;
    this.position = { ...origin };
    this.velocity = velocity;
    this.size = size;
    this.amplitude = amplitude;
    this.dx = Math.random() * 100;
  }

  update(deltaTime: number) {
    this.position.y += this.velocity.y * deltaTime;
    this.dx += this.velocity.x * deltaTime;
    this.position.x = this.origin.x + this.amplitude * Math.sin(this.dx);
  }
}

const SnowCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const frameTimeRef = useRef<number>(performance.now());
  const running = useRef<boolean>(true);

  const frand = (min: number, max: number) => Math.random() * (max - min) + min;

  const initializeParticles = useCallback((canvasWidth: number, canvasHeight: number) => {
    const pAmount = 5000;
    const pSize = [0.5, 1.5];
    const pSwing = [0.1, 1];
    const pSpeed = [40, 100];
    const pAmplitude = [25, 50];

    particles.current = Array.from({ length: pAmount }, () => {
      const origin: Vector2 = { x: frand(0, canvasWidth), y: frand(-canvasHeight, 0) };
      const velocity: Vector2 = { x: frand(pSwing[0], pSwing[1]), y: frand(pSpeed[0], pSpeed[1]) };
      const size = frand(pSize[0], pSize[1]);
      const amplitude = frand(pAmplitude[0], pAmplitude[1]);

      return new Particle(origin, velocity, size, amplitude);
    });
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgb(255,255,255)';
    particles.current.forEach((particle) => {
      ctx.fillRect(particle.position.x, particle.position.y, particle.size, particle.size);
    });
  }, []);

  const updateParticles = useCallback((deltaTime: number, canvasWidth: number, canvasHeight: number) => {
    particles.current.forEach((particle) => {
      particle.update(deltaTime);

      if (particle.position.y - particle.size > canvasHeight) {
        particle.position.y = -particle.size;
        particle.position.x = particle.origin.x = Math.random() * canvasWidth;
        particle.dx = Math.random() * 100;
      }
    });
  }, []);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles(canvas.width, canvas.height);
    }
  }, [initializeParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      if (!running.current) return;

      const now = performance.now();
      const deltaTime = (now - frameTimeRef.current) / 1000;
      frameTimeRef.current = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles(deltaTime, canvas.width, canvas.height);
      drawParticles(ctx);

      requestAnimationFrame(loop);
    };

    frameTimeRef.current = performance.now();
    loop();

    return () => {
      running.current = false;
    };
  }, [drawParticles, updateParticles]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  return <canvas ref={canvasRef} id="particle_canvas" className={styles.canvas} />;
};

export default SnowCanvas;
