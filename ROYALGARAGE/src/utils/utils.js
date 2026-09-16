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
  const date = new Date();
  const time = date - new Date(timestamp);
  const totalMinutes = Math.floor(time / 1000 / 60);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }

  return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
};
