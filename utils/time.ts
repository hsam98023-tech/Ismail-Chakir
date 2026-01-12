export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const calculateTimeLeft = (targetMonth: number, targetDay: number): TimeLeft => {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Note: Month is 0-indexed in JS Date (0 = Jan, 1 = Feb, etc.)
  // targetMonth should be passed as 0-indexed (e.g. 1 for February)
  let targetDate = new Date(currentYear, targetMonth, targetDay);

  // If the date has passed this year, set to next year
  if (now.getTime() > targetDate.getTime()) {
    targetDate = new Date(currentYear + 1, targetMonth, targetDay);
  }

  const difference = targetDate.getTime() - now.getTime();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};