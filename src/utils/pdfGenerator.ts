
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ARRData, formatCurrency } from './arrCalculations';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const addLogo = (doc: jsPDF) => {
  // Add a placeholder logo/header
  doc.setFillColor(36, 94, 79); // darkGreen
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("ARR Insights Pro", 105, 15, { align: "center" });
  doc.setFontSize(12);
  doc.text("SaaS Valuation Report", 105, 22, { align: "center" });
};

const addFooter = (doc: jsPDF) => {
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} | Page ${i} of ${pageCount}`,
      105,
      285,
      { align: "center" }
    );
    doc.text("ARR Insights Pro © " + new Date().getFullYear(), 105, 290, { 
      align: "center" 
    });
  }
};

export const generatePDF = (data: ARRData): jsPDF => {
  const doc = new jsPDF();
  
  // Add logo/header
  addLogo(doc);
  
  // Add title
  doc.setTextColor(36, 94, 79); // darkGreen
  doc.setFontSize(18);
  doc.text("SaaS ARR Valuation Report", 105, 40, { align: "center" });
  
  // Add date
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 48, { align: "center" });
  
  // Add summary
  doc.setFontSize(14);
  doc.setTextColor(36, 94, 79);
  doc.text("Executive Summary", 20, 60);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  const text = `This report provides a comprehensive analysis of your SaaS business metrics based on the data provided. With an Annual Recurring Revenue (ARR) of ${formatCurrency(data.annualRevenue)}, your estimated company valuation is ${formatCurrency(data.estimatedValuation)} at a multiple of ${data.valuationMultiple}x ARR.`;
  
  const textLines = doc.splitTextToSize(text, 170);
  doc.text(textLines, 20, 70);
  
  // Add key metrics table
  doc.autoTable({
    startY: 90,
    head: [['Metric', 'Value']],
    body: [
      ['Monthly Recurring Revenue', formatCurrency(data.monthlyRevenue)],
      ['Annual Recurring Revenue', formatCurrency(data.annualRevenue)],
      ['Total Customers', data.customerCount.toString()],
      ['Average Revenue Per User (ARPU)', formatCurrency(data.arpu)],
      ['Customer Lifetime Value (LTV)', formatCurrency(data.ltv)],
      ['Customer Acquisition Cost (CAC)', formatCurrency(data.cac)],
      ['LTV:CAC Ratio', (data.ltv / data.cac).toFixed(2)],
      ['CAC Payback Period', data.paybackPeriod.toFixed(2) + ' months'],
      ['Annual Growth Rate', data.growthRate.toFixed(2) + '%'],
      ['Annual Churn Rate', data.churnRate.toFixed(2) + '%'],
      ['Valuation Multiple', data.valuationMultiple.toString() + 'x ARR'],
      ['Estimated Company Valuation', formatCurrency(data.estimatedValuation)],
    ],
    theme: 'grid',
    headStyles: { 
      fillColor: [36, 94, 79],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    margin: { top: 90, right: 20, bottom: 20, left: 20 },
  });
  
  // Add analysis section
  const currentY = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(14);
  doc.setTextColor(36, 94, 79);
  doc.text("Business Analysis", 20, currentY);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  let analysis = '';
  
  // LTV:CAC analysis
  const ltvCacRatio = data.ltv / data.cac;
  if (ltvCacRatio >= 3) {
    analysis += `Your LTV:CAC ratio of ${ltvCacRatio.toFixed(2)} is excellent. This indicates strong unit economics and a very profitable customer acquisition strategy. `;
  } else if (ltvCacRatio >= 1) {
    analysis += `Your LTV:CAC ratio of ${ltvCacRatio.toFixed(2)} is positive but could be improved. Aim for a ratio of 3 or higher for optimal unit economics. `;
  } else {
    analysis += `Your LTV:CAC ratio of ${ltvCacRatio.toFixed(2)} is concerning. You're spending more to acquire customers than they generate in lifetime value. `;
  }
  
  // Payback period analysis
  if (data.paybackPeriod <= 12) {
    analysis += `Your CAC payback period of ${data.paybackPeriod.toFixed(2)} months is healthy, allowing for rapid reinvestment of capital. `;
  } else {
    analysis += `Your CAC payback period of ${data.paybackPeriod.toFixed(2)} months is long. Consider strategies to reduce CAC or increase ARPU. `;
  }
  
  // Churn analysis
  if (data.churnRate <= 5) {
    analysis += `Your annual churn rate of ${data.churnRate.toFixed(2)}% is excellent, indicating strong product-market fit and customer satisfaction. `;
  } else if (data.churnRate <= 10) {
    analysis += `Your annual churn rate of ${data.churnRate.toFixed(2)}% is reasonable but could be improved with better retention strategies. `;
  } else {
    analysis += `Your annual churn rate of ${data.churnRate.toFixed(2)}% is high and should be addressed as a priority to improve valuation. `;
  }
  
  const analysisLines = doc.splitTextToSize(analysis, 170);
  doc.text(analysisLines, 20, currentY + 10);
  
  // Add recommendations
  const recommendationsY = currentY + 10 + (analysisLines.length * 5) + 10;
  
  doc.setFontSize(14);
  doc.setTextColor(36, 94, 79);
  doc.text("Recommendations", 20, recommendationsY);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  let recommendations = '';
  
  if (ltvCacRatio < 3) {
    recommendations += '• Improve your LTV:CAC ratio by reducing customer acquisition costs or increasing customer lifetime value.\n';
  }
  
  if (data.paybackPeriod > 12) {
    recommendations += '• Work on reducing your CAC payback period through more efficient marketing or increased pricing.\n';
  }
  
  if (data.churnRate > 5) {
    recommendations += '• Focus on reducing churn through improved onboarding, customer success initiatives, and product improvements.\n';
  }
  
  if (data.growthRate < 20) {
    recommendations += '• Consider strategies to accelerate growth through new customer acquisition channels or expansion revenue.\n';
  }
  
  if (recommendations === '') {
    recommendations = 'Your SaaS metrics are very strong. Continue with your current strategy and consider raising growth capital to accelerate expansion.';
  }
  
  const recommendationsLines = doc.splitTextToSize(recommendations, 170);
  doc.text(recommendationsLines, 20, recommendationsY + 10);
  
  // Add footer
  addFooter(doc);

  return doc;
};
