import React, { useEffect, useState } from 'react';
import { Loader } from '@ahaui/react';
import classNames from 'classnames';
import { DataTable, TableColumnType } from 'types/table';
import Pagination from './Pagination';
import Table from './Table';

type PaginationTableProps = {
  data?: DataTable;
  tableName: string;
  cols: TableColumnType[];
  fetchData: (page: number) => void;
  pageSize: number;
  page: number;
  setPage: (page: number) => void;
  CreateButton: React.ReactNode;
};

const PaginationTable: React.FC<PaginationTableProps> = ({
  data,
  tableName,
  cols,
  fetchData,
  pageSize,
  page,
  setPage,
  CreateButton,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchData = async () => {
    setIsLoading(true);
    await fetchData(page);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchData();
  }, [page]);

  return (
    <div>
      <div
        className={classNames(
          'u-shadowMedium u-backgroundWhite u-roundedMedium',
        )}
      >
        <header className="u-flex u-justifyContentBetween u-alignItemsCenter u-backgroundLightest u-paddingHorizontalMedium u-paddingVerticalTiny u-textPrimaryDarker">
          <h1 className="u-text800 u-fontBold">{tableName}</h1>
          <div>{CreateButton}</div>
        </header>

        <div className="u-paddingHorizontalMedium u-paddingVerticalSmall">
          {!isLoading && (
            <>
              {/* Table section  */}
              <Table cols={cols} list={data?.items} />

              {/* Pagination section */}
              <Pagination
                totalCount={data?.totalItems || 0}
                currentPage={page}
                onPageChange={setPage}
                pageSize={pageSize}
              />
            </>
          )}

          {isLoading && (
            <div id="loader">
              <Loader size="medium" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginationTable;
