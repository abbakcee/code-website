import React, { useState } from 'react';
import { CODE_SNIPPETS } from '../data/mockData';
import { LanguageOption } from '../types';
import { Check, Copy, ArrowRight, Server, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo }) => {
  const [activeLang, setActiveLang] = useState<LanguageOption>('typescript');
  const [copied, setCopied] = useState(false);

  const currentSnippet = CODE_SNIPPETS.find((s) => s.id === activeLang) || CODE_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200 bg-linear-to-b from-slate-50/50 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Trust marker row (Unboxed text with middot separators as per Zero-Pill discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <span className="text-blue-700 font-semibold">Strata Platform v3.4</span>
          <span aria-hidden="true">·</span>
          <span>310+ Global Edge Locations</span>
          <span aria-hidden="true">·</span>
          <span>SOC 2 Type II & HIPAA Certified</span>
          <span aria-hidden="true">·</span>
          <span>Sub-5ms Cold Starts</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Proposition and Call to Action */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] [text-wrap:balance]">
              Serverless compute and AI inference at the global edge.
            </h1>
            
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
              Boot isolated Linux micro-VMs in under 5 milliseconds. Serve quantized LLMs with pooled GPU acceleration and 48% lower compute overhead than legacy hyperscalers.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 whitespace-nowrap shrink-0"
              >
                <span>Schedule Enterprise Demo</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#architecture"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
              >
                Explore System Architecture
              </a>
            </div>

            {/* Quick architectural guarantees */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-slate-200">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <Zap className="h-4 w-4 text-blue-700 shrink-0" />
                  <span>Instant Boot</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">Zero cold-start delay</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <Server className="h-4 w-4 text-blue-700 shrink-0" />
                  <span>H100 / B200 Pool</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">Sub-20ms TTFT latency</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <ShieldCheck className="h-4 w-4 text-blue-700 shrink-0" />
                  <span>KVM Isolated</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">Hardware micro-VM</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code Sandbox Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-slate-800 bg-slate-950 shadow-xl overflow-hidden">
              
              {/* Header with interactive segmented language controls */}
              <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-slate-700 inline-block"></span>
                  <span className="h-3 w-3 rounded-full bg-slate-700 inline-block"></span>
                  <span className="h-3 w-3 rounded-full bg-slate-700 inline-block"></span>
                  <span className="ml-2 text-xs font-mono text-slate-400">{currentSnippet.filename}</span>
                </div>

                {/* Interactive language buttons (Segmented control) */}
                <div className="flex items-center gap-1 rounded-md bg-slate-950/80 p-0.5 border border-slate-800">
                  {CODE_SNIPPETS.map((snippet) => (
                    <button
                      key={snippet.id}
                      onClick={() => setActiveLang(snippet.id)}
                      className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                        activeLang === snippet.id
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {snippet.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code viewer with copy action */}
              <div className="relative">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/50 bg-slate-900/40 text-[11px] text-slate-400 font-mono">
                  <span>Runtime: {currentSnippet.runtime}</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                    aria-label="Copy code to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy snippet</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-slate-300 max-h-[380px]">
                  <pre>
                    <code>{currentSnippet.code}</code>
                  </pre>
                </div>
              </div>

              {/* Bottom execution footer */}
              <div className="border-t border-slate-800/80 bg-slate-900/60 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-400 font-mono">Deployable via <span className="text-blue-400">strata deploy --prod</span></span>
                <span className="font-mono text-slate-400">P99: 4.8ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column KPI Strip below the hero split */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-200">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-mono tabular-nums">
              &lt; 4.8 ms
            </div>
            <p className="mt-1 text-sm font-medium text-slate-700">Cold Start Boot Latency</p>
            <p className="text-xs text-slate-500">Hardware KVM micro-VMs</p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-mono tabular-nums">
              314
            </div>
            <p className="mt-1 text-sm font-medium text-slate-700">AnyCast Edge PoPs</p>
            <p className="text-xs text-slate-500">Across 110 countries</p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-mono tabular-nums">
              99.999%
            </div>
            <p className="mt-1 text-sm font-medium text-slate-700">Enterprise SLA Uptime</p>
            <p className="text-xs text-slate-500">Active-active multi-region</p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-mono tabular-nums">
              48%
            </div>
            <p className="mt-1 text-sm font-medium text-slate-700">Average TCO Savings</p>
            <p className="text-xs text-slate-500">Versus AWS &amp; Google Cloud</p>
          </div>
        </div>

      </div>
    </section>
  );
};
