import React from 'react';
import { TableColumnType } from 'types/table';

type TableProps = {
  list?: Array<any>;
  cols: TableColumnType[];
};

const Table: React.FC<TableProps> = ({ list, cols }) => {
  if (!list?.length) return <div>No data</div>;

  return (
    <div>
      <table
        width="100%"
        className="Table Table--stickyHeader Table--bordered  u-backgroundWhite u-textDark u-text200"
        data-test-id="data-table"
      >
        <thead>
          <tr>
            {cols.map((headerItem) => (
              <th key={headerItem.title}>{headerItem.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              {cols.map((col) => (
                <td width={col.width} key={`${item.id} ${col.title}`}>{col.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
