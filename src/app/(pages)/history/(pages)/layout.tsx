import Header from '../header';

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-white grid grid-cols-1 pt-4 rounded-lg">
      <Header />
      {children}
    </main>
  );
}
