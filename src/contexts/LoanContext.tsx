import { createContext, useContext, useState, ReactNode } from "react";

// Define loan types
export interface Loan {
  id: string;
  type: string;
  amount: number;
  interestRate: number;
  duration: number;
  dueDate: string;
  status: "active" | "paid" | "overdue";
}

export type RiskLevel = "apt" | "good" | "moderate" | "at-risk";

interface LoanContextType {
  loans: Loan[];
  totalLoanAmount: number;
  creditRiskLevel: RiskLevel;
  creditRiskScore: number;
}

// Mock loan data
const mockLoans: Loan[] = [
  {
    id: "loan-1",
    type: "Auto Loan",
    amount: 25000,
    interestRate: 4.5,
    duration: 60,
    dueDate: "2028-05-15",
    status: "active",
  },
  {
    id: "loan-2",
    type: "Personal Loan",
    amount: 10000,
    interestRate: 7.2,
    duration: 36,
    dueDate: "2026-10-22",
    status: "active",
  },
  {
    id: "loan-3",
    type: "Mortgage",
    amount: 250000,
    interestRate: 3.8,
    duration: 360,
    dueDate: "2052-03-10",
    status: "active",
  },
  {
    id: "loan-4",
    type: "Credit Card",
    amount: 3500,
    interestRate: 18.99,
    duration: 12,
    dueDate: "2025-01-18",
    status: "active",
  },
  {
    id: "loan-5",
    type: "Personal Loan",
    amount: 15000,
    interestRate: 8.5,
    duration: 24,
    dueDate: "2024-01-15",
    status: "paid",
  },
  {
    id: "loan-6",
    type: "Education Loan",
    amount: 30000,
    interestRate: 6.5,
    duration: 36,
    dueDate: "2024-02-20",
    status: "paid",
  }
];

const LoanContext = createContext<LoanContextType | null>(null);

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error("useLoan must be used within a LoanProvider");
  }
  return context;
};

// Update risk calculation
const calculateRiskLevel = (totalAmount: number): { level: RiskLevel; score: number } => {
  return { level: "moderate", score: 65 };
};

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans] = useState<Loan[]>(mockLoans);
  
  // Calculate total loan amount
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
  
  // Calculate risk level
  const { level: creditRiskLevel, score: creditRiskScore } = calculateRiskLevel(totalLoanAmount);
  
  return (
    <LoanContext.Provider
      value={{
        loans,
        totalLoanAmount,
        creditRiskLevel,
        creditRiskScore,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};
