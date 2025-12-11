"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // simple scrollspy: observe sections and update active link
  useEffect(() => {
    const ids = ["ai", "why", "capabilities", "who", "access"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Bottom-centered navigation for all screen sizes (modern look) */}
      <nav
        role="navigation"
        aria-label="Primary"
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
      >
        <div className={`bg-black text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-6 ${scrolled ? 'shadow-xl' : 'shadow-lg'}`}>
          {/* Mobile: icons only */}
          <a href="#ai" aria-current={active === 'ai' ? 'page' : undefined} className={`flex flex-col items-center text-xs focus:outline-none focus:ring-2 focus:ring-white/40 text-white/80 sm:hidden`}>
            {/* Lightbulb icon for Solution */}
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className={`mb-1 ${active === 'ai' ? 'bg-white rounded-full p-1 text-black' : ''}`}> <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/><path d="M12 8v4" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="white"/></svg>
            <span className="sr-only">Solution</span>
          </a>
          {/* Desktop: text label */}
          <a href="#ai" aria-current={active === 'ai' ? 'page' : undefined} className={`hidden sm:flex flex-col items-center text-xs focus:outline-none focus:ring-2 focus:ring-white/40 ${active === 'ai' ? 'bg-white text-black rounded-full px-3 py-1 font-semibold' : 'text-white/80'}`}>
            <span className="text-sm font-medium">Solution</span>
            <span className="sr-only">Our AI</span>
          </a>

          <a href="#why" aria-current={active === 'why' ? 'page' : undefined} className={`flex flex-col items-center text-xs focus:outline-none focus:ring-2 focus:ring-white/40 text-white/80 sm:hidden`}>
            {/* Question mark icon for WhyUs */}
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className={`mb-1 ${active === 'why' ? 'bg-white rounded-full p-1 text-black' : ''}`}> <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="white">?</text></svg>
            <span className="sr-only">WhyUs</span>
          </a>
          <a href="#why" aria-current={active === 'why' ? 'page' : undefined} className={`hidden sm:flex flex-col items-center text-xs focus:outline-none focus:ring-2 focus:ring-white/40 ${active === 'why' ? 'bg-white text-black rounded-full px-3 py-1 font-semibold' : 'text-white/80'}`}>
            <span className="text-sm font-medium">WhyUs</span>
            <span className="sr-only">Why YOKO Styles</span>
          </a>

          <a href="#access" aria-current={active === 'access' ? 'page' : undefined} className={`flex flex-col items-center text-xs focus:outline-none focus:ring-2 focus:ring-white/40 text-white/80 sm:hidden`}>
            {/* Lock icon for Access */}
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className={`mb-1 ${active === 'access' ? 'bg-white rounded-full p-1 text-black' : ''}`}> <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/><rect x="9" y="12" width="6" height="4" rx="2" fill="white"/><rect x="10.5" y="14" width="3" height="2" rx="1" fill="black"/></svg>
            <span className="sr-only">Access</span>
          </a>
          <a href="#access" aria-current={active === 'access' ? 'page' : undefined} className={`hidden sm:flex flex-col items-center text-xs focus:outline-none focus:ring-2 focus:ring-white/40 ${active === 'access' ? 'bg-white text-black rounded-full px-3 py-1 font-semibold' : 'text-white/80'}`}>
            <span className="text-sm font-medium">Access</span>
            <span className="sr-only">Access Options</span>
          </a>

          <a href="/contact" aria-current={active === 'contact' ? 'page' : undefined} className={`flex flex-col items-center text-xs focus:outline-none focus:ring-2 focus:ring-white/40 text-white/80 sm:hidden`}>
            {/* Mail icon for Contact */}
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className={`mb-1 ${active === 'contact' ? 'bg-white rounded-full p-1 text-black' : ''}`}> <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/><rect x="7" y="10" width="10" height="6" rx="2" fill="white"/><path d="M7 10l5 4 5-4" stroke="black" strokeWidth="1.5"/></svg>
            <span className="sr-only">Contact</span>
          </a>
          <a href="/contact" aria-current={active === 'contact' ? 'page' : undefined} className={`hidden sm:flex flex-col items-center text-xs focus:outline-none focus:ring-2 focus:ring-white/40 ${active === 'contact' ? 'bg-white text-black rounded-full px-3 py-1 font-semibold' : 'text-white/80'}`}>
            <span className="text-sm font-medium">Contact</span>
            <span className="sr-only">Contact Us</span>
          </a>
        </div>
      </nav>
    </>
  );
}
