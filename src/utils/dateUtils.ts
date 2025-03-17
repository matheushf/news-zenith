
import { formatDistanceToNow, parseISO } from 'date-fns';

export const formatRelativeTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date unavailable';
  }
};

export const getDateRangeFromOption = (option: string): { start: Date | null, end: Date } => {
  const end = new Date();
  
  switch (option) {
    case 'today':
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return { start: today, end };
    
    case 'week':
      const week = new Date();
      week.setDate(week.getDate() - 7);
      return { start: week, end };
    
    case 'month':
      const month = new Date();
      month.setMonth(month.getMonth() - 1);
      return { start: month, end };
    
    case 'custom':
      return { start: null, end };
    
    default:
      return { start: null, end };
  }
};
