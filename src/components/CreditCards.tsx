
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CreditCard } from "lucide-react";

const mockCreditCards = [
  {
    bank: "HDFC Bank",
    limit: 500000,
    used: 175000,
    color: "bg-blue-600",
  },
  {
    bank: "SBI Bank",
    limit: 20000,
    used: 12000,
    color: "bg-red-600",
  },
  {
    bank: "Axis Bank",
    limit: 1000000,
    used: 450000,
    color: "bg-purple-600",
  },
];

export const CreditCards = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-cred-yellow" />
          Credit Cards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockCreditCards.map((card, index) => {
            const usagePercentage = calculateUsagePercentage(card.used, card.limit);
            
            return (
              <div key={index} className="p-4 border border-cred-yellow/20 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 ${card.color} rounded flex items-center justify-center text-white font-bold`}>
                      {card.bank[0]}
                    </div>
                    <div>
                      <h4 className="font-medium">{card.bank}</h4>
                      <p className="text-sm text-cred-silver">Credit Limit: {formatCurrency(card.limit)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(card.used)}</p>
                    <p className="text-sm text-cred-silver">Used</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={usagePercentage} className="h-2" />
                  <p className="text-sm text-right">{usagePercentage}% utilized</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
