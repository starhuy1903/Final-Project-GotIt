import { Icon } from "@ahaui/react";
import { Link } from "react-router-dom";
import { Item, ItemPayload } from "types/item";
import { TableColumnType } from "types/table";

// This is the table constant/settings which needed to render table elements
export const itemTableConstants = (
  handleUpdate: (id: number, item: ItemPayload) => void,
  handleDelete: (item: ItemPayload) => void
): TableColumnType[] => {
  return [
    {
      title: "ID",
      render: (rowData: Item) => {
        return <Link to={`items/${rowData.id}`}>{rowData.id}</Link>;
      },
    },
    {
      title: "Image",
      width: "10%",
      render: (rowData: Item) => {
        return (
          <img
            width="100%"
            height="auto"
            style={{ objectFit: "cover" }}
            src={rowData.imageUrl}
            alt="image"
          />
        );
      },
    },
    {
      title: "Description",
      width: "40%",
      render: (rowData: Item) => {
        return <span>{rowData.description}</span>;
      },
    },
    {
      title: "Author",
      width: "10%",
      render: (rowData: Item) => {
        return <span>{rowData.author.name}</span>;
      },
    },
    {
      title: "Actions",
      width: "15%",
      render: (rowData: Item) => {
        return (
          <>
            <div
              className="u-inlineBlock u-paddingExtraSmall u-roundedCircle hover:u-backgroundLightest hover:u-textPrimary u-cursorPointer"
              onClick={() => {
                const { id, ...others } = rowData;
                handleUpdate(id, {description: others.description, imageUrl: others.imageUrl});
              }}
              onKeyPress={() => null}
              role="button"
              tabIndex={0}
              aria-label="Edit category"
            >
              <Icon size="small" name="edit" />
            </div>

            <div
              className="u-inlineBlock u-paddingExtraSmall u-roundedCircle hover:u-backgroundLightest hover:u-textPrimary u-cursorPointer"
              onClick={() => handleDelete(rowData)}
              onKeyPress={() => null}
              role="button"
              tabIndex={0}
              aria-label="Remove category"
            >
              <Icon size="small" name="trash" />
            </div>
          </>
        );
      },
    },
  ];
};
