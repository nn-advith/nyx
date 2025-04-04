export const taskStatusCode = (deadline) => {
  // 3 states, today, overdue, 2 or less days
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const dline = new Date(deadline);
  dline.setHours(0, 0, 0, 0);
  const diff = dline - date;
  const days = Math.round(diff / (1000 * 60 * 60 * 24));
  return days;
};
