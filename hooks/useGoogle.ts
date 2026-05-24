import { useQuery } from '@tanstack/react-query';

export function useGoogleAnalytics(viewId: string, startDate: string, endDate: string) {
  return useQuery({
    queryKey: ['analytics', viewId, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams({ viewId, startDate, endDate });
      const res = await fetch(`/api/google/analytics?${params.toString()}`);
      if (!res.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      return res.json();
    },
    enabled: !!viewId && !!startDate && !!endDate,
  });
}
