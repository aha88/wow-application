import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { CBadge, CButton } from '@coreui/react';
import Swal from 'sweetalert2';

const MyDataTable = ({ data, onDelete, onView }) => {
  // Memoize the columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      {
        Header: 'Status',
        Cell: ({ row }) => {
          const { status } = row.original; // Access status object
          if (!status) return null; // Handle missing status

          // Map status ID to a badge
          const statusMapping = {
            1: { color: 'success', text: 'Approved' },
            2: { color: 'warning', text: 'Pending' },
            3: { color: 'danger', text: 'Rejected' },
          };

          const { color, text } = statusMapping[status.id] || {};
          return color ? <CBadge color={color}>{text}</CBadge> : null;
        },
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <CButton className="mr-2" color="secondary" onClick={() => onView(row.original)}>
              View
            </CButton>
            <CButton className="mr-2" color="danger" onClick={() => confirmDelete(row.original)}>
              Delete
            </CButton>
          </div>
        ),
      },
    ],
    [onView, onDelete]
  );

  // Confirm delete action
  const confirmDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(item);
      }
    });
  };

  // Handle delete action
  const handleDelete = async (item) => {
    try {
      // Simulate delete operation (replace with actual API call if needed)
      console.log('Deleting item:', item);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item deleted successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      onDelete(item); // Notify parent component
    } catch (error) {
      console.error('Error during delete operation:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  // Use react-table hooks
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  return (
    <table {...getTableProps()} className="table table-striped table-hover">
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={index}>
              {row.cells.map((cell, index) => (
                <td {...cell.getCellProps()} key={index}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MyDataTable;
