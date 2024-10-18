// app/page.tsx
import Transactions from '@/components/transactions';

async function getTransactions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function TransactionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow p-8 gap-8">
        <Transactions initialData={await getTransactions()} />
      </main>
    </div>
  );
}
