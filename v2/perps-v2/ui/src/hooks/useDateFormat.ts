const useDateFormat = (day: string, period: 'W' | 'M' | 'Y') => {
  const isoFormattedDay = day.split(' ')[0] + 'T' + day.split(' ')[1].split('.')[0] + 'Z';
  const date = new Date(isoFormattedDay);

  // Check if date is invalid and log the original string if it is
  if (isNaN(date.getTime())) {
    console.error('Invalid date derived from string: ', day);
    return '';
  }

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
