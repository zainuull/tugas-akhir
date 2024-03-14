'use client';
import useUser from '@/core/services/store/store.user';
import DetailOrder from './(presentation)/(components)/order/order';
import Submit from './(presentation)/(components)/submit/submit';

const DetailNewCards = ({ params }: { params: { id: number } }) => {
  const [user] = useUser();
  const role = user.data?.privilege?.general_role;

  return (
    <main className="w-full grid grid-cols-1 xl:grid-cols-5 gap-4">
      <div className="flex flex-col w-full gap-y-3 col-span-2">
        {/* Detail Order */}
        <DetailOrder />
        {role === 'admin' && <Submit />}
      </div>
    </main>
  );
};

export default DetailNewCards;
