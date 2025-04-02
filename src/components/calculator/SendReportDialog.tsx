
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Loader2 } from 'lucide-react';
import { ARRData } from '@/utils/arrCalculations';
import { handleEmailSubmission } from '@/utils/emailSender';

interface SendReportDialogProps {
  results: ARRData;
  onClose: () => void;
}

const SendReportDialog: React.FC<SendReportDialogProps> = ({ 
  results, 
  onClose 
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [includeDetails, setIncludeDetails] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async () => {
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');
    setIsSubmitting(true);
    
    try {
      const success = await handleEmailSubmission({
        recipientEmail: email,
        arrData: results
      });
      
      if (success) {
        toast({
          title: "Report Sent Successfully",
          description: `The ARR valuation report has been sent to ${email}`,
        });
        onClose();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Send Report",
        description: "There was an error sending the report. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-darkGreen">
            <Mail className="mr-2 h-5 w-5" />
            Send Valuation Report
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-darkGreen">Email Address</Label>
            <Input 
              id="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emailError ? "border-red-500" : ""}
            />
            {emailError && (
              <p className="text-red-500 text-sm">{emailError}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="includeDetails" 
              checked={includeDetails}
              onCheckedChange={(checked) => setIncludeDetails(checked as boolean)}
            />
            <Label htmlFor="includeDetails" className="text-sm text-gray-700">
              Include detailed analysis and recommendations
            </Label>
          </div>
          
          <div className="text-sm text-gray-500 mt-2">
            <p>
              We'll send the ARR valuation report to the provided email address.
              The report will include all calculated metrics and a PDF attachment.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gold hover:bg-opacity-90 text-darkGreen"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Report
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendReportDialog;
