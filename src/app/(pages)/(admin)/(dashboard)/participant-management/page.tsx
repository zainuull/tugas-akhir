import ListParticipant from './(presentation)/(components)/participant';

const ParticipantManagement = () => {
  return (
    <main className="w-full flex flex-col xl:flex-row items-start gap-x-4 gap-y-4">
      {/* Right */}
      <div className="w-full grid grid-cols-1 gap-2">
        <ListParticipant />
      </div>
    </main>
  );
};

export default ParticipantManagement;
