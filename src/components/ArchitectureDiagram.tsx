import React, { useState } from 'react';
import { ARCHITECTURE_NODES } from '../data/mockData';
import { ArchitectureNode } from '../types';
import { 
  Globe, 
  Cpu, 
  Sparkles, 
  Database, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(ARCHITECTURE_NODES[0].id);
  const [simulationActive, setSimulationActive] = useState<boolean>(false);

  const selectedNode = ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) || ARCHITECTURE_NODES[0];

  const getNodeIcon = (category: ArchitectureNode['category']) => {
    switch (category) {
      case 'Edge': return <Globe className="h-5 w-5 text-blue-700" />;
      case 'Compute': return <Cpu className="h-5 w-5 text-indigo-700" />;
      case 'AI Inference': return <Sparkles className="h-5 w-5 text-blue-800" />;
      case 'Storage': return <Database className="h-5 w-5 text-slate-800" />;
      case 'Security': return <ShieldCheck className="h-5 w-5 text-emerald-700" />;
    }
  };

  return (
    <section id="architecture" className="py-20 md:py-28 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-2">
              <span>Infrastructure Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Hardware Isolation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 [text-wrap:balance]">
              Deterministic performance across the entire compute stack.
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              Inspect how requests traverse our global AnyCast network, boot dedicated KVM micro-VMs in milliseconds, and stream from distributed GPU tensor pools without cold-start penalties.
            </p>
          </div>

          {/* Interactive Simulation Switch */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setSimulationActive(!simulationActive)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
                simulationActive
                  ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-xs'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${simulationActive ? 'animate-spin text-blue-700' : 'text-slate-500'}`} />
              <span>{simulationActive ? 'Simulating Dynamic Failover' : 'Simulate Node Failover'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Architecture Workspace */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Topology Node Graph */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="text-xs font-medium text-slate-500 mb-1">
              Select an architectural layer to inspect telemetry and specifications:
            </div>

            {ARCHITECTURE_NODES.map((node, index) => {
              const isSelected = node.id === selectedNodeId;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`group relative text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-white border border-slate-200'}`}>
                        {getNodeIcon(node.category)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-400">0{index + 1}</span>
                          <h3 className={`text-sm font-semibold ${isSelected ? 'text-blue-950' : 'text-slate-900'}`}>
                            {node.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                          {node.summary}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className={`h-4 w-4 mt-1 transition-transform ${isSelected ? 'text-blue-700 translate-x-1' : 'text-slate-300 group-hover:text-slate-500'}`} />
                  </div>

                  {/* Micro telemetry indicator */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{node.category} Layer</span>
                    <span className="font-semibold text-slate-700">{node.specifications.latency}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Node Inspector */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              
              {/* Node Inspector Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                    <span>Active Inspection</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-blue-700 font-semibold">{selectedNode.category}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {selectedNode.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Verified Architecture</span>
                </div>
              </div>

              {/* Node Summary */}
              <p className="mt-6 text-sm text-slate-600 leading-relaxed">
                {selectedNode.summary}
              </p>

              {/* Live Technical Specifications Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500">Latency Target</span>
                  <div className="mt-1 text-sm font-semibold text-slate-900 font-mono tabular-nums">
                    {selectedNode.specifications.latency}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500">Throughput</span>
                  <div className="mt-1 text-sm font-semibold text-slate-900 font-mono tabular-nums">
                    {selectedNode.specifications.throughput}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500">Redundancy</span>
                  <div className="mt-1 text-sm font-semibold text-slate-900 font-mono tabular-nums">
                    {selectedNode.specifications.redundancy}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500">Protocol</span>
                  <div className="mt-1 text-sm font-semibold text-slate-900 font-mono tabular-nums">
                    {selectedNode.specifications.protocol}
                  </div>
                </div>
              </div>

              {/* Architectural Features */}
              <div className="mt-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Engineering Capabilities &amp; Guarantees
                </h4>
                <ul className="mt-4 space-y-3">
                  {selectedNode.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-700 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Telemetry Status Box */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                    <Activity className="h-4 w-4 text-blue-700" />
                    <span>Real-Time Fleet Telemetry</span>
                  </div>
                  {simulationActive && (
                    <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Rerouting Active: 0 dropped packets
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 rounded border border-slate-200 bg-slate-50/70">
                    <span className="text-slate-500 block">Instances</span>
                    <span className="text-slate-900 font-semibold mt-1 block">{selectedNode.telemetry.activeInstances}</span>
                  </div>

                  <div className="p-3 rounded border border-slate-200 bg-slate-50/70">
                    <span className="text-slate-500 block">P99 Latency</span>
                    <span className="text-slate-900 font-semibold mt-1 block">{selectedNode.telemetry.p99Latency}</span>
                  </div>

                  <div className="p-3 rounded border border-slate-200 bg-slate-50/70">
                    <span className="text-slate-500 block">Node Health</span>
                    <span className="text-emerald-700 font-semibold mt-1 block">{selectedNode.telemetry.healthyNodes}</span>
                  </div>

                  <div className="p-3 rounded border border-slate-200 bg-slate-50/70">
                    <span className="text-slate-500 block">Bandwidth</span>
                    <span className="text-slate-900 font-semibold mt-1 block">{selectedNode.telemetry.egressBandwidth}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
