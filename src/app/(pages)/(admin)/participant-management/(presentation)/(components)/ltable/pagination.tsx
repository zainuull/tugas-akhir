const Pagination = ({
  pageNow,
  totalPage,
  setPage,
}: {
  pageNow: number;
  totalPage: number;
  setPage: Function;
}) => {
  //to change current page
  function changeCurrentPage(id: number) {
    setPage(id);
  }

  return (
    <div className="flex gap-x-2 items-center">
      <div className="flex items-center gap-x-2">
        {Array.from({ length: totalPage }, (_, index) => (
          <span
            onClick={() => changeCurrentPage(index)}
            key={index + 1}
            className={`px-3 py-1 cursor-pointer rounded-lg text-sm ${
              index === pageNow
                ? 'bg-primary text-white'
                : 'bg-tertiary text-gray-600 hover:text-black'
            }`}>
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
