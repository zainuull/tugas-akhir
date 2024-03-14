'use client';
import Credit from './(pages)/credit/page';
import Header from './header';

const History = () => {
  return (
    <main className="bg-white grid grid-cols-1 pt-4 rounded-lg">
      <Header />
      <Credit />;
    </main>
  );
};

export default History;
