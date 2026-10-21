import React, { useState } from 'react';
import { CASE_STUDIES, TRUSTED_COMPANIES, FAQ_ITEMS } from '../data/mockData';
import { ChevronDown, Quote, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

interface CaseStudiesProps {
  onOpenDemo: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenDemo }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section id="customers" className="py-20 md:py-28 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Trusted By Strip */}
        <div className="text-center pb-16 border-b border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-8">
            Powering mission-critical infrastructure for leading engineering organizations
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {TRUSTED_COMPANIES.map((company) => (
              <div 
                key={company.name} 
                className="p-4 rounded-lg bg-slate-50/70 border border-slate-200/80 flex flex-col items-center justify-center transition-all hover:border-slate-300"
              >
                <span className="text-base font-bold tracking-tight text-slate-900 font-display">
                  {company.name}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  {company.tier}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header: Case Studies */}
        <div className="mt-16 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-2">
            <span>Verified Customer Impact</span>
            <span aria-hidden="true">·</span>
            <span>Production Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 [text-wrap:balance]">
            Proven at scale across high-volume production systems.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Read how global engineering teams migrated from legacy hyperscalers to Strata Cloud, cut latency by over 80%, and reclaimed infrastructure budgets.
          </p>
        </div>

        {/* 3 Detailed Case Study Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div 
              key={study.id} 
              className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-700" />
                    <span className="font-bold text-slate-900">{study.company}</span>
                  </div>
                  <span className="text-xs text-slate-500">{study.industry}</span>
                </div>

                {/* Summary */}
                <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                  {study.summary}
                </p>

                {/* Quantitative Impact Metrics (Concrete proof adjacent to claims) */}
                <div className="mt-6 space-y-3 p-4 rounded-lg bg-slate-50 border border-slate-200/80">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="flex items-baseline justify-between">
                      <div>
                        <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                          {metric.value}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {metric.timeframe}
                        </div>
                      </div>
                      <span className="text-xs font-medium text-blue-800 text-right">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Attributable Quote */}
                <div className="mt-6 relative">
                  <Quote className="h-4 w-4 text-slate-300 absolute -top-1 -left-1 opacity-50" />
                  <p className="pl-4 text-xs text-slate-700 italic leading-relaxed">
                    &ldquo;{study.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Author attribution */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-900">{study.author.name}</div>
                <div className="text-[11px] text-slate-500">{study.author.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Migration Callout */}
        <div className="mt-16 rounded-xl border border-blue-200 bg-blue-50/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                White-Glove Dual-Run Cloud Migration Program
              </h3>
              <p className="mt-1 text-xs text-slate-600 max-w-xl">
                Migrate critical production workloads with zero downtime. Strata provides dedicated solutions architects and credits during parallel evaluation.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Talk to a Solutions Architect</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Enterprise Architecture FAQ Section */}
        <div className="mt-20 pt-16 border-t border-slate-200 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              Frequently Asked Technical Questions
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Everything you need to know about Strata&apos;s virtualization, pricing, and compliance posture.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="rounded-lg border border-slate-200 bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm text-slate-900 hover:text-blue-700 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-700' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 mt-2 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
