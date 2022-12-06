import { Icon } from '@ahaui/react';
import { Link } from 'react-router-dom';
import { Item } from 'types/item';
import { TableColumnType } from 'types/table';
import React from 'react';

// This is the table constant/settings which needed to render table elements
const itemTableConstants = (
  handleUpdate: (item: Item) => void,
  handleDelete: (item: Item) => void,
): TableColumnType[] => [
  {
    title: 'ID',
    render: (rowData: Item) => <Link to={`items/${rowData.id}`}>{rowData.id}</Link>,
  },
  {
    title: 'Image',
    width: '10%',
    render: (rowData: Item) => (
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
    title: 'Description',
    width: '40%',
    render: (rowData: Item) => <span>{rowData.description}</span>,
  },
  {
    title: 'Author',
    width: '10%',
    render: (rowData: Item) => <span>{rowData.author.name}</span>,
  },
  {
    title: 'Actions',
    width: '15%',
    render: (rowData: Item) => (
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

export default itemTableConstants;
