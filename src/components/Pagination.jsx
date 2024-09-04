import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

import { useState } from "react";

function Pagination({ children, itemsPerPage = 3 }) {
  const [page, setPage] = useState(1);

  const maxPages = Math.ceil(children.length / itemsPerPage);

  const increasePage = () => {
    if (page >= maxPages) {
      return;
    }
    setPage((prevState) => prevState + 1);
  };

  const decreasePage = () => {
    if (page <= 1) {
      return;
    }

    setPage((prevState) => prevState - 1);
  };

  if (children.length <= itemsPerPage) return <>{children}</>;

  return (
    <>
      {children.filter((_, index) => {
        return (
          index < itemsPerPage * page && index >= itemsPerPage * (page - 1)
        );
      })}
      <div className="pagination--btns">
        <button onClick={decreasePage}>
          <FaLongArrowAltLeft />
        </button>
        <p>{page}</p>
        <button onClick={increasePage}>
          <FaLongArrowAltRight />
        </button>
      </div>
    </>
  );
}

export default Pagination;
