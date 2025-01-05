import React from 'react';
import DataTable from 'react-data-table-component';
import { CBadge, CButton } from '@coreui/react';
import Swal from 'sweetalert2';

const MyDataTable = ({ data, onDelete, onView }) => {
  
  // Define columns
  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true, width: '100px' },
    { name: 'Name', selector: row => row.name, sortable: true, wrap: true },
    { name: 'Email', selector: row => row.email, sortable: true, wrap: true },
    {
      name: 'Status',
      selector: row => row.status?.id,
      cell: row => {
        if (!row.status) return null;

        const statusMapping = {
          1: { color: 'success', text: 'Approved' },
          2: { color: 'warning', text: 'Pending' },
          3: { color: 'danger', text: 'Rejected' },
        };

        const { color, text } = statusMapping[row.status.id] || {};
        return color ? <CBadge color={color}>{text}</CBadge> : null;
      },
      sortable: true,
      width: '150px',
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex justify-content-end">
        <CButton className="mr-2" color="secondary" size="sm" onClick={() => onView(row)}>
          View
        </CButton>
        {onDelete && (
          <CButton className="mr-2" color="danger" size="sm" onClick={() => confirmDelete(row)}>
            Delete
          </CButton>
        )}
      </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '180px',
    },
  ];

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
      console.log('Deleting item:', item);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item deleted successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      onDelete(item);
    } catch (error) {
      console.error('Error during delete operation:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        responsive
        fixedHeader
        customStyles={{
          tableWrapper: {
            style: {
              overflowX: 'auto',
            },
          },
          pagination: {
            style: {
              color: 'gray', 
            },
          },
          paginationStyle: {
            select: {
              style: {
                color: 'gray',  
              },
            },
          },
        }}
        fixedHeaderScrollHeight="400px"
      />
  );
};

export default MyDataTable;
