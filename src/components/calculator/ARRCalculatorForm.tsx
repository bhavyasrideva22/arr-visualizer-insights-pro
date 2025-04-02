
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { generateAllMetrics, formatCurrency, ARRData, generateProjectionData, calculateCustomerMetrics } from '@/utils/arrCalculations';
import ARRCalculatorResults from './ARRCalculatorResults';
import SendReportDialog from './SendReportDialog';
import { Badge } from '@/components/ui/badge';
import { 
  BadgeIndianRupee, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Calculator
} from 'lucide-react';

const ARRCalculatorForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    monthlyRevenue: 200000,
    customerCount: 100,
    churnRate: 5,
    growthRate: 15,
    cac: 5000,
    valuationMultiple: 10,
  });
  
  const [results, setResults] = useState<ARRData | null>(null);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  const [customerData, setCustomerData] = useState<any[]>([]);
  
  const handleCalculate = () => {
    try {
      const calculatedResults = generateAllMetrics(
        formData.monthlyRevenue,
        formData.customerCount,
        formData.churnRate,
        formData.growthRate,
        formData.cac,
        formData.valuationMultiple
      );
      
      setResults(calculatedResults);
      
      // Generate projection data for charts
      const projData = generateProjectionData(
        calculatedResults.annualRevenue,
        formData.growthRate
      );
      setProjectionData(projData);
      
      // Generate customer metrics for charts
      const custData = calculateCustomerMetrics(
        formData.customerCount,
        formData.churnRate,
        formData.growthRate
      );
      setCustomerData(custData);
      
      toast({
        title: "Calculation Complete",
        description: "Your ARR and valuation metrics have been calculated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Calculation Error",
        description: "There was an error calculating your metrics. Please check your inputs and try again.",
      });
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      [name]: value[0],
    }));
  };
  
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md p-6 card-shadow animate-fade-in">
        <div className="flex items-center mb-6">
          <Calculator className="text-darkGreen mr-2 h-6 w-6" />
          <h2 className="text-2xl font-bold text-darkGreen">ARR Calculator</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Revenue */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="monthlyRevenue" className="flex items-center">
                <BadgeIndianRupee className="mr-1 h-4 w-4 text-darkGreen" />
                Monthly Revenue
              </Label>
              <Badge variant="outline" className="text-darkGreen">
                {formatCurrency(formData.monthlyRevenue)}
              </Badge>
            </div>
            <Input
              id="monthlyRevenue"
              name="monthlyRevenue"
              type="number"
              value={formData.monthlyRevenue}
              onChange={handleChange}
              min="0"
              step="10000"
              className="w-full"
            />
            <Slider 
              value={[formData.monthlyRevenue]} 
              min={0} 
              max={5000000} 
              step={10000}
              onValueChange={(value) => handleSliderChange('monthlyRevenue', value)}
              className="mt-2"
            />
          </div>
          
          {/* Customer Count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="customerCount" className="flex items-center">
                <Users className="mr-1 h-4 w-4 text-darkGreen" />
                Customer Count
              </Label>
              <Badge variant="outline" className="text-darkGreen">
                {formData.customerCount}
              </Badge>
            </div>
            <Input
              id="customerCount"
              name="customerCount"
              type="number"
              value={formData.customerCount}
              onChange={handleChange}
              min="1"
              step="10"
              className="w-full"
            />
            <Slider 
              value={[formData.customerCount]} 
              min={1} 
              max={1000} 
              step={10}
              onValueChange={(value) => handleSliderChange('customerCount', value)}
              className="mt-2"
            />
          </div>
          
          {/* Annual Churn Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="churnRate" className="flex items-center">
                <TrendingDown className="mr-1 h-4 w-4 text-darkGreen" />
                Annual Churn Rate
              </Label>
              <Badge variant="outline" className="text-darkGreen">
                {formData.churnRate}%
              </Badge>
            </div>
            <Input
              id="churnRate"
              name="churnRate"
              type="number"
              value={formData.churnRate}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.5"
              className="w-full"
            />
            <Slider 
              value={[formData.churnRate]} 
              min={0} 
              max={50} 
              step={0.5}
              onValueChange={(value) => handleSliderChange('churnRate', value)}
              className="mt-2"
            />
          </div>
          
          {/* Annual Growth Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="growthRate" className="flex items-center">
                <TrendingUp className="mr-1 h-4 w-4 text-darkGreen" />
                Annual Growth Rate
              </Label>
              <Badge variant="outline" className="text-darkGreen">
                {formData.growthRate}%
              </Badge>
            </div>
            <Input
              id="growthRate"
              name="growthRate"
              type="number"
              value={formData.growthRate}
              onChange={handleChange}
              min="0"
              max="200"
              step="1"
              className="w-full"
            />
            <Slider 
              value={[formData.growthRate]} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={(value) => handleSliderChange('growthRate', value)}
              className="mt-2"
            />
          </div>
          
          {/* Customer Acquisition Cost */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="cac" className="flex items-center">
                <BadgeIndianRupee className="mr-1 h-4 w-4 text-darkGreen" />
                Customer Acquisition Cost
              </Label>
              <Badge variant="outline" className="text-darkGreen">
                {formatCurrency(formData.cac)}
              </Badge>
            </div>
            <Input
              id="cac"
              name="cac"
              type="number"
              value={formData.cac}
              onChange={handleChange}
              min="0"
              step="1000"
              className="w-full"
            />
            <Slider 
              value={[formData.cac]} 
              min={0} 
              max={100000} 
              step={1000}
              onValueChange={(value) => handleSliderChange('cac', value)}
              className="mt-2"
            />
          </div>
          
          {/* Valuation Multiple */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="valuationMultiple" className="flex items-center">
                <Calculator className="mr-1 h-4 w-4 text-darkGreen" />
                Valuation Multiple (x ARR)
              </Label>
              <Badge variant="outline" className="text-darkGreen">
                {formData.valuationMultiple}x
              </Badge>
            </div>
            <Input
              id="valuationMultiple"
              name="valuationMultiple"
              type="number"
              value={formData.valuationMultiple}
              onChange={handleChange}
              min="1"
              max="30"
              step="0.5"
              className="w-full"
            />
            <Slider 
              value={[formData.valuationMultiple]} 
              min={1} 
              max={30} 
              step={0.5}
              onValueChange={(value) => handleSliderChange('valuationMultiple', value)}
              className="mt-2"
            />
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Button 
            onClick={handleCalculate}
            className="bg-gold hover:bg-opacity-90 text-darkGreen font-semibold px-6 py-2"
          >
            Calculate Results
          </Button>
        </div>
      </div>
      
      {results && (
        <>
          <ARRCalculatorResults 
            results={results} 
            projectionData={projectionData}
            customerData={customerData}
            onSendReport={() => setShowSendDialog(true)}
          />
          
          {showSendDialog && (
            <SendReportDialog 
              results={results}
              onClose={() => setShowSendDialog(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ARRCalculatorForm;
