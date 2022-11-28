import { Icon } from "@ahaui/react";
import React from "react";
import { Link } from "react-router-dom";

type CategoryType = {
  description: string;
  id: number;
  imageUrl: string;
  name: string;
};

type TableProps = {
  list: Array<CategoryType> | undefined;
  handleEdit: (arg: number) => void;
  handleDelete: (arg: number) => void;
};

const Table: React.FC<TableProps> = ({ list, handleEdit, handleDelete }) => {
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
                <th>Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list &&
                list.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td width="10%">
                      <img
                        width="100%"
                        height="auto"
                        style={{ objectFit: "cover" }}
                        src={category.imageUrl}
                        alt=""
                      />
                    </td>
                    <td width="30%">
                      <Link to={`/categories/${category.id}`}>
                        {category.name}
                      </Link>
                    </td>
                    <td width="40%">{category.description}</td>

                    <td width="15%">
                      <div
                        className="u-inlineBlock u-paddingExtraSmall u-roundedCircle hover:u-backgroundLightest hover:u-textPrimary u-cursorPointer"
                        onClick={() => handleEdit(category.id)}
                        onKeyPress={() => null}
                        role="button"
                        tabIndex={0}
                        aria-label="Edit category"
                      >
                        <Icon size="small" name="edit" />
                      </div>

                      <div
                        className="u-inlineBlock u-paddingExtraSmall u-roundedCircle hover:u-backgroundLightest hover:u-textPrimary u-cursorPointer"
                        onClick={() => handleDelete(category.id)}
                        onKeyPress={() => null}
                        role="button"
                        tabIndex={0}
                        aria-label="Remove category"
                      >
                        <Icon size="small" name="trash" />
                      </div>
                    </td>
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
