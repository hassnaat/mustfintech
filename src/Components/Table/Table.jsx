import React, { useState } from "react";
import "./Table.css";
import PaginationFirst from "../../assets/icons/pagination-first.svg";
import PaginationLast from "../../assets/icons/pagination-last.svg";
import PaginationNext from "../../assets/icons/pagination-next.svg";
import PaginationPrev from "../../assets/icons/pagination-prev.svg";
const Table = ({
  data,
  columns,
  headerHeight = 60,
  rowHeight = 44,
  striped = false,
  itemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  let startPage = Math.max(1, currentPage - 5);
  let endPage = Math.min(startPage + 9, totalPages);

  if (endPage - startPage < 9) {
    startPage = Math.max(1, endPage - 9);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const renderCellContent = (item, column, index) => {
    if (typeof column.render === "function") {
      return column.render(item, index);
    }
    return item[column.dataKey];
  };

  return (
    <div className="custom__table_wrap">
      <table className="custom__table">
        <thead
          style={{ height: `${headerHeight}px` }}
          className="custom__table_header"
        >
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  maxWidth: column.width || "fit-content",
                  width: column.width || "100px",
                  minWidth: column.width || "100px",
                  borderLeft: index === 0 ? "none" : "2px solid white",
                }}
              >
                <div>{column.title}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="custom__table_body">
          {currentItems?.length > 0 &&
            currentItems.map((item, index) => (
              <tr
                key={index}
                className="custom__table_bdrow"
                style={{
                  height: `${rowHeight}px`,
                  backgroundColor:
                    striped && index % 2 !== 0 ? "#F9F9FB" : "white",
                }}
              >
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>
                    <div>{renderCellContent(item, column, index)}</div>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {currentItems?.length < 1 && (
        <div className="custom__table_emptybody">
          <p>조회 결과가 없습니다.</p>
        </div>
      )}
      {/* Pagination */}
      {currentItems?.length > 0 && (
        <div className="custom__table_paginationwrap">
          <div className="custom__table_pagination">
            <button disabled={isFirstPage} onClick={goToFirstPage}>
              <img src={PaginationFirst} alt="" />
            </button>
            <button disabled={isFirstPage} onClick={goToPreviousPage}>
              <img src={PaginationPrev} alt="" />
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                style={{ marginRight: "5px" }}
                className={`${
                  currentPage === pageNumber ? "custom__table_pgactiveitem" : ""
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button disabled={isLastPage} onClick={goToNextPage}>
              <img src={PaginationNext} alt="" />
            </button>
            <button disabled={isLastPage} onClick={goToLastPage}>
              <img src={PaginationLast} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
