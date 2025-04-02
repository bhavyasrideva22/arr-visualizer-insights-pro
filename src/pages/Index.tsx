
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ARRCalculatorForm from '@/components/calculator/ARRCalculatorForm';
import ARRInformationSection from '@/components/content/ARRInformationSection';
import { Separator } from '@/components/ui/separator';
import { Calculator, Download, Mail, ArrowDown } from 'lucide-react';

const Index = () => {
  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-darkGreen to-mintGreen py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            ARR Calculator for SaaS Valuation
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-8 animate-fade-in">
            Calculate your SaaS company's valuation based on Annual Recurring Revenue, growth rate, and key metrics.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-5 py-3">
              <Calculator className="h-5 w-5 mr-2" />
              <span>Interactive Calculations</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-5 py-3">
              <Download className="h-5 w-5 mr-2" />
              <span>PDF Reports</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-5 py-3">
              <Mail className="h-5 w-5 mr-2" />
              <span>Email Results</span>
            </div>
          </div>
          <ArrowDown className="h-8 w-8 mx-auto animate-bounce text-white/70" />
        </div>
      </section>
      
      <section className="py-12 bg-creamWhite">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-darkGreen mb-8 text-center">
              Calculate Your SaaS Valuation
            </h2>
            <ARRCalculatorForm />
          </div>
        </div>
      </section>
      
      <Separator className="max-w-4xl mx-auto" />
      
      <section className="py-12 bg-creamWhite">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ARRInformationSection />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
