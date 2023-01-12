import { useParams as useParamsRouter, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const useParams = (): Record<string, string | undefined> => {
  const pathParams = useParamsRouter();
  const [queryParams] = useSearchParams();

  return useMemo(
    () => ({ ...pathParams, ...Object.fromEntries(queryParams) }),
    [pathParams, queryParams]
  );
};
