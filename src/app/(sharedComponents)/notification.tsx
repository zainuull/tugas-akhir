'use client';
// Icons
import { IoMegaphoneSharp } from 'react-icons/io5';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { HiOutlineXMark } from 'react-icons/hi2';
import useOverlay from '../(pages)/(admin)/(dashboard)/store/store.notif';


const dataNotif = [
  {
    title: 'Credit',
    description: 'Your card is no longer active, please renew it',
    time: '10',
  },
  {
    title: 'Credit 2',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, non?',
    time: '15',
  },
  {
    title: 'Credit 3',
    description: 'Your card is no longer active, please renew it',
    time: '20',
  },
  {
    title: 'Credit',
    description: 'Your card is no longer active, please renew it',
    time: '10',
  },
  {
    title: 'Credit 2',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, non?',
    time: '15',
  },
  {
    title: 'Credit 3',
    description: 'Your card is no longer active, please renew it',
    time: '20',
  },
];

interface INotification {
  isNotif: boolean;
  setIsNotif: Function;
}

const Notification = (props: INotification) => {
  const { isNotif, setIsNotif } = props;
  const [isOverlay, setIsOverlay] = useOverlay();

  const handleClose = () => {
    setIsOverlay(!isOverlay);
    setIsNotif(!isNotif);
  };

  return (
    <div
      className={`absolute right-5 xl:right-52 ${
        isNotif ? 'top-2 xl:top-8' : '-top-96'
      } w-96 h-96 bg-slate-100 rounded-xl flex flex-col gap-y-4 items-start px-4 text-black hover:text-primary transition-all duration-500 shadow-md z-10 overflow-y-scroll pb-5`}>
      {/* Header */}
      <div className="w-full flex items-center justify-between mt-2">
        <h1 className="text-primary font-semibold">Notifications</h1>
        <FaRegCircleXmark onClick={handleClose} size={20} className="text-red-600 cursor-pointer" />
      </div>
      {/* Body */}
      {dataNotif.map((data: any, idx: number) => (
        <div
          key={idx}
          className="w-full min-h-20 bg-white rounded-lg shadow-md flex flex-col justify-center px-2 text-black cursor-pointer hover:shadow-lg transition-all relative">
          <span className="flex gap-x-2">
            <IoMegaphoneSharp size={18} />
            <span>
              <p className="text-xs font-semibold">
                {data.title.length > 10 ? `${data.title.slice(0, 10)}....` : data.title}
              </p>
              <p className="text-xs text-gray-700">
                {data.description.length > 50
                  ? `${data.description.slice(0, 50)}....`
                  : data.description}
              </p>
            </span>
          </span>
          <p className="text-[10px] w-full text-end text-gray-500">{data.time} minutes ago.</p>
          <HiOutlineXMark
            size={18}
            className="absolute top-1 right-2 text-red-600 hover:text-red-700 transition-all"
          />
        </div>
      ))}
    </div>
  );
};

export default Notification;
