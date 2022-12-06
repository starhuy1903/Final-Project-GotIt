import React, { useEffect, useState } from 'react';
import { Loader } from '@ahaui/react';
import classNames from 'classnames';
import { DataTable, TableColumnType } from 'types/table';
import Pagination from './Pagination';
import Table from './Table';

type PaginationTableProps = {
  data: DataTable | undefined;
  tableName: string;
  cols: TableColumnType[];
  fetchData: (offset: number) => void;
  pageSize: number;
  CreateButton: React.ReactNode;
};

const PaginationTable: React.FC<PaginationTableProps> = ({
  data,
  tableName,
  cols,
  fetchData,
  pageSize,
  CreateButton,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchData = async () => {
    setIsLoading(true);
    await fetchData((currentPage - 1) * pageSize);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchData();
  }, [currentPage]);

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
                totalCount={200 || 0}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
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
