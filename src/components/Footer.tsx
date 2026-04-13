import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-[10px] sm:text-xs text-zinc-600 tracking-wide">
          Requested by <span className="text-zinc-500">@web-user</span> · Built by <span className="text-zinc-500">@clonkbot</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
