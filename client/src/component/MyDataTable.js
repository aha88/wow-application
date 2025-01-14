import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { CBadge, CButton, CInputGroup, CFormInput } from '@coreui/react';

import Swal from 'sweetalert2';

const MyDataTable = ({ data, columns, onDelete, onView, searchTxt = false }) => {
    const [searchTerm, setSearchTerm] = useState(""); // State for search input

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
                onDelete(item);
                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
            }
        });
    };

    // Filter data based on search term
    const filteredData = data.filter(item => {
        return Object.values(item).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Modify first column to be smaller
    const modifiedColumns = columns.map((col, index) => ({
        ...col,
        width: index === 0 ? "80px" : "",
    }));

    // Add actions column dynamically
    const finalColumns = [
        ...modifiedColumns,
        {
            name: 'Actions',
            selector: row => row.id,
            right: true,
            style: { textAlign: "right", width: "150px" },
            cell: row => (
                <div className="d-flex justify-content-end text-right">
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
        },
    ];

    return (
        <div>
            {/* Search Bar */}
            {searchTxt ?
            <CInputGroup className="mb-3">
                <CFormInput
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </CInputGroup>
            : null}

            {/* Data Table */}
            <DataTable
                columns={finalColumns}
                data={filteredData}  // Show only filtered data
                pagination
                highlightOnHover
                striped
                fixedHeader
                responsive
                className='myTable'
                fixedHeaderScrollHeight="400px"
            />
        </div>
    );
};

export default MyDataTable;
