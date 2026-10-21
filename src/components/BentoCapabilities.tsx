import React from 'react';
import { Cpu, Sparkles, Database, GitBranch, Shield, HardDrive, ArrowUpRight } from 'lucide-react';

interface BentoCapabilitiesProps {
  onOpenDemo: () => void;
}

export const BentoCapabilities: React.FC<BentoCapabilitiesProps> = ({ onOpenDemo }) => {
  return (
    <section id="platform" className="py-20 md:py-28 border-b border-slate-200 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-2">
            <span>Core Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Developer-First Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 [text-wrap:balance]">
            Engineered for high-throughput software companies and AI teams.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            From Git branch commits to global low-latency execution, Strata abstracts infrastructure complexity while delivering full hardware control.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 (Span 2): Serverless Micro-VM Runtime */}
          <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                  <Cpu className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">01. Virtualization Engine</span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Firecracker-Based Micro-VM Isolation
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-xl">
                Every request runs in an isolated Linux micro-VM with dedicated hardware virtualization. Launches in under 4.8 milliseconds with complete memory safety, zero container escape vectors, and true scale-to-zero pricing.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Cold Start</span>
                <span className="font-semibold text-slate-900 font-mono mt-0.5 block">&lt; 4.8 ms</span>
              </div>
              <div>
                <span className="text-slate-500 block">Memory Range</span>
                <span className="font-semibold text-slate-900 font-mono mt-0.5 block">128 MB – 64 GB</span>
              </div>
              <div>
                <span className="text-slate-500 block">Tenant Security</span>
                <span className="font-semibold text-slate-900 font-mono mt-0.5 block">Hardware KVM</span>
              </div>
            </div>
          </div>

          {/* Card 2 (Span 1): Elastic Tensor Core Pools */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">02. Model Serving</span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Pooled Tensor Core Inference
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                NVIDIA H100 and B200 clusters scheduled dynamically. Share high-bandwidth memory pools with zero GPU idle waste.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
              <span>Time-to-First-Token</span>
              <span className="font-semibold text-blue-700">14.8 ms</span>
            </div>
          </div>

          {/* Card 3 (Span 1): Sub-Millisecond Vector Cache */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                  <Database className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">03. In-Memory Store</span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Distributed Vector &amp; KV Cache
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Sub-3ms similarity search directly in memory at the edge. No external database network hops required for RAG context.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
              <span>Recall Latency</span>
              <span className="font-semibold text-slate-900">2.8 ms P99</span>
            </div>
          </div>

          {/* Card 4 (Span 2 with Infrastructure Image): Datacenter Fleet */}
          <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs flex flex-col lg:flex-row items-stretch">
            <div className="p-6 sm:p-8 lg:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <HardDrive className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">04. Bare Metal Fleet</span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  Tier-IV Cleanroom Hardware Infrastructure
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Owned and co-located compute nodes in over 310 data centers globally, connected via 120 Tbps redundant fiber optic backbones with dark fiber failover paths.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span>Carbon-neutral datacenter operations</span>
                </div>
                <button
                  onClick={onOpenDemo}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800"
                >
                  <span>Request Capacity Audit</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Generated Datacenter Image Asset with styled fallback */}
            <div className="relative lg:w-1/2 min-h-[220px] bg-slate-900 overflow-hidden">
              <img
                src="/src/assets/images/datacenter_fleet_infrastructure_1792584256120.jpg"
                alt="Strata Cloud enterprise datacenter infrastructure with illuminated server racks"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  // Fallback container if local asset is unavailable
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-[11px] font-mono text-white/90">
                Cluster IAD-04 · Northern Virginia Facility
              </div>
            </div>
          </div>

          {/* Card 5 (Span 3): Git Push Deployments & Governance */}
          <div className="md:col-span-3 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div>
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 w-fit">
                  <GitBranch className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  Instant Git Push Workflows
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  Deploy previews automatically for every GitHub pull request with zero configuration files.
                </p>
              </div>

              <div>
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 w-fit">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  Hardware Enclaves &amp; Compliance
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  AMD SEV-SNP cryptographic memory encryption ensures even Strata operators cannot read tenant memory.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <span className="text-xs font-semibold text-slate-900">Ready to migrate your workload?</span>
                <p className="mt-1 text-xs text-slate-500">
                  Our architecture team provides white-glove migration assistance and dual-run validation.
                </p>
                <button
                  onClick={onOpenDemo}
                  className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 transition-colors w-full"
                >
                  Schedule Technical Architecture Review
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
