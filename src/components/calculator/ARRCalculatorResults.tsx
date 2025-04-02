
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ARRData, formatCurrency } from '@/utils/arrCalculations';
import { generatePDF } from '@/utils/pdfGenerator';
import ARRGrowthChart from '@/components/charts/ARRGrowthChart';
import CustomersChart from '@/components/charts/CustomersChart';
import MetricsDonutChart from '@/components/charts/MetricsDonutChart';
import { 
  ChartBar, 
  Download, 
  Mail, 
  BadgeIndianRupee, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  FileText
} from 'lucide-react';

interface ARRCalculatorResultsProps {
  results: ARRData;
  projectionData: any[];
  customerData: any[];
  onSendReport: () => void;
}

const ARRCalculatorResults: React.FC<ARRCalculatorResultsProps> = ({ 
  results, 
  projectionData,
  customerData,
  onSendReport 
}) => {
  const handleDownloadPDF = () => {
    try {
      const doc = generatePDF(results);
      doc.save('arr-valuation-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  return (
    <div className="mt-6 animate-slide-up">
      <div className="bg-white rounded-lg shadow-md p-6 card-shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ChartBar className="text-darkGreen mr-2 h-6 w-6" />
            <h2 className="text-2xl font-bold text-darkGreen">Results & Analysis</h2>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleDownloadPDF}
              className="flex items-center border-darkGreen text-darkGreen hover:bg-darkGreen hover:text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button 
              onClick={onSendReport}
              className="flex items-center bg-gold hover:bg-opacity-90 text-darkGreen"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-darkGreen to-mintGreen text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Annual Recurring Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(results.annualRevenue)}</div>
              <p className="text-white text-opacity-80 mt-1">Monthly: {formatCurrency(results.monthlyRevenue)}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-mintGreen to-darkGreen text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">LTV:CAC Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{(results.ltv / results.cac).toFixed(2)}</div>
              <p className="text-white text-opacity-80 mt-1">
                {results.ltv / results.cac >= 3 ? 'Excellent' : results.ltv / results.cac >= 1 ? 'Good' : 'Needs Improvement'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gold to-darkGreen text-white shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Estimated Valuation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(results.estimatedValuation)}</div>
              <p className="text-white text-opacity-80 mt-1">
                {results.valuationMultiple}x ARR Multiple
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-darkGreen">
                <ChartBar className="mr-2 h-5 w-5" />
                ARR Growth Projection (5 Years)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ARRGrowthChart data={projectionData} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-darkGreen">
                <Users className="mr-2 h-5 w-5" />
                Customer Projection (5 Years)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomersChart data={customerData} />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-darkGreen">
                <BadgeIndianRupee className="mr-2 h-5 w-5" />
                Revenue Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Monthly Revenue</p>
                  <p className="text-xl font-semibold">{formatCurrency(results.monthlyRevenue)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Revenue</p>
                  <p className="text-xl font-semibold">{formatCurrency(results.annualRevenue)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Revenue Per User</p>
                  <p className="text-xl font-semibold">{formatCurrency(results.arpu)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-darkGreen">
                <Users className="mr-2 h-5 w-5" />
                Customer Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Total Customers</p>
                  <p className="text-xl font-semibold">{results.customerCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer Lifetime Value</p>
                  <p className="text-xl font-semibold">{formatCurrency(results.ltv)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer Acquisition Cost</p>
                  <p className="text-xl font-semibold">{formatCurrency(results.cac)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-darkGreen">
                <TrendingUp className="mr-2 h-5 w-5" />
                Growth & Valuation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Annual Growth Rate</p>
                  <p className="text-xl font-semibold">{results.growthRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Churn Rate</p>
                  <p className="text-xl font-semibold">{results.churnRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valuation Multiple</p>
                  <p className="text-xl font-semibold">{results.valuationMultiple}x ARR</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-darkGreen">
              <PieChart className="mr-2 h-5 w-5" />
              Key Metrics Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <MetricsDonutChart 
                  arpu={results.arpu} 
                  ltv={results.ltv} 
                  cac={results.cac} 
                />
              </div>
              <div className="flex items-center">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-darkGreen">Unit Economics Analysis</h3>
                  <p className="text-gray-700">
                    Your CAC to LTV ratio is <span className="font-semibold">{(results.ltv / results.cac).toFixed(2)}</span>, which means 
                    {results.ltv / results.cac >= 3 
                      ? " your business has excellent unit economics. You're generating significantly more value from customers than it costs to acquire them."
                      : results.ltv / results.cac >= 1 
                        ? " your business has positive unit economics but there's room for improvement. Aim for a ratio of 3 or higher for optimal SaaS metrics."
                        : " your business is spending more to acquire customers than they generate in lifetime value. This is unsustainable and needs immediate attention."
                    }
                  </p>
                  <p className="text-gray-700">
                    CAC Payback Period: <span className="font-semibold">{results.paybackPeriod.toFixed(2)} months</span>
                    {results.paybackPeriod <= 12 
                      ? " - You're recovering your customer acquisition cost in under a year, which is excellent."
                      : " - It takes over a year to recover your acquisition costs, which may limit your growth potential."
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-darkGreen">
              <FileText className="mr-2 h-5 w-5" />
              Valuation Assessment & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                Based on your Annual Recurring Revenue of <span className="font-semibold">{formatCurrency(results.annualRevenue)}</span> and 
                a valuation multiple of <span className="font-semibold">{results.valuationMultiple}x</span>, your estimated company 
                valuation is <span className="font-semibold">{formatCurrency(results.estimatedValuation)}</span>.
              </p>
              
              <h4 className="font-semibold text-darkGreen">Key Insights:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Growth Rate:</span> Your annual growth rate of {results.growthRate}% is 
                  {results.growthRate >= 40 
                    ? " exceptional and positions you as a high-growth SaaS company." 
                    : results.growthRate >= 20 
                      ? " healthy and typical of successful SaaS businesses."
                      : " below the industry average for high-value SaaS companies."}
                </li>
                <li>
                  <span className="font-medium">Churn Rate:</span> Your annual churn rate of {results.churnRate}% is 
                  {results.churnRate <= 5 
                    ? " excellent, indicating strong product-market fit and customer satisfaction." 
                    : results.churnRate <= 10 
                      ? " acceptable but could be improved to increase customer lifetime value."
                      : " high and should be addressed to improve retention and overall valuation."}
                </li>
                <li>
                  <span className="font-medium">ARPU:</span> Your Average Revenue Per User of {formatCurrency(results.arpu)} is 
                  {results.arpu >= 10000 
                    ? " strong, suggesting you're targeting enterprise or mid-market customers." 
                    : results.arpu >= 1000 
                      ? " in the mid-range, typical of SMB-focused SaaS products."
                      : " on the lower end, which might limit your revenue potential without significant scale."}
                </li>
              </ul>
              
              <h4 className="font-semibold text-darkGreen">Recommendations to Improve Valuation:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {results.churnRate > 5 && (
                  <li>
                    <span className="font-medium">Reduce Churn:</span> Implement stronger customer success programs and 
                    product improvements to reduce your churn rate to below 5%.
                  </li>
                )}
                {results.growthRate < 20 && (
                  <li>
                    <span className="font-medium">Accelerate Growth:</span> Invest in scalable customer acquisition channels 
                    and consider expansion revenue opportunities to boost your growth rate.
                  </li>
                )}
                {results.arpu < 5000 && (
                  <li>
                    <span className="font-medium">Increase ARPU:</span> Consider pricing strategies, upsell opportunities, 
                    and moving upmarket to increase your average revenue per user.
                  </li>
                )}
                {results.ltv / results.cac < 3 && (
                  <li>
                    <span className="font-medium">Improve Unit Economics:</span> Work on reducing your CAC through more 
                    efficient marketing or increasing your LTV through better retention and pricing.
                  </li>
                )}
                <li>
                  <span className="font-medium">Documentation:</span> Maintain clean financial records and clear growth metrics
                  to support your valuation during investor discussions.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ARRCalculatorResults;
