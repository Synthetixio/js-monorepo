const useDateFormat = (day: string, period: 'W' | 'M' | 'Y') => {
  const date = new Date(day);
  let formattedDate = '';

  switch (period) {
    case 'W':
    case 'M':
      formattedDate = date.toLocaleString('en-EN', {
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      });
      break;
    case 'Y':
    default:
      formattedDate = date.toLocaleString('en-EN', {
        month: 'short',
        timeZone: 'UTC',
      });
      break;
  }

  return formattedDate;
};

export default useDateFormat;
