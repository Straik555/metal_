import React from 'react';

const LoaderTable = ({ colSpan }) => {
  return (
    <tbody>
      <tr className="table_row with_spiner">
        <th colSpan={colSpan} style={{ textAlign: 'center' }}>
          <div className="table-loader">
            <div className="loader" />
          </div>
        </th>
      </tr>
    </tbody>
  );
};

export default LoaderTable;
