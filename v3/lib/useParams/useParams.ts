import { useParams as useParamsRouter, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export function searchParamsToObject(searchParams: URLSearchParams) {
  return Object.fromEntries(Array.from(searchParams));
}

export function sortObject(params: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(params).sort(([a], [b]) => a.localeCompare(b)));
}

export function cleanObject(params: Record<string, string | undefined>): Record<string, string> {
  const cleaned = Object.entries(params).filter(([, value]) => value !== undefined) as [
    [string, string]
  ];
  return Object.fromEntries(cleaned);
}

export const useParams = (): Record<string, string | undefined> => {
  const pathParams = useParamsRouter();
  const [queryParams] = useSearchParams();

  return useMemo(
    () => sortObject({ ...cleanObject(pathParams), ...searchParamsToObject(queryParams) }),
    [pathParams, queryParams]
  );
};
