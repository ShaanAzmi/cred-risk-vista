
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CircleCheck, Link } from "lucide-react";

const LinkBank = () => {
  const { linkBank } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const handleLinkBank = async () => {
    setLoading(true);
    setStep(1);

    // Simulate API call
    setTimeout(() => {
      setStep(2);
      setTimeout(() => {
        setStep(3);
        setTimeout(() => {
          setLoading(false);
          linkBank();
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md p-8 bg-cred-dark-gray border-cred-silver/20">
        <div className="flex flex-col items-center space-y-2 mb-8">
          <Link className="h-12 w-12 text-cred-yellow mb-2" />
          <h1 className="text-2xl font-bold text-white text-center">
            Link Your Bank Account
          </h1>
          <p className="text-cred-silver text-sm text-center">
            Connect your bank account to analyze your credit risk
          </p>
        </div>

        {loading ? (
          <div className="space-y-6">
            <Progress value={(step / 3) * 100} className="h-2 bg-gray-700" />
            <div className="text-center text-cred-silver">
              {step === 1 && "Establishing secure connection..."}
              {step === 2 && "Verifying account information..."}
              {step === 3 && (
                <div className="flex justify-center items-center gap-2">
                  <CircleCheck className="text-green-400 h-5 w-5" />
                  <span className="text-green-400">Connection successful!</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 border border-cred-silver/20 rounded-lg flex items-center gap-4 hover:bg-black/50 cursor-pointer transition-colors">
                <div className="h-10 w-10 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div>
                  <div className="font-medium">Chase Bank</div>
                  <div className="text-sm text-cred-silver">Connect your Chase account</div>
                </div>
              </div>
              
              <div className="p-4 border border-cred-silver/20 rounded-lg flex items-center gap-4 hover:bg-black/50 cursor-pointer transition-colors">
                <div className="h-10 w-10 bg-red-600 rounded-md flex items-center justify-center text-white font-bold">
                  B
                </div>
                <div>
                  <div className="font-medium">Bank of America</div>
                  <div className="text-sm text-cred-silver">Connect your BoA account</div>
                </div>
              </div>
              
              <div className="p-4 border border-cred-silver/20 rounded-lg flex items-center gap-4 hover:bg-black/50 cursor-pointer transition-colors">
                <div className="h-10 w-10 bg-gray-600 rounded-md flex items-center justify-center text-white font-bold">
                  W
                </div>
                <div>
                  <div className="font-medium">Wells Fargo</div>
                  <div className="text-sm text-cred-silver">Connect your Wells Fargo account</div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleLinkBank}
              className="w-full bg-cred-yellow hover:bg-cred-yellow/90 text-black font-medium"
            >
              Connect Bank Account
            </Button>
            
            <p className="text-center text-xs text-cred-silver">
              Your banking information is encrypted and secure. We use bank-level security measures to protect your data.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LinkBank;
