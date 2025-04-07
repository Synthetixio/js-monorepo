import { useQuery } from '@tanstack/react-query';

export async function fetchMigrationData({ walletAddress }: { walletAddress: string }) {
  const response = await fetch(
    'https://yn4f3hixhj.execute-api.us-east-1.amazonaws.com/prod/migration',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress,
      }),
    }
  );
  return response.json();
}

export function useMigrationData({ walletAddress }: { walletAddress?: string }) {
  return useQuery({
    queryKey: ['useMigrationData', { walletAddress }],
    enabled: Boolean(walletAddress),
    queryFn: async () => {
      if (!walletAddress) {
        throw new Error('OMFG');
      }
      const migrationData = await fetchMigrationData({ walletAddress });
      return migrationData;
    },
    staleTime: 600_000,
  });
}
