import format from 'date-fns/format';

export const formatShortDateWithTime = (date: Date | number) => format(date, 'MMM d, yyyy H:mma');
