import React, { useState } from 'react';
import { ArrowRight, Check, DollarSign, TrendingDown } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenDemo: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenDemo }) => {
  const [requestsMillions, setRequestsMillions] = useState<number>(50);
  const [gpuHours, setGpuHours] = useState<number>(600);
  const [egressTb, setEgressTb] = useState<number>(15);
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  // Financial calculations
  // Legacy Cloud (AWS / GCP) benchmarks
  const legacyRequestCost = requestsMillions * 14.5; // ~$0.20/M + micro-VM overhead
  const legacyGpuCost = gpuHours * 3.85; // $3.85/hr for dedicated H100
  const legacyEgressCost = egressTb * 90; // $0.09/GB = $90/TB
  const totalLegacyMonthly = legacyRequestCost + legacyGpuCost + legacyEgressCost;

  // Strata Cloud optimized rates
  const strataRequestCost = Math.max(0, (requestsMillions - 10)) * 7.2; // First 10M free, then $0.10/M equiv
  const strataGpuCost = gpuHours * 1.95; // $1.95/hr pooled FP8 execution
  const strataEgressCost = Math.max(0, (egressTb - 5)) * 10; // First 5TB free, then $0.01/GB = $10/TB
  const baseStrataMonthly = strataRequestCost + strataGpuCost + strataEgressCost + 120; // Base platform SLA
  const totalStrataMonthly = isAnnual ? baseStrataMonthly * 0.85 : baseStrataMonthly;

  const monthlySavings = Math.max(0, totalLegacyMonthly - totalStrataMonthly);
  const annualSavings = monthlySavings * 12;
  const savingsPercent = totalLegacyMonthly > 0 ? Math.round((monthlySavings / totalLegacyMonthly) * 100) : 0;

  return (
    <section id="pricing" className="py-20 md:py-28 border-b border-slate-200 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-700 mb-2">
            <span>Transparent Infrastructure Economics</span>
            <span aria-hidden="true">·</span>
            <span>Zero Egress Markup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 [text-wrap:balance]">
            Calculate your monthly cloud infrastructure ROI.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Model your real compute workloads. See transparent cost breakdowns and projected savings compared to AWS Lambda, ECS, and dedicated GPU clusters.
          </p>

          {/* Billing Interval Toggle (Segmented control) */}
          <div className="mt-8 inline-flex items-center p-1 rounded-lg bg-slate-200/80 border border-slate-300">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                !isAnnual
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                isAnnual
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Annual Prepaid (Save 15%)
            </button>
          </div>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Sliders for Workload Configuration */}
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6">
                Workload Parameters
              </h3>

              {/* Slider 1: Requests */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="requests-slider" className="text-sm font-semibold text-slate-700">
                    Monthly Serverless Requests
                  </label>
                  <span className="text-sm font-mono font-bold text-blue-700 tabular-nums">
                    {requestsMillions} Million / mo
                  </span>
                </div>
                <input
                  id="requests-slider"
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={requestsMillions}
                  onChange={(e) => setRequestsMillions(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>5M</span>
                  <span>150M</span>
                  <span>300M+</span>
                </div>
              </div>

              {/* Slider 2: GPU Hours */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="gpu-slider" className="text-sm font-semibold text-slate-700">
                    Pooled GPU Inference Hours (H100 / B200)
                  </label>
                  <span className="text-sm font-mono font-bold text-blue-700 tabular-nums">
                    {gpuHours.toLocaleString()} Hours / mo
                  </span>
                </div>
                <input
                  id="gpu-slider"
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={gpuHours}
                  onChange={(e) => setGpuHours(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>0 hrs (Compute only)</span>
                  <span>1,500 hrs</span>
                  <span>3,000 hrs</span>
                </div>
              </div>

              {/* Slider 3: Egress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="egress-slider" className="text-sm font-semibold text-slate-700">
                    Outbound Network Egress Traffic
                  </label>
                  <span className="text-sm font-mono font-bold text-blue-700 tabular-nums">
                    {egressTb} Terabytes / mo
                  </span>
                </div>
                <input
                  id="egress-slider"
                  type="range"
                  min="1"
                  max="80"
                  step="1"
                  value={egressTb}
                  onChange={(e) => setEgressTb(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>1 TB</span>
                  <span>40 TB</span>
                  <span>80 TB</span>
                </div>
              </div>
            </div>

            {/* Included Guarantees */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>Zero cold-start overage fee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>310+ Global Edge PoPs included</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>99.999% SLA guaranteed</span>
              </span>
            </div>
          </div>

          {/* Right Column: Comparative Savings & Summary Card */}
          <div className="lg:col-span-5 rounded-xl border border-slate-900 bg-slate-900 text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Cost Analysis Summary
                </span>
                <span className="text-xs font-medium text-blue-400">
                  {isAnnual ? 'Prepaid (15% off applied)' : 'Standard Monthly'}
                </span>
              </div>

              {/* Comparison Numbers */}
              <div className="mt-6 space-y-4">
                <div className="flex items-baseline justify-between p-3 rounded-lg bg-slate-800/60 border border-slate-800">
                  <span className="text-xs text-slate-400">Legacy Cloud (AWS / GCP):</span>
                  <span className="text-lg font-mono font-semibold text-slate-300 tabular-nums">
                    ${Math.round(totalLegacyMonthly).toLocaleString()} / mo
                  </span>
                </div>

                <div className="flex items-baseline justify-between p-4 rounded-lg bg-blue-950/70 border border-blue-700/60">
                  <div>
                    <span className="text-xs font-semibold text-blue-300 block">Strata Cloud Platform:</span>
                    <span className="text-[11px] text-slate-400 font-mono">Billed transparently</span>
                  </div>
                  <span className="text-2xl font-mono font-bold text-white tabular-nums">
                    ${Math.round(totalStrataMonthly).toLocaleString()} / mo
                  </span>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="mt-6 p-4 rounded-lg bg-emerald-950/50 border border-emerald-800/60">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <TrendingDown className="h-4 w-4" />
                  <span>Calculated Net ROI Savings</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-mono font-extrabold text-emerald-300 tabular-nums">
                    ${Math.round(monthlySavings).toLocaleString()}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">/ month savings ({savingsPercent}%)</span>
                </div>
                <p className="mt-1 text-xs text-slate-300 font-mono">
                  Equivalent to ${Math.round(annualSavings).toLocaleString()} annual budget saved
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={onOpenDemo}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                <span>Request Custom Enterprise Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <DollarSign className="h-3.5 w-3.5 text-blue-400" />
                <span>Custom pilot credits up to $50,000 for qualifying migrations</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
