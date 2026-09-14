//ke currency
export function currencyFormat(number) {
  return Number(number).toLocaleString("en-ke", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

//discount calculator

//date
export const formatDate = (timestamp) => {
  if (!timestamp) return "";

  return new Date(timestamp).toLocaleDateString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (timestamp) => {
  if (!timestamp) return "";
  return date.toLocaleTimeString("en-KE", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
