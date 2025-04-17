
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

export type RiskLevel = "apt" | "good" | "bad" | "at-risk";

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
    duration: 60, // months
    dueDate: "2028-05-15",
    status: "active",
  },
  {
    id: "loan-2",
    type: "Personal Loan",
    amount: 10000,
    interestRate: 7.2,
    duration: 36, // months
    dueDate: "2026-10-22",
    status: "active",
  },
  {
    id: "loan-3",
    type: "Mortgage",
    amount: 250000,
    interestRate: 3.8,
    duration: 360, // months
    dueDate: "2052-03-10",
    status: "active",
  },
  {
    id: "loan-4",
    type: "Credit Card",
    amount: 3500,
    interestRate: 18.99,
    duration: 12, // months
    dueDate: "2025-01-18",
    status: "active",
  },
];

const LoanContext = createContext<LoanContextType | null>(null);

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error("useLoan must be used within a LoanProvider");
  }
  return context;
};

// Helper function to calculate risk level
const calculateRiskLevel = (totalAmount: number): { level: RiskLevel; score: number } => {
  // Simple risk calculation based on total loan amount
  if (totalAmount <= 15000) {
    return { level: "apt", score: 85 };
  } else if (totalAmount <= 50000) {
    return { level: "good", score: 72 };
  } else if (totalAmount <= 200000) {
    return { level: "bad", score: 45 };
  } else {
    return { level: "at-risk", score: 28 };
  }
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
