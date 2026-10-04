import React, { useEffect, useRef } from "react";

export default function BackgroundCanvas({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let animId;

    const resize = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const handleMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    const cores = navigator.hardwareConcurrency || 4;
    const count = cores <= 4 ? 40 : 70;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);

      // Subtle radial glow following cursor
      const glowGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        450
      );
      if (dark) {
        glowGrad.addColorStop(0, "rgba(0, 212, 255, 0.05)");
        glowGrad.addColorStop(1, "rgba(10, 10, 15, 0)");
      } else {
        glowGrad.addColorStop(0, "rgba(0, 120, 200, 0.04)");
        glowGrad.addColorStop(1, "rgba(248, 249, 252, 0)");
      }
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, cv.width, cv.height);

      // Render calm particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = cv.width;
        if (p.x > cv.width) p.x = 0;
        if (p.y < 0) p.y = cv.height;
        if (p.y > cv.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(0, 212, 255, ${p.alpha})`
          : `rgba(0, 120, 200, ${p.alpha * 0.8})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animId);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="background-canvas"
      aria-hidden="true"
    />
  );
}
