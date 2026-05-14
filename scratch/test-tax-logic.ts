import { calculateOldRegimeTax, calculateNewRegimeTax, TaxInputs } from "../lib/tax-calculations";

const testCases: { name: string; inputs: TaxInputs }[] = [
  {
    name: "Income 7L - No Deductions",
    inputs: {
      grossSalary: 700000,
      hraExemption: 0,
      section80C: 0,
      section80D: 0,
      otherDeductions: 0,
      interestOnHomeLoan: 0,
    },
  },
  {
    name: "Income 10L - High Deductions (1.5L 80C + 50k 80D)",
    inputs: {
      grossSalary: 1000000,
      hraExemption: 0,
      section80C: 150000,
      section80D: 50000,
      otherDeductions: 0,
      interestOnHomeLoan: 0,
    },
  },
  {
    name: "Income 15L - Balanced",
    inputs: {
      grossSalary: 1500000,
      hraExemption: 100000,
      section80C: 150000,
      section80D: 25000,
      otherDeductions: 0,
      interestOnHomeLoan: 0,
    },
  },
];

console.log("=== Tax Calculation Test Results ===\n");

testCases.forEach((tc) => {
  const oldR = calculateOldRegimeTax(tc.inputs);
  const newR = calculateNewRegimeTax(tc.inputs);

  console.log(`Test Case: ${tc.name}`);
  console.log(`Gross: ${tc.inputs.grossSalary}`);
  console.log(`Old Regime Tax: ${oldR.totalTax.toFixed(2)} (Taxable: ${oldR.taxableIncome})`);
  console.log(`New Regime Tax: ${newR.totalTax.toFixed(2)} (Taxable: ${newR.taxableIncome})`);
  console.log(`Winner: ${oldR.totalTax < newR.totalTax ? "OLD" : "NEW"}`);
  console.log("-----------------------------------\n");
});
