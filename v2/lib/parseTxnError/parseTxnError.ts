export const parseTxnError = (error: any) => {
  if (error.reason) return error.reason;
  let errorMessage = error.data?.message ?? error.message;
  const isFrameWalletError = errorMessage?.includes('(error={');
  if (isFrameWalletError) {
    // Frame wallet throws a weird error, we try to parse the message and if it fails we just show the ugly full message
    errorMessage = errorMessage.match(/"message":"([^"]+)"/)?.[1] || errorMessage;
  }
  if (errorMessage) {
    return errorMessage;
  }

  return 'Unknown error';
};
