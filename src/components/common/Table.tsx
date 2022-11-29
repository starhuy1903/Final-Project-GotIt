
import React from "react";
import { TableColumnType } from "types/table";

type TableProps = {
  list: Array<any> | undefined;
  cols: TableColumnType[];
};

const Table: React.FC<TableProps> = ({ list, cols }) => {
  return (
    <>
      {list && list.length > 0 && (
        <div>
          <table
            width="100%"
            className="Table Table--stickyHeader Table--bordered  u-backgroundWhite u-textDark u-text200"
          >
            <thead>
              <tr>
                {cols.map((headerItem, index) => (
                  <th key={index}>{headerItem.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index}>
                  {cols.map((col, key) => (
                    <td width={col.width} key={key}>{col.render(item)}</td>
                  ))}
                </tr>
              ))}          
            </tbody>
          </table>
        </div>
      )}

      {((list && list.length === 0) || !list) && <div>No data</div>}
    </>
  );
};

export default Table;
