import { format } from 'date-fns';

export function formatted(date: Date) {
  return format(date, 'MMMM dd, yyyy');
}
