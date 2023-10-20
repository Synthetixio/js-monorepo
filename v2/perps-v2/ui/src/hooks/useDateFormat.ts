const useDateFormat = (day: string, period: 'W' | 'M' | 'Y') => {
  const [date, time] = day.split(' ');
  const maybeDate = new Date(`${date}T${time}Z`);

  if (`${maybeDate}` === 'Invalid Date') {
    return '';
  }

  let formattedDate = '';

  switch (period) {
    case 'W':
    case 'M':
      formattedDate = maybeDate.toLocaleString('en-EN', {
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      });
      break;
    case 'Y':
    default:
      formattedDate = maybeDate.toLocaleString('en-EN', {
        month: 'short',
        timeZone: 'UTC',
      });
      break;
  }

  return formattedDate;
};

export default useDateFormat;
