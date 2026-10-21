import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft, Shield, User, Mail, Building, MapPin } from 'lucide-react';
import { DemoBooking } from '../types';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<DemoBooking>({
    name: '',
    email: '',
    company: '',
    teamSize: '11-50 engineers',
    workload: 'LLM & AI Model Inference',
    region: 'North America (US-East / West)',
    date: '2026-10-26',
    timeSlot: '11:00 AM EST',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid corporate email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) setStep(1);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    // Generate reference confirmation
    const bookingId = 'STRATA-DEMO-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmedBookingId(bookingId);
    setStep(3);
  };

  const handleResetModal = () => {
    setStep(1);
    setFormData({
      name: '',
      email: '',
      company: '',
      teamSize: '11-50 engineers',
      workload: 'LLM & AI Model Inference',
      region: 'North America (US-East / West)',
      date: '2026-10-26',
      timeSlot: '11:00 AM EST',
      specialRequests: '',
    });
    setErrors({});
    onClose();
  };

  const availableDates = [
    { label: 'Mon, Oct 26', value: '2026-10-26' },
    { label: 'Tue, Oct 27', value: '2026-10-27' },
    { label: 'Wed, Oct 28', value: '2026-10-28' },
    { label: 'Thu, Oct 29', value: '2026-10-29' },
    { label: 'Fri, Oct 30', value: '2026-10-30' },
  ];

  const timeSlots = [
    '09:30 AM EST',
    '11:00 AM EST',
    '01:30 PM EST',
    '03:00 PM EST',
    '04:30 PM EST',
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
              <Shield className="h-3.5 w-3.5" />
              <span>Enterprise Consultation &amp; Pilot Review</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {step === 3 ? 'Session Confirmed' : 'Schedule Discovery with Solutions Engineering'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Multi-step progress bar */}
        {step < 3 && (
          <div className="px-6 pt-4 pb-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className={`h-5 w-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                step === 1 ? 'bg-blue-700 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {step > 1 ? '✓' : '1'}
              </span>
              <span className={step === 1 ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                Workload &amp; Architecture
              </span>
            </div>

            <div className="h-px w-8 bg-slate-200" />

            <div className="flex items-center gap-2">
              <span className={`h-5 w-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                step === 2 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </span>
              <span className={step === 2 ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                Schedule &amp; Contact
              </span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: Workload Profile */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization Name *
                </label>
                <div className="relative">
                  <Building className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Acme Technologies, Inc."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                  />
                </div>
                {errors.company && (
                  <span className="text-[11px] text-rose-600 mt-1 block">{errors.company}</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Engineering Team Size
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-white"
                  >
                    <option value="1-10 engineers">1 - 10 engineers</option>
                    <option value="11-50 engineers">11 - 50 engineers</option>
                    <option value="51-250 engineers">51 - 250 engineers</option>
                    <option value="250+ enterprise">250+ enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Workload Focus
                  </label>
                  <select
                    value={formData.workload}
                    onChange={(e) => setFormData({ ...formData, workload: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-white"
                  >
                    <option value="LLM & AI Model Inference">LLM &amp; AI Model Inference</option>
                    <option value="Serverless Micro-VMs & APIs">Serverless Micro-VMs &amp; APIs</option>
                    <option value="Edge Caching & Global AnyCast">Edge Caching &amp; Global AnyCast</option>
                    <option value="Distributed Vector / RAG Search">Distributed Vector / RAG Search</option>
                    <option value="Complete Cloud Migration">Complete Cloud Migration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Data Residency &amp; Deployment Region
                </label>
                <div className="relative">
                  <MapPin className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-white"
                  >
                    <option value="North America (US-East / West)">North America (US-East / West)</option>
                    <option value="European Union (Frankfurt / Dublin - GDPR Sovereign)">European Union (Frankfurt / Dublin - GDPR)</option>
                    <option value="Asia-Pacific (Tokyo / Singapore / Sydney)">Asia-Pacific (Tokyo / Singapore / Sydney)</option>
                    <option value="Global Active-Active Multi-Region">Global Active-Active Multi-Region</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-700 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-800 transition-colors"
                >
                  <span>Select Time Slot</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date, Time & Contact Info */}
          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              
              {/* Date selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-blue-700" />
                  <span>Preferred Discovery Date</span>
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {availableDates.map((d) => (
                    <button
                      type="button"
                      key={d.value}
                      onClick={() => setFormData({ ...formData, date: d.value })}
                      className={`p-2 rounded-lg text-center border text-xs font-medium transition-colors ${
                        formData.date === d.value
                          ? 'border-blue-700 bg-blue-50 text-blue-900 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-blue-700" />
                  <span>Time Slot (30 min Technical Review)</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      className={`py-1.5 px-2 rounded-md text-center border text-[11px] font-mono transition-colors ${
                        formData.timeSlot === slot
                          ? 'border-blue-700 bg-blue-700 text-white font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact info fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rivera"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  {errors.name && (
                    <span className="text-[11px] text-rose-600 mt-1 block">{errors.name}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Corporate Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@acme.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[11px] text-rose-600 mt-1 block">{errors.email}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Architecture Notes / Current Hyperscaler (Optional)
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  rows={2}
                  placeholder="e.g. Currently migrating 40 Kubernetes microservices and 500M daily API calls from AWS us-east-1."
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-blue-700 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-800 transition-colors shadow-xs"
                >
                  <span>Confirm Architecture Review</span>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Confirmed State */}
          {step === 3 && (
            <div className="text-center py-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <h4 className="text-xl font-bold text-slate-900">
                Your Technical Review is Scheduled!
              </h4>
              <p className="mt-2 text-xs text-slate-600 max-w-sm mx-auto">
                A calendar invitation and Google Meet conference link have been dispatched to <span className="font-semibold text-slate-900">{formData.email}</span>.
              </p>

              {/* Receipt Summary Card */}
              <div className="mt-6 text-left p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 font-mono">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Booking Reference:</span>
                  <span className="font-bold text-slate-900">{confirmedBookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date &amp; Time:</span>
                  <span className="text-slate-900">{formData.date} at {formData.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Workload:</span>
                  <span className="text-slate-900">{formData.workload}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lead Architect:</span>
                  <span className="text-blue-700 font-bold">Dr. K. Vance (Platform Lead)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Sovereign Region:</span>
                  <span className="text-slate-900">{formData.region}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetModal}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
