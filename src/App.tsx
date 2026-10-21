import { useState } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { BentoCapabilities } from './components/BentoCapabilities';
import { ApiPlayground } from './components/ApiPlayground';
import { RoiCalculator } from './components/RoiCalculator';
import { CaseStudies } from './components/CaseStudies';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col font-sans">
      {/* Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 3-Zone Top Bar */}
      <Header onOpenDemo={() => setDemoModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Code Runner & 4-Column KPI Strip */}
        <Hero onOpenDemo={() => setDemoModalOpen(true)} />

        {/* Bento Capabilities Grid */}
        <BentoCapabilities onOpenDemo={() => setDemoModalOpen(true)} />

        {/* Interactive System Architecture Topology */}
        <ArchitectureDiagram />

        {/* Live Interactive API Request Sandbox & Playground */}
        <ApiPlayground />

        {/* Interactive Pricing Tier & ROI Calculator */}
        <RoiCalculator onOpenDemo={() => setDemoModalOpen(true)} />

        {/* Quantitative Case Studies & Technical FAQ Accordion */}
        <CaseStudies onOpenDemo={() => setDemoModalOpen(true)} />
      </main>

      {/* Quiet Enterprise Footer */}
      <Footer onOpenDemo={() => setDemoModalOpen(true)} />

      {/* Interactive Enterprise Consultation & Demo Modal */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}
