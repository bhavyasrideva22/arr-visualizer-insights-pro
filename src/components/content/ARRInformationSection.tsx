
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, ChartBar, TrendingUp, Users, BadgeIndianRupee } from 'lucide-react';

const ARRInformationSection: React.FC = () => {
  return (
    <div className="mt-10 mb-16">
      <h2 className="text-3xl font-bold text-darkGreen mb-6 text-center">
        Understanding Annual Recurring Revenue (ARR) in SaaS
      </h2>
      
      <Card className="mb-8 card-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-darkGreen">
            <FileText className="mr-2 h-5 w-5" />
            What is Annual Recurring Revenue (ARR)?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold">Annual Recurring Revenue (ARR)</span> is the cornerstone metric for SaaS (Software as a Service) businesses. 
            It represents the value of the recurring revenue components of your term subscriptions normalized to a one-year period. 
            Simply put, ARR tells you how much recurring revenue you can expect to generate in a year, based on your current subscription customers.
          </p>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-darkGreen mb-2">Why ARR Matters</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Business Valuation:</span> ARR is the primary metric investors use to value SaaS companies, 
                  typically as a multiple of ARR.
                </li>
                <li>
                  <span className="font-medium">Growth Trajectory:</span> Tracking ARR growth over time helps measure business performance and predict future revenue.
                </li>
                <li>
                  <span className="font-medium">Financial Planning:</span> Stable, predictable ARR enables more accurate forecasting and budgeting for operations and growth.
                </li>
                <li>
                  <span className="font-medium">Investor Attraction:</span> Strong and growing ARR makes your business more attractive to potential investors.
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-darkGreen mb-2">How ARR is Calculated</h3>
              <p className="text-gray-700 mb-2">
                ARR can be calculated using several methods:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">From Monthly:</span> Monthly Recurring Revenue (MRR) × 12
                </li>
                <li>
                  <span className="font-medium">From Customers:</span> Number of Customers × Average Revenue Per User (ARPU) × 12
                </li>
                <li>
                  <span className="font-medium">From Subscriptions:</span> Sum of all normalized annual subscription values
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Our calculator uses the most straightforward method: multiplying your monthly recurring revenue by 12.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="card-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-darkGreen">
              <ChartBar className="mr-2 h-5 w-5" />
              SaaS Valuation Multiples
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              SaaS companies are typically valued as a multiple of their ARR. These multiples can range dramatically based on various factors:
            </p>
            
            <div className="mt-4 space-y-3">
              <div>
                <h4 className="font-semibold text-darkGreen">5-7x ARR</h4>
                <p className="text-sm text-gray-600">
                  Early-stage SaaS companies with modest growth (15-30% YoY) and average retention rates.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-darkGreen">8-12x ARR</h4>
                <p className="text-sm text-gray-600">
                  Growing SaaS businesses with strong unit economics, good retention (95%+), and consistent growth (30-50% YoY).
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-darkGreen">15-20x+ ARR</h4>
                <p className="text-sm text-gray-600">
                  High-growth SaaS companies (80%+ YoY) with excellent retention, strong market position, and exceptional unit economics.
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 mt-4">
              Factors that influence your multiple include growth rate, retention metrics, market size, competitive positioning, and profitability.
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-darkGreen">
              <TrendingUp className="mr-2 h-5 w-5" />
              Key Performance Indicators (KPIs)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Beyond ARR, investors and operators track several crucial metrics to evaluate SaaS business health:
            </p>
            
            <div className="space-y-3 mt-4">
              <div>
                <h4 className="font-semibold text-darkGreen">Churn Rate</h4>
                <p className="text-sm text-gray-600">
                  The percentage of customers or revenue that cancels in a given period. Lower is better, with best-in-class SaaS companies maintaining less than 5% annual churn.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-darkGreen">LTV:CAC Ratio</h4>
                <p className="text-sm text-gray-600">
                  The ratio between customer Lifetime Value and Customer Acquisition Cost. A healthy ratio is 3:1 or higher.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-darkGreen">CAC Payback Period</h4>
                <p className="text-sm text-gray-600">
                  The time it takes to recover the cost of acquiring a customer. Aim for less than 12 months for optimal capital efficiency.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-darkGreen">Net Revenue Retention (NRR)</h4>
                <p className="text-sm text-gray-600">
                  Measures revenue from existing customers over time, including expansion, contraction, and churn. Top SaaS companies achieve 120%+ NRR.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8 card-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-darkGreen">
            <BadgeIndianRupee className="mr-2 h-5 w-5" />
            Strategies to Improve Your SaaS Valuation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            If you're looking to maximize your SaaS company's valuation, focus on these key areas:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-lg font-semibold text-darkGreen mb-2">Growth Strategies</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Accelerate Customer Acquisition:</span> Invest in scalable marketing channels and sales processes.
                </li>
                <li>
                  <span className="font-medium">Expansion Revenue:</span> Implement upselling and cross-selling strategies to increase ARPU.
                </li>
                <li>
                  <span className="font-medium">Market Expansion:</span> Consider entering new geographic markets or adjacent customer segments.
                </li>
                <li>
                  <span className="font-medium">Product Expansion:</span> Develop complementary products or features that address additional customer needs.
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-darkGreen mb-2">Retention Strategies</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Improve Onboarding:</span> Create a seamless onboarding experience to drive early product adoption.
                </li>
                <li>
                  <span className="font-medium">Enhance Customer Success:</span> Proactively engage with customers to ensure they achieve their goals.
                </li>
                <li>
                  <span className="font-medium">Product Improvements:</span> Continuously enhance your product based on customer feedback and usage data.
                </li>
                <li>
                  <span className="font-medium">Community Building:</span> Create a community around your product to increase switching costs.
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-darkGreen mb-2">Operational Excellence</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Gross Margin Improvement:</span> Optimize infrastructure costs and reduce cost of goods sold.
              </li>
              <li>
                <span className="font-medium">Sales Efficiency:</span> Refine your sales process to reduce CAC and shorten sales cycles.
              </li>
              <li>
                <span className="font-medium">Capital Efficiency:</span> Maintain a sustainable burn rate and path to profitability.
              </li>
              <li>
                <span className="font-medium">Financial Discipline:</span> Implement robust financial tracking and reporting systems.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-darkGreen">
            <Users className="mr-2 h-5 w-5" />
            The Indian SaaS Landscape
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            The Indian SaaS ecosystem has seen tremendous growth in recent years, with several companies achieving unicorn status 
            and gaining global recognition. The market for Indian SaaS companies is expected to reach $50 billion in revenue by 2030.
          </p>
          
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold text-darkGreen">Key Trends in Indian SaaS</h3>
            
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Global-First Approach:</span> Many Indian SaaS companies target global markets from day one.
              </li>
              <li>
                <span className="font-medium">Vertical SaaS Growth:</span> Increasing focus on industry-specific solutions rather than horizontal platforms.
              </li>
              <li>
                <span className="font-medium">Product-Led Growth:</span> Adoption of PLG strategies with freemium models and self-service onboarding.
              </li>
              <li>
                <span className="font-medium">AI/ML Integration:</span> Leveraging artificial intelligence to create smarter, more valuable SaaS products.
              </li>
            </ul>
            
            <p className="text-gray-700 mt-4">
              Valuations for Indian SaaS companies have been increasingly comparable to their global counterparts, 
              with top-tier companies commanding 15-20x ARR multiples. Factors unique to the Indian ecosystem include 
              talent availability, cost advantages, and evolving funding landscapes.
            </p>
            
            <p className="text-gray-700 mt-4">
              Use our ARR calculator to understand how your SaaS business compares to industry benchmarks and identify 
              areas for improvement to maximize your valuation in this thriving ecosystem.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ARRInformationSection;
