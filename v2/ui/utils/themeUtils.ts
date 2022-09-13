export function singleColor(status: string): string {
  switch (status) {
    case 'error':
      return 'red.500';
    case 'info':
      return 'cyan.500';
    case 'success':
      return 'green.500';
    case 'warning':
      return 'orange.500';

    // Return info by default
    default:
      return 'cyan.500';
  }
}

interface ColorConfig {
  borderColor: string;
  backgroundColor: string;
}

export function multipleColor(status: string): ColorConfig {
  switch (status) {
    case 'error':
      return { borderColor: 'red.500', backgroundColor: 'red.900' };
    case 'info':
      return { borderColor: 'cyan.500', backgroundColor: 'blue.800' };
    case 'success':
      return { borderColor: 'green.400', backgroundColor: 'green.900' };
    case 'warning':
      return { borderColor: 'orange.400', backgroundColor: 'orange.900' };

    // Return info by default
    default:
      return { borderColor: 'cyan.500', backgroundColor: 'blue.800' };
  }
}
