import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, HelpCircle, FileText, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

// Generic layout for legal/info pages
const LegalLayout: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-[70vh] bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-medical-600 mb-6 font-medium text-sm transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-medical-600 shadow-sm">
              {icon}
            </div>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Privacy: React.FC = () => (
  <LegalLayout title="Privacy Policy" icon={<ShieldCheck className="h-6 w-6" />}>
    <div className="space-y-4">
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <p>At Prescriptly, we take your privacy seriously. This policy outlines how we handle your personal and medical data.</p>
      
      <h3 className="text-lg font-bold text-slate-900 mt-6">1. Data Collection</h3>
      <p>We collect information necessary to process your prescriptions and orders, including your name, contact details, and prescription images. This data is used solely for order fulfillment and improving our services.</p>
      
      <h3 className="text-lg font-bold text-slate-900 mt-6">2. Data Security</h3>
      <p>Your data is encrypted using 256-bit SSL technology during transmission and storage. We comply with all relevant healthcare data protection regulations (including HIPAA compliance where applicable).</p>
      
      <h3 className="text-lg font-bold text-slate-900 mt-6">3. Third-Party Sharing</h3>
      <p>We do not sell your personal data. We share necessary information with licensed pharmacy partners solely to fulfill your prescription orders.</p>
    </div>
  </LegalLayout>
);

export const Terms: React.FC = () => (
  <LegalLayout title="Terms of Service" icon={<FileText className="h-6 w-6" />}>
    <div className="space-y-4">
      <p>Welcome to Prescriptly. By using our service, you agree to the following terms and conditions.</p>
      
      <h3 className="text-lg font-bold text-slate-900 mt-6">1. Medical Disclaimer</h3>
      <p>Prescriptly is a platform for ordering medicines. We do not provide medical advice. Consult a doctor for any health concerns. If you have a medical emergency, call emergency services immediately.</p>
      
      <h3 className="text-lg font-bold text-slate-900 mt-6">2. Prescription Verification</h3>
      <p>All uploaded prescriptions are subject to verification by a licensed pharmacist before the order is processed. We reserve the right to cancel orders if the prescription is invalid or illegible.</p>
      
      <h3 className="text-lg font-bold text-slate-900 mt-6">3. Usage</h3>
      <p>You agree to provide accurate information and not to misuse the platform for any illegal activities.</p>
    </div>
  </LegalLayout>
);

export const Returns: React.FC = () => (
  <LegalLayout title="Returns & Refunds" icon={<RefreshCw className="h-6 w-6" />}>
    <div className="space-y-4">
      <p>We want you to be completely satisfied with your order. Here is how our return process works.</p>
      
      <h3 className="text-lg font-bold text-slate-900 mt-6">Non-Returnable Items</h3>
      <p>Due to safety and hygiene regulations, we cannot accept returns for opened medicines, injections, or temperature-sensitive items unless they are defective.</p>
      
      <h3 className="text-lg font-bold text-slate-900 mt-6">Damaged or Incorrect Items</h3>
      <p>If you received a damaged or incorrect item, please contact our support team within 48 hours of delivery. We will arrange for a replacement or a full refund.</p>
      
      <h3 className="text-lg font-bold text-slate-900 mt-6">Refund Process</h3>
      <p>Refunds are processed within 5-7 business days to the original payment method.</p>
    </div>
  </LegalLayout>
);

export const Help: React.FC = () => (
  <LegalLayout title="Help Center" icon={<HelpCircle className="h-6 w-6" />}>
    <p className="mb-6">Find answers to common questions about Prescriptly.</p>
    
    <div className="space-y-4">
      <details className="group border border-slate-200 rounded-xl p-4 open:bg-slate-50 transition-colors">
        <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
          <span>How do I upload a prescription?</span>
          <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p className="mt-3 text-slate-600">Go to the 'Upload' page using the navigation menu. You can drag and drop your file (JPG, PNG, PDF) or click to select one. Our AI will analyze it instantly.</p>
      </details>
      
      <details className="group border border-slate-200 rounded-xl p-4 open:bg-slate-50 transition-colors">
        <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
          <span>How long does delivery take?</span>
          <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p className="mt-3 text-slate-600">Standard delivery takes 24-48 hours. Express delivery (2-4 hours) is available in select pincodes in major cities.</p>
      </details>
      
      <details className="group border border-slate-200 rounded-xl p-4 open:bg-slate-50 transition-colors">
        <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
          <span>Is my data safe?</span>
          <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p className="mt-3 text-slate-600">Yes. We use industry-standard encryption to protect your personal and medical data. We never sell your data to third parties.</p>
      </details>

      <details className="group border border-slate-200 rounded-xl p-4 open:bg-slate-50 transition-colors">
        <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
          <span>How do I cancel an order?</span>
          <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <p className="mt-3 text-slate-600">You can cancel your order from the 'My Orders' section before it is shipped. Once shipped, cancellations are not possible.</p>
      </details>
    </div>

    <div className="mt-8 p-4 bg-medical-50 rounded-xl border border-medical-100 flex items-center justify-between">
      <div>
        <h4 className="font-bold text-medical-900">Still need help?</h4>
        <p className="text-sm text-medical-700">Our support team is available 9am - 9pm.</p>
      </div>
      <a href="mailto:support@prescriptly.com" className="px-4 py-2 bg-white text-medical-600 font-bold rounded-lg border border-medical-200 hover:bg-medical-50 transition-colors text-sm">
        Contact Support
      </a>
    </div>
  </LegalLayout>
);