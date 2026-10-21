import React, { useState } from 'react';
import { PLAYGROUND_ENDPOINTS } from '../data/mockData';
import { Play, Copy, Check, Terminal, RotateCcw } from 'lucide-react';

export const ApiPlayground: React.FC = () => {
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>(PLAYGROUND_ENDPOINTS[0].id);
  const selectedEndpoint = PLAYGROUND_ENDPOINTS.find((e) => e.id === selectedEndpointId) || PLAYGROUND_ENDPOINTS[0];

  const [payloadText, setPayloadText] = useState<string>(
    JSON.stringify(selectedEndpoint.samplePayload, null, 2)
  );
  const [payloadError, setPayloadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseOutput, setResponseOutput] = useState<Record<string, unknown> | null>(() => 
    selectedEndpoint.generateResponse(selectedEndpoint.samplePayload)
  );
  const [executionTime, setExecutionTime] = useState<number>(selectedEndpoint.simulatedResponseTime);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectEndpoint = (id: string) => {
    const ep = PLAYGROUND_ENDPOINTS.find((e) => e.id === id);
    if (ep) {
      setSelectedEndpointId(id);
      setPayloadText(JSON.stringify(ep.samplePayload, null, 2));
      setPayloadError(null);
      setResponseOutput(ep.generateResponse(ep.samplePayload));
      setExecutionTime(ep.simulatedResponseTime);
    }
  };

  const handlePayloadChange = (val: string) => {
    setPayloadText(val);
    try {
      JSON.parse(val);
      setPayloadError(null);
    } catch {
      setPayloadError('Invalid JSON format');
    }
  };

  const handleResetPayload = () => {
    setPayloadText(JSON.stringify(selectedEndpoint.samplePayload, null, 2));
    setPayloadError(null);
  };

  const handleExecuteRequest = () => {
    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(payloadText);
      setPayloadError(null);
    } catch {
      setPayloadError('Cannot execute: Please fix JSON syntax.');
      return;
    }

    setIsLoading(true);
    const start = performance.now();

    // Simulate realistic asynchronous edge network & model execution latency
    const targetLatency = selectedEndpoint.simulatedResponseTime + Math.floor(Math.random() * 8) - 4;
    setTimeout(() => {
      const elapsed = Math.round(performance.now() - start);
      setExecutionTime(Math.max(8, elapsed));
      setResponseOutput(selectedEndpoint.generateResponse(parsed));
      setIsLoading(false);
    }, targetLatency + 120);
  };

  const handleCopyResponse = () => {
    if (!responseOutput) return;
    navigator.clipboard.writeText(JSON.stringify(responseOutput, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-20 md:py-28 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-2">
              <span>Interactive API Console</span>
              <span aria-hidden="true">·</span>
              <span>Live Request Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 [text-wrap:balance]">
              Test edge inference and micro-VM invocations live.
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              Execute test payloads against Strata&apos;s API gateway simulator. Inspect headers, payload serialization, and verified latency metrics in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Gateway status:</span>
            <span className="font-semibold text-emerald-700">HTTP/3 200 OK</span>
          </div>
        </div>

        {/* Playground Workbench */}
        <div className="mt-12 rounded-xl border border-slate-800 bg-slate-950 shadow-xl overflow-hidden">
          
          {/* Top Bar: Endpoint Switcher & HTTP Path Bar */}
          <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Segmented Endpoint Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {PLAYGROUND_ENDPOINTS.map((endpoint) => {
                const isActive = endpoint.id === selectedEndpointId;
                return (
                  <button
                    key={endpoint.id}
                    onClick={() => handleSelectEndpoint(endpoint.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {endpoint.name}
                  </button>
                );
              })}
            </div>

            {/* Path & Method Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-blue-900/80 text-blue-300 font-semibold border border-blue-700/50">
                {selectedEndpoint.method}
              </span>
              <span className="text-slate-300">https://api.stratacloud.io{selectedEndpoint.path}</span>
            </div>
          </div>

          {/* Workbench Split: Request Editor & Response Viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            
            {/* Left Column: Request Payload Editor */}
            <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-blue-400" />
                    <span className="font-semibold text-slate-300 font-mono">Request Payload (JSON)</span>
                  </div>
                  <button
                    onClick={handleResetPayload}
                    className="flex items-center gap-1 hover:text-slate-200 transition-colors"
                    title="Reset to default payload"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    value={payloadText}
                    onChange={(e) => handlePayloadChange(e.target.value)}
                    rows={12}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed resize-none"
                    spellCheck={false}
                  />
                  {payloadError && (
                    <div className="mt-1 text-xs text-rose-400 font-mono">
                      {payloadError}
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 rounded bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                  <div>Authorization: Bearer sk_live_••••••••••••</div>
                  <div>Strata-Region-Affinity: auto-nearest-edge</div>
                  <div>Content-Type: application/json</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Simulated sandbox environment
                </span>
                <button
                  onClick={handleExecuteRequest}
                  disabled={isLoading || !!payloadError}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Play className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Executing Invocation...' : 'Send Request'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Live Response & Latency Inspector */}
            <div className="lg:col-span-6 p-4 sm:p-6 flex flex-col justify-between bg-slate-950/70">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-300 font-mono">Response Telemetry</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80 font-mono text-[11px]">
                      200 OK
                    </span>
                  </div>

                  <button
                    onClick={handleCopyResponse}
                    className="flex items-center gap-1 hover:text-slate-200 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Telemetry metrics bar */}
                <div className="mb-4 grid grid-cols-3 gap-2 p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-500 block">Total Latency</span>
                    <span className="text-blue-400 font-semibold">{executionTime} ms</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Cold Start</span>
                    <span className="text-emerald-400 font-semibold">0.0 ms (Warm)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Edge PoP</span>
                    <span className="text-slate-300 font-semibold">iad-va-us-1</span>
                  </div>
                </div>

                {/* Response Body Pre tag */}
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-4 font-mono text-xs text-slate-300 max-h-[300px] overflow-y-auto leading-relaxed">
                  <pre>
                    <code>{JSON.stringify(responseOutput, null, 2)}</code>
                  </pre>
                </div>
              </div>

              {/* Response summary note */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Protocol: HTTP/3 (QUIC)</span>
                <span>Payload compression: zstd 1.5</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
