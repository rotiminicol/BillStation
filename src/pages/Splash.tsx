import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Splash = () => {
  const [stage, setStage] = useState<'init' | 'logo' | 'showcase' | 'exit'>('init');
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Brand colors
  const brandColors = {
    primary: '#0057FF', // Deep blue
    secondary: '#00BFFF', // Bright cyan
    darkBg: '#0F172A', // Space blue
    lightBg: '#1E293B' // Lighter space blue
  };

  useEffect(() => {
    // Stage timing for exactly 7 seconds total
    const timer = setTimeout(() => setStage('logo'), 1000);       // 0-1s: Init
    const timer2 = setTimeout(() => setStage('showcase'), 3000);  // 1-3s: Logo reveal
    const timer3 = setTimeout(() => setStage('exit'), 6000);      // 3-6s: Showcase
    const timer4 = setTimeout(() => navigate("/welcome"), 7000);  // 6-7s: Exit

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [navigate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);


    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      symbol: string;
      opacity: number;
      column: number;
    }> = [];

    // Currency symbols with brand-aligned colors
    const symbols = [
      { char: '₿', color: brandColors.primary }, 
      { char: '$', color: '#FFFFFF' },
      { char: '€', color: brandColors.secondary },
      { char: '¥', color: '#AAAAAA' },
      { char: '£', color: brandColors.secondary },
      { char: '₦', color: brandColors.primary }
    ];

    // Initialize particles in columns
    const columns = isMobile ? 10 : 14;
    const columnWidth = canvas.width / columns;

    for (let i = 0; i < columns; i++) {
      const particlesInColumn = isMobile ? 12 : 20;
      for (let j = 0; j < particlesInColumn; j++) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        particles.push({
          x: i * columnWidth + columnWidth / 2,
          y: Math.random() * canvas.height * 2 - canvas.height,
          size: Math.random() * (isMobile ? 14 : 18) + 10,
          speed: Math.random() * 1.2 + 0.8,
          symbol: symbol.char,
          opacity: Math.random() * 0.25 + 0.05,
          column: i
        });
      }
    }

    const animate = () => {
      // Clear with brand dark background
      ctx.fillStyle = brandColors.darkBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach(particle => {
        particle.y += particle.speed;
        
        // Reset if below screen
        if (particle.y > canvas.height + 50) {
          particle.y = -30 - Math.random() * 50;
          particle.x = particle.column * columnWidth + columnWidth / 2;
        }

        // Get symbol color
        const symbolData = symbols.find(s => s.char === particle.symbol);
        const color = symbolData?.color || '#FFFFFF';

        // Draw with crisp edges
        ctx.font = `400 ${particle.size}px 'Inter', sans-serif`;
        ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(particle.symbol, particle.x, particle.y);
      });

      // Add ultra-subtle grid during showcase
      if (stage === 'showcase') {
        ctx.strokeStyle = `rgba(100, 150, 255, 0.03)`;
        ctx.lineWidth = 0.5;
        
        // Vertical lines
        for (let i = 0; i <= columns; i++) {
          ctx.beginPath();
          ctx.moveTo(i * columnWidth, 0);
          ctx.lineTo(i * columnWidth, canvas.height);
          ctx.stroke();
        }
        
        // Horizontal lines
        const rows = Math.floor(canvas.height / 120);
        for (let i = 0; i <= rows; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * 120);
          ctx.lineTo(canvas.width, i * 120);
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [stage, isMobile, brandColors]);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ backgroundColor: brandColors.darkBg }}>
      {/* Frosted glass effect canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transition-opacity duration-1000"
        style={{ 
          zIndex: 1,
          opacity: stage === 'init' ? 0 : 1
        }}
      />

      {/* Precision logo animation */}
      <div className={`absolute inset-0 flex items-center justify-center z-30 transition-all duration-1000 ${
        stage === 'init' ? 'opacity-0 scale-95' :
        stage === 'logo' ? 'opacity-100 scale-100' :
        stage === 'showcase' ? 'opacity-100 scale-105' :
        'opacity-0 scale-95'
      }`}>
        <div className="relative">
          {/* Brand-colored halo */}
          <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${
            stage === 'showcase' ? 'opacity-30' : 'opacity-10'
          }`} style={{
            background: `radial-gradient(ellipse at center, ${brandColors.secondary} 0%, transparent 70%)`,
            filter: 'blur(40px)'
          }}></div>
          
          {/* Main logo with perfect clarity */}
          <div className={`relative flex items-center justify-center ${
            isMobile ? 'w-40 h-40' : 'w-52 h-52'
          }`}>
            <img
              src="/logo.png"
              alt="Bill Station"
              className="w-full h-full object-contain"
              style={{
                filter: `drop-shadow(0 0 8px ${brandColors.secondary}33)`
              }}
            />
          </div>

          {/* Data stream pulse */}
          <div className={`absolute -bottom-6 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-${brandColors.secondary} to-transparent transition-all duration-1000 ${
            stage === 'showcase' ? 'opacity-70' : 'opacity-0'
          }`}></div>
        </div>
      </div>

      {/* Precision timer bar */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center">
        <div className="h-0.5 w-48 bg-gray-700 overflow-hidden">
          <div className={`h-full bg-gradient-to-r from-${brandColors.primary} to-${brandColors.secondary} transition-all duration-7000 ease-linear ${
            stage === 'init' ? 'w-0' : 'w-full'
          }`}></div>
        </div>
      </div>

      {/* Frosted glass overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
        stage === 'showcase' ? 'opacity-20' : 'opacity-0'
      }`} style={{
        background: `linear-gradient(135deg, ${brandColors.darkBg}22 0%, ${brandColors.lightBg}22 100%)`,
        backdropFilter: 'blur(1px)'
      }}></div>
    </div>
  );
};

export default Splash;