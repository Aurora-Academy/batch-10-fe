import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";

import { usePagination, DOTS } from "../hooks/usePagination";

const Paginate = ({
  dispatch,
  currentPage,
  limit,
  total,
  setLimit,
  setPage,
}) => {
  let active = currentPage;
  const items = [];

  const totalNumberOfPages = Math.ceil(total / limit);

  for (let number = 1; number <= totalNumberOfPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => setPage(number)}
        active={active === number}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    siblingCount: 1,
    pageSize: limit,
  });

  if (currentPage === 0 || total === 0) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.First
          onClick={() => dispatch(setPage(1))}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
        />

        {paginationRange &&
          paginationRange.map((number, index) => {
            if (number === DOTS) {
              return <Pagination.Ellipsis key={`${index}-${number}`} />;
            }
            return (
              <Pagination.Item
                key={number}
                onClick={() => dispatch(setPage(number))}
                active={currentPage === number}
              >
                {number}
              </Pagination.Item>
            );
          })}

        <Pagination.Next
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage === totalNumberOfPages}
        />
        <Pagination.Last
          onClick={() => dispatch(setPage(totalNumberOfPages))}
          disabled={currentPage === totalNumberOfPages}
        />
      </Pagination>

      <div className="col-auto">
        <select
          value={limit}
          className="form-select"
          onChange={(e) => dispatch(setLimit(e.target.value))}
        >
          <option value={4}>4</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

Paginate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  total: PropTypes.number,
  setLimit: PropTypes.func,
  setPage: PropTypes.func,
};

export default Paginate;
