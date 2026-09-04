//ke currency
export function currencyFormat(number) {
  return Number(number).toLocaleString("en-ke", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

//discount calculator
