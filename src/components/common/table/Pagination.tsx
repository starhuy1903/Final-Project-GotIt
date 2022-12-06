import React from 'react';
import { Pagination as AhaPagination } from '@ahaui/react';
import usePagination, { DOTS } from 'hooks/usePagination';

type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  }) || [];

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage === lastPage) return;

    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  const lastPage = +paginationRange[paginationRange.length - 1];
  return (
    <AhaPagination className="u-textRight">
      <AhaPagination.Prev disabled={currentPage === 1} onClick={onPrevious} />
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <AhaPagination.Ellipsis key={pageNumber} />;
        }
        return (
          <AhaPagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => onPageChange(+pageNumber)}
          >
            {pageNumber}
          </AhaPagination.Item>
        );
      })}

      <AhaPagination.Next
        disabled={currentPage === lastPage}
        onClick={onNext}
      />
    </AhaPagination>
  );
};

export default Pagination;
