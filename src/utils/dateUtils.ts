
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
  const date = new Date();
  const end = new Date();
  
  switch (option) {
    case 'today':
      date.setHours(0, 0, 0, 0);
      return { start: date, end };
    
    case 'week':
      date.setDate(date.getDate() - 7);
      return { start: date, end };
    
    case 'month':
      date.setMonth(date.getMonth() - 1);
      return { start: date, end };
    
    case 'custom':
      return { start: null, end };
    
    default:
      return { start: null, end };
  }
};
