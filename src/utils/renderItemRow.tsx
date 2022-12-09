import { Icon } from '@ahaui/react';
import { Link } from 'react-router-dom';
import { Item } from 'types/item';
import { TableColumnType } from 'types/table';
import React from 'react';

const centerCell = {
  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'
};

// This is the table constant/settings which needed to render table elements
const itemTableConstants = (
  handleUpdate: (item: Item) => void,
  handleDelete: (item: Item) => void,
): TableColumnType[] => [
  {
    title: 'ID',
    width: '5%',
    render: (rowData: Item) => <Link style={centerCell} to={`items/${rowData.id}`}>{rowData.id}</Link>,
  },
  {
    title: 'Image',
    width: '8%',
    render: (rowData: Item) => (
      <img
        width="50px"
        height="50px"
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
