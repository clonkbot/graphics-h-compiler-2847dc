import React, { useEffect, useRef } from 'react';

interface OutputCanvasProps {
  output: string[];
  showGraphics: boolean;
  isCompiling: boolean;
}

const OutputCanvas: React.FC<OutputCanvasProps> = ({ output, showGraphics, isCompiling }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (showGraphics && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas with dark background
      ctx.fillStyle = '#0f0f17';
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) / 500;

      // Animated drawing
      let frame = 0;
      const maxFrames = 60;

      const animate = () => {
        frame++;
        const progress = Math.min(frame / maxFrames, 1);

        // Clear and redraw background each frame
        ctx.fillStyle = '#0f0f17';
        ctx.fillRect(0, 0, width, height);

        // Redraw grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        for (let x = 0; x < width; x += 20) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 20) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Draw glow effect
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150 * scale);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 150 * scale * progress, 0, Math.PI * 2);
        ctx.fill();

        // Draw yellow circle with glow
        if (progress > 0.1) {
          const circleProgress = Math.min((progress - 0.1) / 0.3, 1);
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 20;
          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, 100 * scale, 0, Math.PI * 2 * circleProgress);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Draw cyan rectangle
        if (progress > 0.3) {
          const rectProgress = Math.min((progress - 0.3) / 0.3, 1);
          ctx.shadowColor = '#22d3d8';
          ctx.shadowBlur = 15;
          ctx.strokeStyle = '#22d3d8';
          ctx.lineWidth = 2;
          ctx.beginPath();

          const rectWidth = 200 * scale;
          const rectHeight = 200 * scale;
          const x = centerX - rectWidth / 2;
          const y = centerY - rectHeight / 2;

          // Draw rectangle progressively
          const perimeter = (rectWidth + rectHeight) * 2;
          const currentLength = perimeter * rectProgress;

          ctx.moveTo(x, y);
          if (currentLength <= rectWidth) {
            ctx.lineTo(x + currentLength, y);
          } else if (currentLength <= rectWidth + rectHeight) {
            ctx.lineTo(x + rectWidth, y);
            ctx.lineTo(x + rectWidth, y + (currentLength - rectWidth));
          } else if (currentLength <= rectWidth * 2 + rectHeight) {
            ctx.lineTo(x + rectWidth, y);
            ctx.lineTo(x + rectWidth, y + rectHeight);
            ctx.lineTo(x + rectWidth - (currentLength - rectWidth - rectHeight), y + rectHeight);
          } else {
            ctx.lineTo(x + rectWidth, y);
            ctx.lineTo(x + rectWidth, y + rectHeight);
            ctx.lineTo(x, y + rectHeight);
            ctx.lineTo(x, y + rectHeight - (currentLength - rectWidth * 2 - rectHeight));
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Draw magenta diagonal lines
        if (progress > 0.6) {
          const lineProgress = Math.min((progress - 0.6) / 0.4, 1);
          ctx.shadowColor = '#e879f9';
          ctx.shadowBlur = 15;
          ctx.strokeStyle = '#e879f9';
          ctx.lineWidth = 2;

          const size = 100 * scale;

          // First diagonal
          ctx.beginPath();
          ctx.moveTo(centerX - size, centerY - size);
          ctx.lineTo(
            centerX - size + 2 * size * lineProgress,
            centerY - size + 2 * size * lineProgress
          );
          ctx.stroke();

          // Second diagonal
          ctx.beginPath();
          ctx.moveTo(centerX + size, centerY - size);
          ctx.lineTo(
            centerX + size - 2 * size * lineProgress,
            centerY - size + 2 * size * lineProgress
          );
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        if (frame < maxFrames) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  }, [showGraphics]);

  return (
    <div className="flex-1 flex flex-col rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl shadow-2xl shadow-black/50">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-2 sm:px-4 py-2 border-b border-white/5 bg-black/30 overflow-x-auto">
        <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap">
          Console
        </button>
        <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors whitespace-nowrap">
          Graphics
        </button>
        <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors whitespace-nowrap">
          Errors
        </button>
      </div>

      {/* Output area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Console output */}
        <div className="flex-1 p-3 sm:p-4 overflow-auto font-mono text-[10px] sm:text-xs border-b lg:border-b-0 lg:border-r border-white/5 min-h-[120px] lg:min-h-0">
          {isCompiling ? (
            <div className="flex items-center gap-2 text-purple-400">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Compiling...</span>
            </div>
          ) : output.length > 0 ? (
            <div className="space-y-1">
              {output.map((line, i) => (
                <div
                  key={i}
                  className={`${
                    line.includes('✓') ? 'text-emerald-400' :
                    line.includes('>') ? 'text-zinc-400' :
                    'text-zinc-500'
                  } animate-fade-in`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {line}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-zinc-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-[10px] sm:text-xs">Click "Compile & Run" to see output</span>
            </div>
          )}
        </div>

        {/* Graphics canvas */}
        <div className="flex-1 relative bg-[#0f0f17] min-h-[200px] lg:min-h-0">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
          {!showGraphics && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-white/5">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-zinc-600 text-[10px] sm:text-xs">Graphics output will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputCanvas;
