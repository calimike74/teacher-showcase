'use client';

import { useEffect, useRef } from 'react';

export default function MobiusRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Color palette - warm oranges, golds, corals, with some purples/blues for iridescence
    const colors = [
      { r: 255, g: 107, b: 53 },   // Orange #FF6B35
      { r: 247, g: 201, b: 72 },   // Gold #F7C948
      { r: 232, g: 93, b: 117 },   // Coral #E85D75
      { r: 140, g: 100, b: 255 },  // Purple
      { r: 80, g: 180, b: 255 },   // Blue
      { r: 255, g: 140, b: 97 },   // Light orange #FF8C61
    ];

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const getColor = (t: number) => {
      const idx = t * (colors.length - 1);
      const i = Math.floor(idx);
      const f = idx - i;
      const c1 = colors[i % colors.length];
      const c2 = colors[(i + 1) % colors.length];
      return {
        r: lerp(c1.r, c2.r, f),
        g: lerp(c1.g, c2.g, f),
        b: lerp(c1.b, c2.b, f),
      };
    };

    const draw = () => {
      time += 0.003;

      // Clear with warm cream background
      ctx.fillStyle = '#FFFBF5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.5;

      // Draw multiple ribbon layers for depth
      const ribbonLayers = 3;

      for (let layer = 0; layer < ribbonLayers; layer++) {
        const layerOffset = layer * 0.15;
        const layerAlpha = 0.4 - layer * 0.1;
        const layerScale = 1 - layer * 0.1;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(layerScale, layerScale);

        // Draw the ribbon as a series of connected segments
        const segments = 120;
        const ribbonWidth = Math.min(canvas.width, canvas.height) * 0.12;

        for (let i = 0; i < segments; i++) {
          const t = i / segments;
          const nextT = (i + 1) / segments;

          // Parametric equations for a twisting ribbon path
          const angle = t * Math.PI * 2.5 + time + layerOffset;
          const nextAngle = nextT * Math.PI * 2.5 + time + layerOffset;

          // Main curve - swooping arc (spans full width)
          const radiusX = canvas.width * 0.55;
          const radiusY = canvas.height * 0.3;

          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle * 0.7) * radiusY + Math.sin(angle * 2) * 50;

          const nextX = Math.cos(nextAngle) * radiusX;
          const nextY = Math.sin(nextAngle * 0.7) * radiusY + Math.sin(nextAngle * 2) * 50;

          // Twist factor for the ribbon
          const twist = Math.sin(angle * 2 + time * 2) * 0.8;
          const nextTwist = Math.sin(nextAngle * 2 + time * 2) * 0.8;

          // Calculate ribbon edges with twist
          const perpX = -Math.sin(angle) * ribbonWidth * twist;
          const perpY = Math.cos(angle * 0.7) * ribbonWidth;

          const nextPerpX = -Math.sin(nextAngle) * ribbonWidth * nextTwist;
          const nextPerpY = Math.cos(nextAngle * 0.7) * ribbonWidth;

          // Color based on position and time
          const colorT = (t + time * 0.5) % 1;
          const color = getColor(colorT);

          // Draw ribbon segment
          ctx.beginPath();
          ctx.moveTo(x + perpX, y + perpY);
          ctx.lineTo(x - perpX, y - perpY);
          ctx.lineTo(nextX - nextPerpX, nextY - nextPerpY);
          ctx.lineTo(nextX + nextPerpX, nextY + nextPerpY);
          ctx.closePath();

          // Gradient fill for iridescent effect
          const gradient = ctx.createLinearGradient(
            x + perpX, y + perpY,
            x - perpX, y - perpY
          );

          const alpha = layerAlpha * (0.6 + Math.abs(twist) * 0.4);
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.3})`);
          gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.3})`);

          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.restore();
      }

      // Add glow effect layer
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(40px)';

      const glowSegments = 40;
      for (let i = 0; i < glowSegments; i++) {
        const t = i / glowSegments;
        const angle = t * Math.PI * 2.5 + time;

        const x = centerX + Math.cos(angle) * canvas.width * 0.55;
        const y = centerY + Math.sin(angle * 0.7) * canvas.height * 0.3 + Math.sin(angle * 2) * 50;

        const colorT = (t + time * 0.5) % 1;
        const color = getColor(colorT);

        ctx.beginPath();
        ctx.arc(x, y, 60, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.15)`;
        ctx.fill();
      }

      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#FFFBF5' }}
    />
  );
}
