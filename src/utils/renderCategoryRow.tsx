import { Icon } from "@ahaui/react";
import { Category, CategoryPayload } from "types/category";
import { TableColumnType } from "types/table";

// This is the table constant/settings which needed to render table elements
export const categoryTableConstants = (
  handleUpdate: (id: number, item: CategoryPayload) => void,
  handleDelete: (item: CategoryPayload) => void
): TableColumnType[] => {
  return [
    {
      title: "ID",
      render: (rowData: Category) => {
        return <span>{rowData.id}</span>;
      },
    },
    {
      title: "Image",
      width: "10%",
      render: (rowData: Category) => {
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
      title: "Name",
      width: "30%",
      render: (rowData: Category) => {
        return <span>{rowData.name}</span>;
      },
    },
    {
      title: "Description",
      width: "40%",
      render: (rowData: Category) => {
        return <span>{rowData.description}</span>;
      },
    },
    {
      title: "Actions",
      width: "15%",
      render: (rowData: Category) => {
        return (
          <>
            <div
              className="u-inlineBlock u-paddingExtraSmall u-roundedCircle hover:u-backgroundLightest hover:u-textPrimary u-cursorPointer"
              onClick={() => {
                const { id, ...others } = rowData;
                handleUpdate(id, others);
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
