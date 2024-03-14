'use client';
import useUser from '@/core/services/store/store.user';
import RequestNewCards from './(presentation)/(components)/request.new.cards';

const NewCards = () => {
  const [user] = useUser();
  const role = user.data?.privilege?.general_role || '';

  return (
    <main className="w-full flex flex-col xl:flex-row items-start gap-x-4 gap-y-4">
      {/* Left */}
      <RequestNewCards role={role} />
    </main>
  );
};

export default NewCards;
