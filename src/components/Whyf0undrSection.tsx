import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  GitBranch, 
  Users, 
  Zap, 
  Lock, 
  Sparkles 
} from 'lucide-react';


export const Whyf0undrSection: React.FC = () => {
  const pillars = [
    {
      icon: <Users className="w-6 h-6 text-orange-400" />,
      title: 'Principal Engineers Only',
      description: 'You work directly with M.Huzaifa, Abdull Rehman Khizar, and the f0undr fellows. No account managers or outsourced junior code.'
    },
    {
      icon: <GitBranch className="w-6 h-6 text-emerald-400" />,
      title: '100% Repository Transfer',
      description: 'Every commit, asset, Dockerfile, Figma frame, and prompt benchmark is completely yours. Zero vendor lock-in, forever.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'High-Velocity Sprints',
      description: 'From wireframe to working live staging prototype in days, not months. We prioritize production-grade speed and reliability.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: 'State-of-the-Art Toolchain',
      description: 'Next.js, Flutter, Python 3.12, Gemini 2.0 AI, Blender 3D, and Three.js. Built for 99+ Lighthouse scores and sub-second latency.'
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-400" />,
      title: 'Confidentiality & Mutual NDA',
      description: 'Your business secret algorithms, unreleased products, and competitive models remain strictly confidential.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-orange-500" />,
      title: 'Post-Launch Technical Warranty',
      description: 'Complimentary 14 to 30 days of production monitoring, DNS hookup, bug resolution, and developer handover walkthroughs.'
    }
  ];

  return (
    <section className="py-20 bg-stone-900/30 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The f0undr Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Why Founders &amp; Builders Commission Us
          </h2>
          <p className="text-stone-400 text-base sm:text-lg">
            Engineering rigor meets commercial instinct. We build high-leverage software assets designed to compound.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-stone-950/70 border border-stone-800/80 hover:border-orange-500/40 transition-all group"
            >
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 w-fit mb-4 group-hover:bg-stone-850 transition-colors">
                {p.icon}
              </div>
              <h4 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {p.title}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-normal">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote Banner */}
        <div className="mt-16 p-8 rounded-3xl glass-panel border border-stone-800 text-center max-w-3xl mx-auto">
          <blockquote className="text-lg sm:text-xl font-serif italic text-stone-200 mb-3">
            "Compound effort beats linear hustle every single time. Build software that gives your venture unfair leverage."
          </blockquote>
          <span className="text-xs font-mono text-orange-400">
            — f0undr Atelier Manifesto · Khizar · f0undr · Huzaifa
          </span>
        </div>

      </div>
    </section>
  );
};
