'use client';
import ListTable from './ltable/list.table';
import { useEffect, useState } from 'react';
import CreateUser from './create/create';
// Icons
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { HandleError } from '@/core/services/handleError/handleError';
import { NotifyService } from '@/core/services/notify/notifyService';
import useOverlay from '../../../store/store.notif';
import VM from '@/core/services/vm/vm';

const ListParticipant = () => {
  const { getData, datas } = VM();
  const [isOverlay, setIsOverlay] = useOverlay();
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const notifyService = new NotifyService();
  const data = datas?.data || [];
  const [searchQuery, setSearchQuery] = useState<string>('');

  const result = data.filter((item) => item.isPaid);

  useEffect(() => {
    notifyService.showLoading();
    fetchData();
  }, []);

  const fetchData = async () => {
    await getData()
      .then(() => {
        notifyService.closeSwal();
      })
      .catch((err) => {
        HandleError(err);
      });
  };

  const handleAdd = () => {
    setIsOverlay(!isOverlay);
    setIsAdd(!isAdd);
  };

  // Filter data based on search query
  const filteredData = result.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="w-full min-h-40 bg-white flex flex-col rounded-lg ">
      <h1 className="pt-4 px-4">User Management</h1>
      {/* Dropdown */}
      <div className="w-full grid grid-cols-2 items-center gap-x-5 gap-y-2 px-4 text-sm mb-4">
        <button className={`button col-span-1 h-10 mt-4 text-white`} onClick={handleAdd}>
          Add User
        </button>
        <span className="col-span-1 h-full flex items-end">
          <div className="bg-gray-100 w-full flex items-center gap-x-2 rounded-lg px-2 h-10 file:">
            <HiMagnifyingGlass />
            <input
              className={`bg-transparent outline-none w-full text-sm`}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </span>
      </div>
      <ListTable data={result} fetchData={fetchData} filterData={filteredData} />
      {/* Add User */}
      <CreateUser
        isAdd={isAdd}
        setIsAdd={setIsAdd}
        isOverlay={isOverlay}
        setIsOverlay={setIsOverlay}
        fetchData={fetchData}
      />
    </div>
  );
};

export default ListParticipant;
