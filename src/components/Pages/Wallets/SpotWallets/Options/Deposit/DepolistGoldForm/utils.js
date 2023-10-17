import { comissionCalculator } from '../../../../../../../services/helpers';

export const payPalSystem = 'PayPal';
export const payonerSystem = 'Payoner';

export const amountToBeCreditedCalc = (fee, amountString) => {
  const amount = Number(amountString);

  if (!Number.isFinite(fee) || !Number.isFinite(amount)) return amountString; // At first render fee can be undefined.

  const comission = comissionCalculator(fee, amount);

  return amount - comission;
};
