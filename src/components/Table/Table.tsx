import React from 'react';

interface Column {
  key: string;
  title: string;
}

interface RowData {
  [key: string]: string | number;
}

interface TableProps {
  columns: Column[];
  data: RowData[];
}

const Table: React.FC<TableProps> = ({ columns, data }): JSX.Element => {
  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
