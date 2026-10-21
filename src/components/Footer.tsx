import React from 'react';
import { Terminal } from 'lucide-react';

interface FooterProps {
  onOpenDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo }) => {
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-100">
          
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-700 text-white">
                <Terminal className="h-4 w-4" />
              </div>
              <span>Strata Cloud</span>
            </div>
            
            <p className="mt-4 text-xs text-slate-600 leading-relaxed max-w-sm">
              Global serverless micro-VM compute, low-latency AI inference, and developer platforms for high-throughput engineering teams.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
              <span>Network status: All 314 Edge PoPs operational</span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
              <li><a href="#platform" className="hover:text-blue-700 transition-colors">Micro-VM Compute</a></li>
              <li><a href="#architecture" className="hover:text-blue-700 transition-colors">Tensor Inference Pools</a></li>
              <li><a href="#architecture" className="hover:text-blue-700 transition-colors">Distributed Vector Cache</a></li>
              <li><a href="#architecture" className="hover:text-blue-700 transition-colors">Global AnyCast Edge</a></li>
              <li><a href="#platform" className="hover:text-blue-700 transition-colors">Git Push-to-Deploy</a></li>
            </ul>
          </div>

          {/* Column 2: Developers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Developers
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
              <li><a href="#playground" className="hover:text-blue-700 transition-colors">Live API Playground</a></li>
              <li><a href="#pricing" className="hover:text-blue-700 transition-colors">ROI Calculator</a></li>
              <li><a href="#architecture" className="hover:text-blue-700 transition-colors">System Topology</a></li>
              <li><a href="#customers" className="hover:text-blue-700 transition-colors">Case Studies</a></li>
              <li><a href="#customers" className="hover:text-blue-700 transition-colors">Technical Architecture FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Enterprise */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Enterprise
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
              <li>
                <button onClick={onOpenDemo} className="hover:text-blue-700 transition-colors text-left">
                  Schedule Discovery
                </button>
              </li>
              <li>
                <button onClick={onOpenDemo} className="hover:text-blue-700 transition-colors text-left">
                  White-Glove Migration
                </button>
              </li>
              <li><span className="text-slate-400">SOC 2 Type II Report</span></li>
              <li><span className="text-slate-400">HIPAA BAA Agreement</span></li>
              <li><span className="text-slate-400">99.999% SLA Terms</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Strata Cloud Technologies, Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-700 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-700 cursor-pointer">Security Whitepaper</span>
            <span className="hover:text-slate-700 cursor-pointer">System Status</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
