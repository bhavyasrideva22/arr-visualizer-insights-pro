
import { ARRData, formatCurrency } from './arrCalculations';

export interface EmailData {
  recipientEmail: string;
  arrData: ARRData;
}

export const prepareEmailBody = (data: ARRData): string => {
  const ltvCacRatio = data.ltv / data.cac;
  
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            background-color: #245e4f;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .content {
            padding: 20px;
            background-color: #f8f8f8;
          }
          .metrics-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .metrics-table th {
            background-color: #245e4f;
            color: white;
            padding: 10px;
            text-align: left;
          }
          .metrics-table td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
          .metrics-table tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          .footer {
            background-color: #245e4f;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 12px;
          }
          .highlight {
            color: #245e4f;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ARR Insights Pro</h1>
          <h2>SaaS Valuation Report</h2>
        </div>
        <div class="content">
          <h3>Executive Summary</h3>
          <p>
            This report provides a comprehensive analysis of your SaaS business metrics based on the data provided. 
            With an Annual Recurring Revenue (ARR) of <span class="highlight">${formatCurrency(data.annualRevenue)}</span>, 
            your estimated company valuation is <span class="highlight">${formatCurrency(data.estimatedValuation)}</span> 
            at a multiple of ${data.valuationMultiple}x ARR.
          </p>
          
          <h3>Key Metrics</h3>
          <table class="metrics-table">
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Monthly Recurring Revenue</td>
              <td>${formatCurrency(data.monthlyRevenue)}</td>
            </tr>
            <tr>
              <td>Annual Recurring Revenue</td>
              <td>${formatCurrency(data.annualRevenue)}</td>
            </tr>
            <tr>
              <td>Total Customers</td>
              <td>${data.customerCount}</td>
            </tr>
            <tr>
              <td>Average Revenue Per User (ARPU)</td>
              <td>${formatCurrency(data.arpu)}</td>
            </tr>
            <tr>
              <td>Customer Lifetime Value (LTV)</td>
              <td>${formatCurrency(data.ltv)}</td>
            </tr>
            <tr>
              <td>Customer Acquisition Cost (CAC)</td>
              <td>${formatCurrency(data.cac)}</td>
            </tr>
            <tr>
              <td>LTV:CAC Ratio</td>
              <td>${ltvCacRatio.toFixed(2)}</td>
            </tr>
            <tr>
              <td>CAC Payback Period</td>
              <td>${data.paybackPeriod.toFixed(2)} months</td>
            </tr>
            <tr>
              <td>Annual Growth Rate</td>
              <td>${data.growthRate.toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Annual Churn Rate</td>
              <td>${data.churnRate.toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Valuation Multiple</td>
              <td>${data.valuationMultiple}x ARR</td>
            </tr>
            <tr>
              <td>Estimated Company Valuation</td>
              <td>${formatCurrency(data.estimatedValuation)}</td>
            </tr>
          </table>
          
          <p>
            For a more detailed analysis and recommendations, please see the attached PDF report.
          </p>
          
          <p>
            Thank you for using ARR Insights Pro. If you have any questions or need further assistance,
            please don't hesitate to contact our support team.
          </p>
        </div>
        <div class="footer">
          ARR Insights Pro © ${new Date().getFullYear()} | All rights reserved.
        </div>
      </body>
    </html>
  `;
};

export const handleEmailSubmission = async (emailData: EmailData): Promise<boolean> => {
  // In a real application, this would send the email using a service like SendGrid, Mailchimp, etc.
  // For now, we'll just simulate successful sending
  
  console.log('Sending email to:', emailData.recipientEmail);
  console.log('Email body:', prepareEmailBody(emailData.arrData));
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return success (in a real app, you'd return true/false based on the actual email sending result)
  return true;
};
