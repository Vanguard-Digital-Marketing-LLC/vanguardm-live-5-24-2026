import { useMutation } from '@tanstack/react-query';

export function useStripeCheckout() {
  return useMutation({
    mutationFn: async ({ customerId, priceId }: { customerId: string; priceId: string }) => {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId, priceId }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create checkout session');
      }
      return res.json();
    },
  });
}
