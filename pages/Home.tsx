import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, ShieldCheck, Truck, Clock, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 md:pt-20 lg:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-50 border border-medical-100 text-medical-600 text-sm font-medium animate-fade-in-up">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>Trusted by 50,000+ Patients</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                Upload Prescription. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-teal-400">
                  We Handle the Rest.
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience the future of pharmacy. Our AI analyzes your prescription, finds the best prices, and coordinates instant delivery. No queues, no hassle.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/upload">
                    <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-medical-500/20 gap-2">
                        <Upload className="h-5 w-5" />
                        Upload Prescription
                    </Button>
                </Link>
                <Link to="/medicines">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                        Browse Medicines
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    HIPAA Compliant
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Free Delivery
                 </div>
              </div>
            </div>

            <div className="relative lg:h-[600px] flex items-center justify-center">
                {/* Decorative blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-medical-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-w-sm w-full transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center gap-4 mb-6">
                         <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center">
                            <Upload className="h-6 w-6 text-slate-400" />
                         </div>
                         <div>
                            <div className="h-2.5 w-32 bg-slate-200 rounded-full mb-2"></div>
                            <div className="h-2 w-20 bg-slate-100 rounded-full"></div>
                         </div>
                    </div>
                    <div className="space-y-3 mb-6">
                        <div className="h-2 bg-slate-100 rounded-full w-full"></div>
                        <div className="h-2 bg-slate-100 rounded-full w-5/6"></div>
                        <div className="h-2 bg-slate-100 rounded-full w-full"></div>
                    </div>
                    <div className="bg-medical-50 p-4 rounded-xl flex items-center gap-3 border border-medical-100">
                        <div className="bg-medical-600 p-2 rounded-full">
                             <Clock className="h-4 w-4 text-white" />
                        </div>
                        <div>
                             <p className="text-xs text-medical-600 font-bold uppercase">AI Processing</p>
                             <p className="text-sm font-medium text-slate-700">Analyzing Prescription...</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900">Why choose Prescriptly?</h2>
            </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:border-medical-200 transition-colors">
              <div className="w-14 h-14 mx-auto bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Verified & Secure</h3>
              <p className="text-slate-500">
                Every prescription is verified by licensed pharmacists. Your data is encrypted with bank-grade security.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:border-medical-200 transition-colors">
              <div className="w-14 h-14 mx-auto bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI-Powered Speed</h3>
              <p className="text-slate-500">
                Our AI reads prescriptions instantly, checking stock and interactions to save you waiting time.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:border-medical-200 transition-colors">
              <div className="w-14 h-14 mx-auto bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Truck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fast Delivery</h3>
              <p className="text-slate-500">
                Get your medicines delivered to your doorstep in as little as 2 hours in select cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-medical-900 rounded-3xl p-8 md:p-16 text-center md:text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-medical-800 rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to simplify your health?</h2>
                    <p className="text-medical-200 text-lg max-w-xl">Join thousands of users who have switched to the smarter, safer way to buy medicine.</p>
                </div>
                <div className="flex gap-4">
                    <Link to="/upload">
                        <Button variant="primary" className="bg-medical-600 text-white hover:bg-medical-500">Get Started</Button>
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};