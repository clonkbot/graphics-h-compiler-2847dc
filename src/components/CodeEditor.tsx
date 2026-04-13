import React, { useRef, useEffect } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = code.split('\n');
  const lineCount = lines.length;

  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;

    if (textarea && lineNumbers) {
      const syncScroll = () => {
        lineNumbers.scrollTop = textarea.scrollTop;
      };
      textarea.addEventListener('scroll', syncScroll);
      return () => textarea.removeEventListener('scroll', syncScroll);
    }
  }, []);

  const highlightSyntax = (line: string): React.ReactNode => {
    // Simple syntax highlighting
    const keywords = /\b(int|void|char|float|double|return|if|else|for|while|do|switch|case|break|continue|include|define)\b/g;
    const types = /\b(DETECT|YELLOW|CYAN|MAGENTA|RED|GREEN|BLUE|WHITE|BLACK)\b/g;
    const functions = /\b(main|printf|scanf|initgraph|closegraph|getch|circle|rectangle|line|setcolor|putpixel|outtextxy)\b/g;
    const strings = /(["'])(?:(?=(\\?))\2.)*?\1/g;
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/g;
    const numbers = /\b(\d+)\b/g;
    const preprocessor = /(#\w+)/g;

    let result = line;

    // Create spans for different token types
    result = result.replace(comments, '<span class="text-zinc-500 italic">$1</span>');
    result = result.replace(preprocessor, '<span class="text-pink-400">$1</span>');
    result = result.replace(strings, '<span class="text-amber-400">$&</span>');
    result = result.replace(keywords, '<span class="text-purple-400 font-medium">$1</span>');
    result = result.replace(types, '<span class="text-cyan-400">$1</span>');
    result = result.replace(functions, '<span class="text-emerald-400">$1</span>');
    result = result.replace(numbers, '<span class="text-orange-400">$1</span>');

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className="flex-1 relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl shadow-2xl shadow-black/50">
      {/* Editor header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-white/5 bg-black/30">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
          </div>
          <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-zinc-500 font-mono">main.c</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-zinc-600">
          <span>UTF-8</span>
          <span>•</span>
          <span>C</span>
          <span>•</span>
          <span>{lineCount} lines</span>
        </div>
      </div>

      {/* Code area */}
      <div className="flex h-[calc(100%-3rem)] sm:h-[calc(100%-3.5rem)]">
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className="flex-shrink-0 w-10 sm:w-14 py-3 sm:py-4 text-right pr-2 sm:pr-3 border-r border-white/5 bg-black/20 overflow-hidden select-none"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i}
              className="text-[10px] sm:text-xs font-mono text-zinc-600 leading-5 sm:leading-6 h-5 sm:h-6"
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Syntax highlighted preview (behind textarea) */}
        <div className="absolute left-10 sm:left-14 right-0 top-[2.75rem] sm:top-[3.25rem] bottom-0 overflow-auto p-3 sm:p-4 pointer-events-none">
          <pre className="font-mono text-xs sm:text-sm leading-5 sm:leading-6 whitespace-pre-wrap break-all text-transparent">
            {lines.map((line, i) => (
              <div key={i} className="h-5 sm:h-6">
                {highlightSyntax(line || ' ')}
              </div>
            ))}
          </pre>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-3 sm:p-4 font-mono text-xs sm:text-sm leading-5 sm:leading-6 bg-transparent text-zinc-300 resize-none outline-none caret-purple-400 selection:bg-purple-500/30"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default CodeEditor;
