
export interface ARRData {
  monthlyRevenue: number;
  annualRevenue: number;
  customerCount: number;
  churnRate: number;
  growthRate: number;
  arpu: number; // Average Revenue Per User
  ltv: number; // Lifetime Value
  cac: number; // Customer Acquisition Cost
  paybackPeriod: number;
  valuationMultiple: number;
  estimatedValuation: number;
}

export const calculateARR = (monthlySubs: number): number => {
  return monthlySubs * 12;
};

export const calculateARPU = (revenue: number, customers: number): number => {
  if (customers === 0) return 0;
  return revenue / customers;
};

export const calculateLTV = (arpu: number, churnRate: number): number => {
  if (churnRate === 0) return arpu * 60; // Cap at 5 years if no churn
  return arpu / (churnRate / 100);
};

export const calculatePaybackPeriod = (cac: number, arpu: number): number => {
  if (arpu === 0) return 0;
  return cac / arpu;
};

export const calculateValuation = (arr: number, multiple: number): number => {
  return arr * multiple;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const generateAllMetrics = (
  monthlyRevenue: number,
  customerCount: number,
  churnRate: number,
  growthRate: number,
  cac: number,
  valuationMultiple: number
): ARRData => {
  const annualRevenue = calculateARR(monthlyRevenue);
  const arpu = calculateARPU(monthlyRevenue, customerCount);
  const ltv = calculateLTV(arpu, churnRate);
  const paybackPeriod = calculatePaybackPeriod(cac, arpu);
  const estimatedValuation = calculateValuation(annualRevenue, valuationMultiple);

  return {
    monthlyRevenue,
    annualRevenue,
    customerCount,
    churnRate,
    growthRate,
    arpu,
    ltv,
    cac,
    paybackPeriod,
    valuationMultiple,
    estimatedValuation,
  };
};

// Generate projected growth data for charts
export const generateProjectionData = (
  currentARR: number, 
  growthRate: number,
  years: number = 5
): { year: number; arr: number }[] => {
  const data = [];
  let yearARR = currentARR;
  
  for (let i = 0; i <= years; i++) {
    data.push({
      year: new Date().getFullYear() + i,
      arr: Math.round(yearARR)
    });
    yearARR = yearARR * (1 + growthRate / 100);
  }
  
  return data;
};

// Calculate customer metrics for charts
export const calculateCustomerMetrics = (
  initialCustomers: number,
  churnRate: number,
  growthRate: number,
  years: number = 5
): { year: number; customers: number; newCustomers: number; churnedCustomers: number }[] => {
  const data = [];
  let customers = initialCustomers;
  
  for (let i = 0; i <= years; i++) {
    const churnedCustomers = Math.round(customers * (churnRate / 100));
    const newCustomers = Math.round(customers * (growthRate / 100));
    customers = customers - churnedCustomers + newCustomers;
    
    data.push({
      year: new Date().getFullYear() + i,
      customers,
      newCustomers,
      churnedCustomers
    });
  }
  
  return data;
};
