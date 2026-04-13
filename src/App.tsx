import React, { useState, useCallback } from 'react';
import CodeEditor from './components/CodeEditor';
import OutputCanvas from './components/OutputCanvas';
import Toolbar from './components/Toolbar';
import Footer from './components/Footer';

function App() {
  const [code, setCode] = useState<string>(`// Graphics H Compiler
// Write your graphics code here

#include <graphics.h>

int main() {
    int gd = DETECT, gm;
    initgraph(&gd, &gm, "");

    // Draw a colorful pattern
    setcolor(YELLOW);
    circle(320, 240, 100);

    setcolor(CYAN);
    rectangle(220, 140, 420, 340);

    setcolor(MAGENTA);
    line(220, 140, 420, 340);
    line(420, 140, 220, 340);

    getch();
    closegraph();
    return 0;
}`);

  const [output, setOutput] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleCompile = useCallback(() => {
    setIsCompiling(true);
    setOutput([]);

    // Simulate compilation process
    setTimeout(() => {
      const lines = code.split('\n');
      const compilationOutput: string[] = [
        '> Initializing Graphics H Compiler v2.1.0',
        '> Parsing source code...',
        `> Found ${lines.length} lines of code`,
        '> Checking syntax...',
        '> Linking graphics library...',
        '> Compiling to bytecode...',
        '> ✓ Compilation successful!',
        '> Rendering graphics output...',
      ];

      setOutput(compilationOutput);
      setShowOutput(true);
      setIsCompiling(false);
    }, 1500);
  }, [code]);

  const handleClear = useCallback(() => {
    setCode('');
    setOutput([]);
    setShowOutput(false);
  }, []);

  const handleReset = useCallback(() => {
    setCode(`// Graphics H Compiler
// Write your graphics code here

#include <graphics.h>

int main() {
    int gd = DETECT, gm;
    initgraph(&gd, &gm, "");

    // Your code here

    getch();
    closegraph();
    return 0;
}`);
    setOutput([]);
    setShowOutput(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0a0a0f] animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent tracking-tight">
                  Graphics H Compiler
                </h1>
                <p className="text-[10px] sm:text-xs text-zinc-500 tracking-widest uppercase">Online IDE • v2.1.0</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-zinc-400">Ready</span>
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-xs">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* Editor Panel */}
        <div className="flex-1 flex flex-col min-w-0">
          <Toolbar
            onCompile={handleCompile}
            onClear={handleClear}
            onReset={handleReset}
            isCompiling={isCompiling}
          />
          <CodeEditor code={code} onChange={setCode} />
        </div>

        {/* Output Panel */}
        <div className="flex-1 flex flex-col min-w-0 min-h-[300px] lg:min-h-0">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider">Output</span>
          </div>
          <OutputCanvas output={output} showGraphics={showOutput} isCompiling={isCompiling} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
