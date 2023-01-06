import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export type TransactionStatus = 'upcoming' | 'current' | 'completed' | 'error';

export const TransactionSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  call: z.function().args(z.any()).returns(z.any()),
  checkboxLabel: z.string(),
  checked: z.boolean(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export const TransactionStateSchema = z.object({
  transactions: z.array(TransactionSchema),
  isOpen: z.boolean(),
  onSuccess: z.function(),
});
export type TransactionState = z.infer<typeof TransactionStateSchema>;

export function useTransactionState() {
  return useQuery({
    queryKey: ['transaction'],
    queryFn: () => {
      return {
        transactions: [],
        isOpen: false,
        onSuccess: () => null,
      };
    },
  });
}

export function useSetTransactionState() {
  const queryClient = useQueryClient();
  return useCallback(
    ({ transactions, isOpen, onSuccess }: TransactionState) => {
      queryClient.setQueryData(['transaction'], { transactions, isOpen, onSuccess });
    },
    [queryClient]
  );
}

export function useClearTransactionState() {
  const queryClient = useQueryClient();
  return useCallback(() => queryClient.refetchQueries(['transaction']), [queryClient]);
}
