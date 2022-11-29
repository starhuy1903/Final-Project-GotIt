export type TableColumn = {
  id: string;
  name: string;
};

export type DataTable = {
  totalItems: number;
  items: Array<any>;
};

export type TableColumnType = {
  title: string;
  render: (row: any) => JSX.Element;
  width?: string;
};
