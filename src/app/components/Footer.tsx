"use client"
import React from 'react';

export default function Footer() {
    function toTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  
    return (
      <footer className="relative mt-20 border-t border-neutral-800 bg-black text-white overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="relative z-10 px-6 py-12 md:py-20 max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-end">
          
          <div className="flex flex-col space-y-6">
            <div className="font-mono text-red-500 text-sm">END OF STREAM</div>
            <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter uppercase select-none text-neutral-800 hover:text-neutral-700 transition-colors duration-500">
              Uchenna
            </h2>
          </div>

          <div className="flex flex-col items-end space-y-8 mt-10 md:mt-0">
            <button 
                onClick={toTop}
                className="group flex items-center space-x-4 hover:opacity-80 transition-opacity"
            >
              <span className="font-mono text-sm tracking-widest text-neutral-400 group-hover:text-red-500 transition-colors">INITIATE_ASCENT</span>
              <div className="w-12 h-12 border border-neutral-700 flex items-center justify-center group-hover:bg-red-900/20 group-hover:border-red-500 transition-all">
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                    className="group-hover:-translate-y-1 transition-transform duration-300"
                >
                    <path d="M12 19V5M12 5L5 12M12 5L19 12" />
                </svg>
              </div>
            </button>
            
            <div className="flex space-x-8 font-mono text-xs text-neutral-500">
              <p>© 2024 UCHENNA NJOKU</p>
              <p>DESIGNED & CODED // ❤️‍🔥</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
