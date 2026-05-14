/**
 * Tax Calculation Logic for FY 2024-25 (Assessment Year 2025-26)
 * Based on the Union Budget July 2024 updates.
 */

export interface TaxInputs {
  grossSalary: number;
  hraExemption: number;
  section80C: number;
  section80D: number;
  otherDeductions: number;
  interestOnHomeLoan: number; // Section 24(b)
}

export interface TaxResult {
  taxableIncome: number;
  baseTax: number;
  rebate: number;
  cess: number;
  totalTax: number;
  slabs: { label: string; amount: number; rate: number; tax: number }[];
}

export interface ComparisonResult {
  oldRegime: TaxResult;
  newRegime: TaxResult;
  recommendation: "OLD" | "NEW" | "EQUAL";
  savings: number;
}

const CESS_RATE = 0.04;

/**
 * Calculates tax under the Old Regime
 */
export function calculateOldRegimeTax(inputs: TaxInputs): TaxResult {
  const standardDeduction = 50000;
  const totalDeductions = 
    standardDeduction + 
    inputs.hraExemption + 
    Math.min(inputs.section80C, 150000) + 
    Math.min(inputs.section80D, 25000 + 50000) + // Simple assumption for now
    inputs.otherDeductions +
    Math.min(inputs.interestOnHomeLoan, 200000);

  const taxableIncome = Math.max(0, inputs.grossSalary - totalDeductions);
  let tax = 0;
  const slabs = [];

  // Slab logic
  if (taxableIncome > 1000000) {
    const amt = taxableIncome - 1000000;
    const t = amt * 0.3;
    tax += t;
    slabs.push({ label: "Above 10L (30%)", amount: amt, rate: 30, tax: t });
  }
  if (taxableIncome > 500000) {
    const amt = Math.min(taxableIncome, 1000000) - 500000;
    const t = amt * 0.2;
    tax += t;
    slabs.push({ label: "5L - 10L (20%)", amount: amt, rate: 20, tax: t });
  }
  if (taxableIncome > 250000) {
    const amt = Math.min(taxableIncome, 500000) - 250000;
    const t = amt * 0.05;
    tax += t;
    slabs.push({ label: "2.5L - 5L (5%)", amount: amt, rate: 5, tax: t });
  }

  // Rebate u/s 87A
  let rebate = 0;
  if (taxableIncome <= 500000) {
    rebate = tax;
    tax = 0;
  }

  const cess = tax * CESS_RATE;
  const totalTax = tax + cess;

  return {
    taxableIncome,
    baseTax: tax + rebate,
    rebate,
    cess,
    totalTax,
    slabs: slabs.reverse(),
  };
}

/**
 * Calculates tax under the New Regime (FY 2024-25 Budget Update)
 */
export function calculateNewRegimeTax(inputs: TaxInputs): TaxResult {
  const standardDeduction = 75000;
  // New regime allows very few deductions (Standard Deduction and NPS 80CCD(2) usually)
  // For simplicity, we only consider Standard Deduction here as per basic user profile
  const taxableIncome = Math.max(0, inputs.grossSalary - standardDeduction);
  let tax = 0;
  const slabs = [];

  // New Slabs (July 2024):
  // 0-3L: Nil
  // 3-7L: 5%
  // 7-10L: 10%
  // 10-12L: 15%
  // 12-15L: 20%
  // Above 15L: 30%

  if (taxableIncome > 1500000) {
    const amt = taxableIncome - 1500000;
    const t = amt * 0.3;
    tax += t;
    slabs.push({ label: "Above 15L (30%)", amount: amt, rate: 30, tax: t });
  }
  if (taxableIncome > 1200000) {
    const amt = Math.min(taxableIncome, 1500000) - 1200000;
    const t = amt * 0.2;
    tax += t;
    slabs.push({ label: "12L - 15L (20%)", amount: amt, rate: 20, tax: t });
  }
  if (taxableIncome > 1000000) {
    const amt = Math.min(taxableIncome, 1200000) - 1000000;
    const t = amt * 0.15;
    tax += t;
    slabs.push({ label: "10L - 12L (15%)", amount: amt, rate: 15, tax: t });
  }
  if (taxableIncome > 700000) {
    const amt = Math.min(taxableIncome, 1000000) - 700000;
    const t = amt * 0.1;
    tax += t;
    slabs.push({ label: "7L - 10L (10%)", amount: amt, rate: 10, tax: t });
  }
  if (taxableIncome > 300000) {
    const amt = Math.min(taxableIncome, 700000) - 300000;
    const t = amt * 0.05;
    tax += t;
    slabs.push({ label: "3L - 7L (5%)", amount: amt, rate: 5, tax: t });
  }

  // Rebate u/s 87A (New Regime: No tax up to 7L taxable income)
  let rebate = 0;
  if (taxableIncome <= 700000) {
    rebate = tax;
    tax = 0;
  }

  const cess = tax * CESS_RATE;
  const totalTax = tax + cess;

  return {
    taxableIncome,
    baseTax: tax + rebate,
    rebate,
    cess,
    totalTax,
    slabs: slabs.reverse(),
  };
}

export function compareRegimes(inputs: TaxInputs): ComparisonResult {
  const oldRegime = calculateOldRegimeTax(inputs);
  const newRegime = calculateNewRegimeTax(inputs);

  let recommendation: "OLD" | "NEW" | "EQUAL" = "EQUAL";
  if (oldRegime.totalTax < newRegime.totalTax) recommendation = "OLD";
  else if (newRegime.totalTax < oldRegime.totalTax) recommendation = "NEW";

  return {
    oldRegime,
    newRegime,
    recommendation,
    savings: Math.abs(oldRegime.totalTax - newRegime.totalTax),
  };
}
