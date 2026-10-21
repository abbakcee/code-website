import { CodeSnippet, ArchitectureNode, PlaygroundEndpoint, CaseStudy } from '../types';

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'typescript',
    label: 'TypeScript',
    filename: 'inference-edge.ts',
    runtime: 'Node 22 / Bun / Edge Worker',
    code: `import { StrataClient } from '@strata/sdk';

const strata = new StrataClient({
  region: 'auto-nearest',
  telemetry: true,
});

export default strata.endpoint({
  path: '/api/v1/generate-summary',
  concurrency: 500,
  maxDurationMs: 15000,
  async handler(req, ctx) {
    const { documentId, prompt } = await req.json();

    // Query low-latency distributed vector cache (<4ms)
    const context = await ctx.vectors.query('enterprise-docs', {
      query: prompt,
      topK: 5,
      filter: { documentId },
    });

    // Stream from pooled Tensor core with sub-10ms TTFT
    return ctx.ai.stream('strata-llama-70b-instruct', {
      messages: [
        { role: 'system', content: 'You are an enterprise research analyst.' },
        { role: 'user', content: \`Context: \${context.text}\\n\\nQuery: \${prompt}\` },
      ],
      temperature: 0.2,
    });
  },
});`
  },
  {
    id: 'python',
    label: 'Python',
    filename: 'worker.py',
    runtime: 'Python 3.12 / FastMicroVM',
    code: `from strata import StrataWorker, Request, Response
from strata.ai import TensorPool

worker = StrataWorker(warm_pool=True)
pool = TensorPool.connect("us-east-cluster")

@worker.endpoint("/v1/document-embed", max_concurrency=250)
async def handle_embedding(req: Request) -> Response:
    payload = await req.json()
    texts = payload.get("chunks", [])

    # Parallel batch embedding through unified hardware queue
    embeddings = await pool.embed(
        model="strata-embed-v2",
        inputs=texts,
        dimensions=1536
    )

    # Persist directly into multi-region vector cache
    await worker.vector_store.upsert(
        collection="compliance-vault",
        records=[{"id": f"rec_{i}", "vector": emb} for i, emb in enumerate(embeddings)]
    )

    return Response.json({
        "status": "persisted",
        "count": len(embeddings),
        "execution_time_ms": worker.execution_time
    })`
  },
  {
    id: 'go',
    label: 'Go',
    filename: 'main.go',
    runtime: 'Go 1.23 / Native Binary',
    code: `package main

import (
	"context"
	"github.com/strata-cloud/strata-go"
	"net/http"
)

func main() {
	app := strata.New(strata.Config{
		RegionRouting: strata.RoutingAnycast,
		ZeroColdStart: true,
	})

	app.POST("/v1/transactions/evaluate", func(ctx *strata.Context) error {
		var tx Transaction
		if err := ctx.BindJSON(&tx); err != nil {
			return ctx.Status(http.StatusBadRequest).JSON(map[string]string{"error": "invalid payload"})
		}

		// Evaluate risk model with hardware-isolated micro-VM (<3ms)
		riskScore, err := ctx.Models.Evaluate(context.Background(), "fraud-detector-v4", tx)
		if err != nil {
			return ctx.Status(http.StatusInternalServerError).JSON(map[string]string{"error": "model timeout"})
		}

		return ctx.JSON(map[string]any{
			"transaction_id": tx.ID,
			"risk_score":     riskScore,
			"routed_pop":     ctx.Metadata.PoPLocation,
			"latency_ms":     ctx.ExecutionDuration().Milliseconds(),
		})
	})

	app.Start()
}`
  },
  {
    id: 'curl',
    label: 'cURL',
    filename: 'request.sh',
    runtime: 'Universal HTTP / JSON',
    code: `curl -X POST https://api.stratacloud.io/v1/ai/infer \\
  -H "Authorization: Bearer sk_live_948a31e84a29" \\
  -H "Content-Type: application/json" \\
  -H "Strata-Region-Affinity: nearest-edge" \\
  -d '{
    "model": "strata-reasoner-32b",
    "prompt": "Evaluate failover protocol for multi-region active-active database clusters.",
    "stream": false,
    "max_tokens": 512,
    "telemetry": {
      "capture_latency": true,
      "trace_id": "req_8819203a"
    }
  }'`
  }
];

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'edge-gateway',
    title: 'Global AnyCast Edge Network',
    category: 'Edge',
    summary: '310+ Global Edge Points of Presence with BGP AnyCast routing, hardware-accelerated TLS 1.3 termination, and integrated Layer 3/4/7 DDoS mitigation.',
    specifications: {
      latency: '< 12ms global median',
      throughput: '120 Tbps edge backbone',
      redundancy: 'N+2 multi-tier routing',
      protocol: 'HTTP/3, QUIC, gRPC'
    },
    features: [
      'Sub-millisecond SSL handshake with TLS session ticket caching',
      'Intelligent dynamic routing based on real-time peering congestion metrics',
      'Automated geo-fencing for strict sovereign data regulations (GDPR, APRA)',
      'Automated SSL wildcard generation and automatic renewal'
    ],
    telemetry: {
      activeInstances: '314 edge PoPs',
      p99Latency: '8.4 ms',
      healthyNodes: '100% operational',
      egressBandwidth: '42.8 Tbps current'
    }
  },
  {
    id: 'microvm-runtime',
    title: 'Ultra-Fast Micro-VM Compute',
    category: 'Compute',
    summary: 'Isolated Linux kernel instances booted on bare-metal hardware in under 5 milliseconds. Eliminates cold starts completely while preserving kernel-level tenant isolation.',
    specifications: {
      latency: '4.8ms boot time',
      throughput: '1.2M req/sec per cluster',
      redundancy: 'Zero-drop hot swap',
      protocol: 'POSIX standard, OCI Container compliant'
    },
    features: [
      'Hardware virtualization via KVM with dedicated memory spaces',
      'Instantaneous scale-to-zero when idle, zero charges during inactivity',
      'Direct memory mapping to high-throughput NVMe scratch drives (12 GB/s)',
      'Compatible with Node.js, Python, Go, Rust, and custom Docker images'
    ],
    telemetry: {
      activeInstances: '142,890 active VMs',
      p99Latency: '3.1 ms',
      healthyNodes: '99.999% health',
      egressBandwidth: '18.4 Gbps worker bus'
    }
  },
  {
    id: 'tensor-pool',
    title: 'Pooled Tensor Inference Core',
    category: 'AI Inference',
    summary: 'Elastic fleet of NVIDIA H100 and B200 accelerators partitioned via dynamic FP8 execution queues for instantaneous Large Language Model and embedding inference.',
    specifications: {
      latency: '< 18ms Time-To-First-Token',
      throughput: '8,400 tokens/sec stream rate',
      redundancy: 'Multi-GPU failover queue',
      protocol: 'OpenAI-compatible API, gRPC streaming'
    },
    features: [
      'Continuous batching scheduler maximizing GPU tensor saturation',
      'KV cache reuse across semantic conversation sessions',
      'Zero model weight transfer latency via distributed NVMe model cache',
      'Fine-tuned model hot-loading in under 400 milliseconds'
    ],
    telemetry: {
      activeInstances: '3,450 pooled GPUs',
      p99Latency: '16.2 ms TTFT',
      healthyNodes: '99.98% cluster SLA',
      egressBandwidth: '3.2M tokens/sec'
    }
  },
  {
    id: 'vector-storage',
    title: 'Distributed Vector & KV Cache',
    category: 'Storage',
    summary: 'Globally replicated in-memory vector index built on hierarchical navigable small world (HNSW) graphs, delivering millisecond semantic search with zero external database hops.',
    specifications: {
      latency: '< 3.2ms recall at 10M vectors',
      throughput: '85,000 queries/sec',
      redundancy: '3x Raft cross-region replica',
      protocol: 'Binary protocol & REST JSON'
    },
    features: [
      'Sub-millisecond scalar filtering alongside cosine vector indexing',
      'Continuous asynchronous snapshotting to distributed object storage',
      'Transactional ACID guarantees with Raft consensus replication',
      'Automatic cache invalidation on Git branch deployments'
    ],
    telemetry: {
      activeInstances: '1.8B indexed vectors',
      p99Latency: '2.8 ms',
      healthyNodes: '100% synched',
      egressBandwidth: '12.1 GB/s IO throughput'
    }
  },
  {
    id: 'zero-trust-audit',
    title: 'Zero-Trust Workload Attestation',
    category: 'Security',
    summary: 'Cryptographically verified workload identity via SPIFFE/SPIRE with automatic mutual TLS (mTLS) and immutable audit log streaming to your SIEM provider.',
    specifications: {
      latency: 'Zero added network hops',
      throughput: 'Line-rate cryptographic signing',
      redundancy: 'Hardware Security Module (HSM)',
      protocol: 'SPIFFE/SPIRE, mTLS, FIPS 140-3'
    },
    features: [
      'Ephemeral short-lived certificates rotated every 60 minutes automatically',
      'Hardware-enforced confidential computing with AMD SEV-SNP and Intel TDX',
      'SOC 2 Type II, ISO 27001, HIPAA, and PCI-DSS Level 1 compliance ready',
      'Real-time anomaly detection identifying compromised execution patterns'
    ],
    telemetry: {
      activeInstances: '100% encrypted in-transit & at-rest',
      p99Latency: '0.12 ms signing delay',
      healthyNodes: 'Zero security exceptions',
      egressBandwidth: 'Full audit streaming'
    }
  }
];

export const PLAYGROUND_ENDPOINTS: PlaygroundEndpoint[] = [
  {
    id: 'ai-infer',
    name: 'Serverless AI Inference',
    method: 'POST',
    path: '/v1/ai/infer',
    summary: 'Execute quantized LLM inference with dynamic GPU scheduling and KV cache optimization.',
    simulatedResponseTime: 42,
    samplePayload: {
      model: 'strata-llama-70b-instruct',
      prompt: 'Summarize key benefits of micro-VM architectures compared to Docker containers.',
      temperature: 0.1,
      max_tokens: 120
    },
    generateResponse: (payload) => ({
      id: 'inf_' + Math.random().toString(36).substring(2, 10),
      object: 'chat.completion',
      model: payload.model || 'strata-llama-70b-instruct',
      usage: {
        prompt_tokens: 18,
        completion_tokens: 94,
        total_tokens: 112
      },
      choices: [
        {
          index: 0,
          finish_reason: 'stop',
          message: {
            role: 'assistant',
            content: 'Micro-VMs boot distinct Linux kernels in under 5ms, providing hypervisor-level isolation without container escape vulnerabilities. Unlike standard containers sharing a host kernel, micro-VMs guarantee strict hardware tenant sandboxing, predictable memory allocation, and instantaneous scale-to-zero economics.'
          }
        }
      ],
      timings: {
        queue_wait_ms: 1.2,
        time_to_first_token_ms: 14.8,
        total_duration_ms: 38.6
      },
      infrastructure: {
        edge_datacenter: 'iad-va-us-1',
        accelerator: 'NVIDIA H100 80GB (PCIe)',
        gpu_utilization_pct: 93.4
      }
    })
  },
  {
    id: 'function-execute',
    name: 'Edge Micro-VM Execution',
    method: 'POST',
    path: '/v1/functions/execute',
    summary: 'Run an isolated serverless function payload with sub-5ms cold start and instant scale.',
    simulatedResponseTime: 18,
    samplePayload: {
      function_id: 'fn_payment_verifier',
      environment: 'production',
      payload: {
        amount_usd: 4950.00,
        merchant_id: 'mch_acme_corp',
        currency: 'USD'
      }
    },
    generateResponse: (payload) => ({
      execution_id: 'exec_' + Math.random().toString(36).substring(2, 10),
      status: 'success',
      return_code: 0,
      output: {
        risk_evaluation: 'LOW_RISK',
        recommended_action: 'APPROVE',
        confidence_score: 0.9942,
        compliance_check: 'PASS'
      },
      metrics: {
        cold_start: false,
        boot_latency_ms: 0.0,
        execution_latency_ms: 3.4,
        memory_allocated_mb: 256,
        memory_used_mb: 48
      },
      region_origin: 'fra-de-eu-central',
      billed_compute_ms: 4
    })
  },
  {
    id: 'vector-query',
    name: 'Distributed Vector Query',
    method: 'POST',
    path: '/v1/vectors/query',
    summary: 'Perform sub-3ms nearest neighbor cosine vector similarity search over billions of embeddings.',
    simulatedResponseTime: 12,
    samplePayload: {
      collection: 'financial-filings-2026',
      vector: [0.0381, -0.1942, 0.4912, 0.0129, -0.0518],
      top_k: 3,
      min_score: 0.85
    },
    generateResponse: () => ({
      query_id: 'vec_' + Math.random().toString(36).substring(2, 10),
      collection: 'financial-filings-2026',
      results_count: 3,
      matches: [
        {
          id: 'doc_sec_10k_8819',
          score: 0.9612,
          metadata: { company: 'Stripe, Inc.', fiscal_year: 2025, section: 'Infrastructure Investments' }
        },
        {
          id: 'doc_sec_10k_7741',
          score: 0.9144,
          metadata: { company: 'Snowflake, Inc.', fiscal_year: 2025, section: 'Data Cloud Architecture' }
        },
        {
          id: 'doc_sec_10k_4421',
          score: 0.8879,
          metadata: { company: 'Datadog, Inc.', fiscal_year: 2025, section: 'Multi-Cloud Observability' }
        }
      ],
      timing: {
        index_traverse_ms: 1.84,
        serialization_ms: 0.31,
        total_ms: 2.15
      }
    })
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'hyperion',
    company: 'Hyperion AI',
    industry: 'Autonomous Search & RAG Infrastructure',
    summary: 'Migrated 1.4 billion live search vectors and 650 GPU inference nodes from AWS us-east-1 to Strata Cloud distributed clusters.',
    metrics: [
      { value: '87%', label: 'Inference Latency Reduction', timeframe: 'From 185ms to 24ms P99' },
      { value: '$142k', label: 'Monthly Compute Savings', timeframe: '48% gross cloud bill reduction' },
      { value: '0 ms', label: 'Observed Cold Starts', timeframe: 'Across 120M daily serverless invocations' }
    ],
    quote: 'Strata Cloud completely removed the infrastructure friction of managing GPU clusters. Our engineering team went from debugging Kubernetes scheduling bottlenecks to shipping model features 4x faster.',
    author: {
      name: 'Dr. Elena Rostova',
      role: 'VP of Platform Engineering, Hyperion AI'
    }
  },
  {
    id: 'logix',
    company: 'Logix Global',
    industry: 'Enterprise Payment Infrastructure',
    summary: 'Powering real-time fraud mitigation and financial transaction routing across 44 countries with zero multi-region downtime.',
    metrics: [
      { value: '4.2 ms', label: 'Global End-to-End Latency', timeframe: 'Measured across 480M daily transactions' },
      { value: '99.999%', label: 'Verified Operational Uptime', timeframe: 'Zero minutes of outage over 18 months' },
      { value: '100%', label: 'Egress Cost Predictability', timeframe: 'Zero unpredictable unmetered bandwidth spikes' }
    ],
    quote: 'When processing billions of dollars in daily payments, 50ms of network delay causes cart abandonment. With Strata’s anycast edge and instant micro-VMs, transaction verification is imperceptible.',
    author: {
      name: 'Marcus Vance',
      role: 'Chief Technology Officer, Logix Global'
    }
  },
  {
    id: 'aura',
    company: 'Aura Health',
    industry: 'Telehealth AI & Clinical Diagnostics',
    summary: 'Deployed HIPAA-compliant medical audio transcription and clinical summary generation across 14 sovereign data zones.',
    metrics: [
      { value: '14', label: 'Sovereign Regions Compliant', timeframe: 'HIPAA, GDPR, and APRA verified' },
      { value: '6.4x', label: 'Deployment Speed Increase', timeframe: 'PR preview to production in 18 seconds' },
      { value: '62%', label: 'Infrastructure Cost Decrease', timeframe: 'Versus proprietary enterprise contracts' }
    ],
    quote: 'The automated cryptographic workload attestation gave our compliance board immediate confidence. We deployed globally without building custom hardware security teams.',
    author: {
      name: 'Sarah Chen',
      role: 'Head of Infrastructure, Aura Health'
    }
  }
];

export const TRUSTED_COMPANIES = [
  { name: 'Vercel', tier: 'Enterprise Partner' },
  { name: 'Scale AI', tier: 'Compute Customer' },
  { name: 'Linear', tier: 'Global Infrastructure' },
  { name: 'Supabase', tier: 'Ecosystem Partner' },
  { name: 'Retool', tier: 'Enterprise Customer' },
  { name: 'HashiCorp', tier: 'Integration Partner' }
];

export const FAQ_ITEMS = [
  {
    question: 'How does Strata achieve sub-5ms cold starts compared to standard containers?',
    answer: 'Traditional containers require pulling image layers, configuring cgroups, and mounting virtual file systems over a shared OS kernel. Strata utilizes lightweight Firecracker-based micro-VMs pre-warmed in global memory pools with snapshot memory resumption, launching a complete POSIX kernel environment in under 4.8ms.'
  },
  {
    question: 'Can we run custom Docker containers and multi-model AI pipelines?',
    answer: 'Yes. Strata natively supports standard OCI container images as well as native Node.js, Python, Go, and Rust binaries. For AI workloads, you can deploy proprietary weights or utilize our pooled foundation model endpoints with zero cold start penalty.'
  },
  {
    question: 'What is Strata’s network egress pricing model?',
    answer: 'Unlike legacy hyperscalers that charge $0.08 to $0.12 per gigabyte of egress traffic, Strata includes generous egress bandwidth in every tier and bills excess edge transfer at an industry-low flat $0.01 per GB worldwide.'
  },
  {
    question: 'How do you handle SOC 2, HIPAA, and data residency requirements?',
    answer: 'Every Strata tenant executes in isolated micro-VM hardware spaces backed by AMD SEV-SNP encryption. Regional policy controls allow you to restrict compute execution and storage strictly within specific sovereign jurisdictions (e.g. EU only, US only).'
  }
];
