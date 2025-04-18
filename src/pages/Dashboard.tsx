import { AppLayout } from "@/components/AppLayout";
import { useLoan } from "@/contexts/LoanContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CreditCard, TrendingUp } from "lucide-react";
import { CreditCards } from "@/components/CreditCards";

const Dashboard = () => {
  const { loans, totalLoanAmount, creditRiskLevel, creditRiskScore } = useLoan();

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Risk level color and label
  const getRiskData = () => {
    switch (creditRiskLevel) {
      case "apt":
        return {
          color: "bg-green-400",
          label: "Apt",
          description: "Your credit risk is very low. You're in excellent standing."
        };
      case "good":
        return {
          color: "bg-blue-400",
          label: "Good",
          description: "Your credit risk is manageable. You're in good standing."
        };
      case "moderate":
        return {
          color: "bg-yellow-400",
          label: "Moderate",
          description: "Your credit risk is moderate. Consider reviewing your loan portfolio."
        };
      case "at-risk":
        return {
          color: "bg-red-500",
          label: "At Risk",
          description: "Your credit risk is very high. Immediate action recommended."
        };
      default:
        return {
          color: "bg-gray-400",
          label: "Unknown",
          description: "We couldn't determine your credit risk."
        };
    }
  };

  const riskData = getRiskData();

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-cred-yellow">Dashboard</h1>
        <p className="text-cred-silver text-sm">
          View your loan details and credit risk assessment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Loan Amount */}
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cred-yellow">
              Total Loan Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(totalLoanAmount)}</div>
            <div className="text-xs text-cred-silver mt-1">
              Across {loans.length} active loans
            </div>
          </CardContent>
        </Card>

        {/* Credit Risk Score */}
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cred-yellow">
              Credit Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-white">{creditRiskScore}</div>
              <div className={`risk-dot ${riskData.color}`}></div>
              <div className="text-sm">{riskData.label}</div>
            </div>
            <Progress
              value={creditRiskScore}
              className="h-2 mt-3"
              indicatorClassName={riskData.color}
            />
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cred-yellow">
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-2">
              <AlertCircle className={`h-5 w-5 mt-0.5 ${creditRiskLevel === "moderate" ? "text-yellow-400" : "text-green-400"}`} />
              <div className="text-sm">{riskData.description}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Cards Section */}
      <div className="mb-6">
        <CreditCards />
      </div>

      {/* Loans Section */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-cred-yellow" />
            Your Loans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-black mb-6 border-b border-cred-yellow/30">
              <TabsTrigger value="all">All Loans</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="rounded-md border border-cred-yellow/20 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-black border-b border-cred-yellow/30">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver">Type</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver">Amount</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver hidden md:table-cell">Interest Rate</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver hidden md:table-cell">Duration</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver">Due Date</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan) => (
                      <tr key={loan.id} className="border-t border-cred-silver/10 hover:bg-black hover:border-cred-yellow">
                        <td className="p-3">{loan.type}</td>
                        <td className="p-3">{formatCurrency(loan.amount)}</td>
                        <td className="p-3 hidden md:table-cell">{loan.interestRate}%</td>
                        <td className="p-3 hidden md:table-cell">{loan.duration} months</td>
                        <td className="p-3">{new Date(loan.dueDate).toLocaleDateString()}</td>
                        <td className="p-3">
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-400/10 text-green-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5"></div>
                            {loan.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="active" className="mt-0">
              <div className="rounded-md border border-cred-yellow/20 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-black border-b border-cred-yellow/30">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver">Type</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver">Amount</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver hidden md:table-cell">Interest Rate</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver hidden md:table-cell">Duration</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans
                      .filter(loan => loan.status === "active")
                      .map((loan) => (
                        <tr key={loan.id} className="border-t border-cred-silver/10 hover:bg-black hover:border-cred-yellow">
                          <td className="p-3">{loan.type}</td>
                          <td className="p-3">{formatCurrency(loan.amount)}</td>
                          <td className="p-3 hidden md:table-cell">{loan.interestRate}%</td>
                          <td className="p-3 hidden md:table-cell">{loan.duration} months</td>
                          <td className="p-3">{new Date(loan.dueDate).toLocaleDateString()}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="paid" className="mt-0">
              <div className="rounded-md border border-cred-yellow/20 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-black border-b border-cred-yellow/30">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver">Type</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver">Amount</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver hidden md:table-cell">Interest Rate</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver hidden md:table-cell">Duration</th>
                      <th className="text-left p-3 text-sm font-medium text-cred-silver">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans
                      .filter(loan => loan.status === "paid")
                      .map((loan) => (
                        <tr key={loan.id} className="border-t border-cred-silver/10 hover:bg-black hover:border-cred-yellow">
                          <td className="p-3">{loan.type}</td>
                          <td className="p-3">{formatCurrency(loan.amount)}</td>
                          <td className="p-3 hidden md:table-cell">{loan.interestRate}%</td>
                          <td className="p-3 hidden md:table-cell">{loan.duration} months</td>
                          <td className="p-3">{new Date(loan.dueDate).toLocaleDateString()}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Dashboard;
