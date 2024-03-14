import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <div className="w-full h-screen bg-secondary flex flex-col gap-y-6 items-center justify-center">
        <div className="text-center">
          <h1 className="font-semibold text-lg">Halaman tidak ada</h1>
        </div>
        <Link href={'/'} id="input-data" className="px-8 py-2 bg-primary text-white rounded-lg">
          Kembali ke Halaman Utama
        </Link>
      </div>
    </>
  );
};

export default NotFound;
