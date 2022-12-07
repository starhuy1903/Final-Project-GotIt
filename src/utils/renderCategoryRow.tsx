import { Icon } from '@ahaui/react';
import { Link } from 'react-router-dom';
import { Category } from 'types/category';
import { TableColumnType } from 'types/table';
import React from 'react';

// This is the table constant/settings which needed to render table elements
const categoryTableConstants = (
  handleUpdate: (item: Category) => void,
  handleDelete: (item: Category) => void,
): TableColumnType[] => [
  {
    title: 'ID',
    render: (rowData: Category) => <Link to={`${rowData.id}`}>{rowData.id}</Link>,
  },
  {
    title: 'Image',
    width: '10%',
    render: (rowData: Category) => (
      <img
        width="100%"
        height="auto"
        style={{ objectFit: 'cover' }}
        src={rowData.imageUrl}
        alt="image1"
      />
    ),
  },
  {
    title: 'Name',
    width: '30%',
    render: (rowData: Category) => <span>{rowData.name}</span>,
  },
  {
    title: 'Description',
    width: '40%',
    render: (rowData: Category) => <span>{rowData.description}</span>,
  },
  {
    title: 'Actions',
    width: '15%',
    render: (rowData: Category) => (
      <>
        <div
          className="u-inlineBlock u-paddingExtraSmall u-roundedCircle hover:u-backgroundLightest hover:u-textPrimary u-cursorPointer"
          onClick={() => handleUpdate(rowData)}
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
    ),
  },
];

export default categoryTableConstants;
