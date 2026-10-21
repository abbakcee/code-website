# Strata Cloud — Enterprise Developer Platform & AI Infrastructure

An enterprise-grade software company website for **Strata Cloud**, a next-generation cloud infrastructure, developer platform, and AI compute engine built with a clean minimalist enterprise aesthetic, slate neutrals, royal blue accents, and deep interactive product capabilities.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and design parameters were confirmed through the design discovery session:

- **Core Product Focus**: Cloud infrastructure, developer tools, and serverless AI inference platform (high-performance edge compute, micro-VM execution, vector caching, and automated developer deployment workflows).
- **Visual Aesthetic & Theme**: Clean minimalist enterprise light mode with slate neutrals (`#0F172A`, `#334155`, `#F8FAFC`), crisp hairline borders (`#E2E8F0`), and royal blue/cobalt interactive highlights (`#1D4ED8`, `#2563EB`).
- **Layout Format**: Rich multi-section landing page with full 1440px desktop spatial hierarchy, zero-pill metadata discipline, and interactive sub-views and modals.
- **Interactive Suite**:
  1. Interactive pricing tier and ROI savings calculator (compute hours, request volume, GPU clusters with live competitor cost comparisons).
  2. Live interactive code runner and API playground preview with multi-language tabs (TypeScript, Python, Go, cURL) and simulated live responses.
  3. Interactive system architecture and tech stack diagram with clickable topology nodes and detailed telemetry inspection.
  4. Enterprise consultation and demo request scheduler modal with multi-step workload qualification, interactive calendar slot booking, and instant confirmation.

***

## 1. Overview & Core Concept

**Strata Cloud** is a next-generation cloud computing platform designed for engineering teams deploying distributed applications and generative AI workloads at global scale. The website serves both technical evaluators (staff software engineers, platform architects, DevOps leaders) and enterprise buyers (CTOs, VPs of Infrastructure).

- **Primary Persona**: Infrastructure engineers, tech leads, and enterprise CTOs seeking predictable latency, sub-10ms serverless cold starts, and transparent, unmetered egress pricing.
- **Key Value Delivered**: Sub-second deployments from Git, native AI model inference endpoints, zero-configuration global edge caching, and 45–60% compute infrastructure cost reduction.

***

## 2. User Experience & Visual Design

### Key User Flows
1. **Evaluation & Value Discovery**: User lands on hero, views the live latency benchmark, and toggles through the multi-language code preview to see how Strata's SDK operates.
2. **Architecture Deep-Dive**: User inspects the interactive topology diagram, clicking on Edge Nodes, Micro-VM Runtimes, and Distributed Vector Caches to view real architectural specifications and failover mechanics.
3. **ROI & Capacity Sizing**: User adjusts workloads via the interactive pricing calculator (requests, GPU hours, storage) to immediately model monthly cost and calculated savings versus legacy hyperscalers.
4. **Interactive Sandbox**: User explores the live API request simulator, selecting endpoints (Inference, Edge Cache, KV Store), adjusting mock payloads, and triggering simulated live execution with response times and status codes.
5. **Enterprise Consultation Booking**: User triggers "Schedule Discovery Call" or "Request Enterprise Pilot" to open a multi-step modal with calendar selection, workload requirements, and confirmation.

### Visual Identity & Theme
- **Aesthetic Direction**: Clean Minimalist Enterprise. Structured, authoritative, mathematically balanced, and restrained. Zero decorative green pulsing dots, zero low-opacity ghost watermarks, and zero comment slashes (`//`).
- **Color Palette & Distribution (60-30-10)**:
  - **60% Neutral Canvas**: `#FFFFFF` pure white ground and `#F8FAFC` slate subtle tinted surfaces.
  - **30% Structural Hierarchy**: `#0F172A` deep obsidian text, `#334155` slate secondary prose, `#E2E8F0` precision hairline borders, `#F1F5F9` subtle card backgrounds.
  - **10% Accent Budget**: `#1D4ED8` royal blue primary actions, `#2563EB` hover states, and `#0284C7` steel focus rings.
- **Typography**:
  - Display / Headings: `Plus Jakarta Sans` / `Outfit` (tight tracking `-0.02em`, balanced wrap, no orphan words).
  - Body Copy: `DM Sans` / `Public Sans` (15–16px, 1.6 line height for effortless readability).
  - Telemetry & Code: `JetBrains Mono` with `font-variant-numeric: tabular-nums` for aligned latency and financial metrics.
- **Top Bar Contract**:
  - Zone 1: Clean single-line wordmark: **Strata** (with high-tech geometric logomark).
  - Zone 2: Five single-line navigation links (`Platform`, `Architecture`, `Playground`, `Pricing`, `Customers`).
  - Zone 3: Single primary action button (`Schedule Demo`).

***

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Interactive Engine with Realistic Simulation**
  - *Approach*: Build high-fidelity interactive state machines for the API playground, ROI calculator, and architecture topology without requiring external cloud accounts or credit card signups.
  - *Why*: Instant, zero-latency feedback creates immediate developer delight while demonstrating the platform's capabilities convincingly.
- **Decision 2: Strict Adherence to Domain Constitution & Zero-Pill Rules**
  - *Approach*: Render metadata (regions, benchmark timings, publication dates) as clean, unboxed text separated by subtle middots (`·`). Use segmented controls exclusively for functional interactive tab buttons.
  - *Why*: Eliminates generic "AI slop" badges and creates a cohesive, high-end enterprise finish matching modern developer tools like Cloudflare, Stripe, and Vercel.
- **Decision 3: Multi-Step Enterprise Consultation Modal**
  - *Approach*: Built-in accessible modal with step 1 (Workload profile & deployment region), step 2 (Date & time slot selection), and step 3 (Instant confirmation summary).
  - *Why*: Delivers an end-to-end completed conversion funnel with validation, state management, and clear user reassurance.

***

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Strata Cloud Web App                            │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│ Global Top Bar   │      │ Hero & Benchmark │      │ Interactive Sys  │
│ 3-Zone Contract  │      │ Live Code Tabs   │      │ Architecture Map │
└──────────────────┘      └──────────────────┘      └────────┬─────────┘
                                                             │
         ┌───────────────────────────────────────────────────┘
         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│ Bento Grid Core  │      │ Interactive API  │      │ ROI & Capacity   │
│ Capabilities     │      │ Playground Demo  │      │ Savings Calc     │
└────────┬─────────┘      └────────┬─────────┘      └────────┬─────────┘
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   ▼
         ┌───────────────────────────────────────────────────┐
         │ Case Studies, Social Proof & Enterprise SLA       │
         └─────────────────────────┬─────────────────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
┌──────────────────┐                                ┌──────────────────┐
│ Quiet Enterprise │                                │ Consultation &   │
│ Footer & Legal   │                                │ Booking Modal    │
└──────────────────┘                                └──────────────────┘
```

### Component Hierarchy & State Store
- **`src/types/index.ts`**: Types for architecture nodes, pricing workload models, code snippets, API test specs, and consultation bookings.
- **`src/data/mockData.ts`**: Benchmark telemetry data, code samples for 4 languages, topology graph nodes, customer proof case studies, and enterprise FAQs.
- **`src/components/Header.tsx`**: Top Bar contract compliant navigation bar with smooth anchor scrolling and mobile drawer.
- **`src/components/Hero.tsx`**: Value proposition, primary CTA, verified benchmark metrics, and multi-language interactive code viewer.
- **`src/components/ArchitectureDiagram.tsx`**: Interactive system topology with clickable nodes (Edge Gateway, AI Inference, Micro-VMs, Vector DB) and inspector panel.
- **`src/components/BentoCapabilities.tsx`**: Asymmetric feature grid highlighting Strata's distributed runtime, cold start elimination, and observability.
- **`src/components/ApiPlayground.tsx`**: Live request simulation engine with payload tweaking, custom headers, and sub-10ms response telemetry.
- **`src/components/RoiCalculator.tsx`**: Real-time slider calculations for monthly API requests, GPU compute hours, and egress savings vs AWS/GCP.
- **`src/components/CaseStudies.tsx`**: Concrete enterprise case studies with quantified impact metrics and customer testimonials.
- **`src/components/DemoModal.tsx`**: Accessible, multi-step demo scheduling modal with step validation and confirmed booking receipt.
- **`src/components/Footer.tsx`**: Clean, quiet 4-column footer with status check and copyright notices.
