export const taskStatusCode = (deadline) => {
  // 3 states, today, overdue, 2 or less days
  const date = new Date();
  const dline = new Date(deadline);

  const diff = dline - date;
  const days = Math.round(diff / (1000 * 60 * 60 * 24)) + 1;
  return days;
};
