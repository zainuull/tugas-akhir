import ListAdmin from './(presentation)/(components)/admin';

const AdminManagement = () => {
  return (
    <main className="w-full flex flex-col xl:flex-row items-start gap-x-4 gap-y-4">
      {/* Right */}
      <div className="w-full grid grid-cols-1 gap-2">
        <ListAdmin />
      </div>
    </main>
  );
};

export default AdminManagement;
