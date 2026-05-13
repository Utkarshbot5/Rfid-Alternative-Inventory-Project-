import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';


const columns = [
    { id: 'number', label: 'No', minWidth: 50 },
    { id: 'time', label: 'Time', minWidth: 150 },
    { id: 'transactionId', label: 'Transaction ID', minWidth: 150 },
    { id: 'stockID', label: 'Stock ID', minWidth: 150 },
    { id: 'releaseQuantity', label: 'Release Quantity', minWidth: 100 },
    { id: 'releasePrice', label: 'Releasing Price(per unit)', minWidth: 150 },
    { id: 'actions', label: 'Actions', minWidth: 200 },
];

const API_BASE_URL = 'http://localhost:8080/api/releases';

function ViewRelease() {
    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [editIndex, setEditIndex] = React.useState(null);
    const [confirmDelete, setConfirmDelete] = React.useState({ open: false, index: null });
    const [zeroProductDialogOpen, setZeroProductDialogOpen] = React.useState(false);
 


    React.useEffect(() => {
        axios.get(API_BASE_URL)
            .then(response => {
                const products = response.data.map((product, index) => ({
                    number: index + 1, // Serial number
                    transactionId: product.transactionId, // Mapped from productId
                    stockId: product.rfid, // Mapped from productId
                    releaseQuantity: product.releaseQuantity, // Mapped from quantity
                    releasePrice: product.releasePrice, // Mapped from stockPrice
                    time: product.timestamp,
                }));
                console.log(products); // Debugging
                setRows(products); // Update state with mapped data
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toISOString().split("T")[0]; // Get YYYY-MM-DD
        const formattedTime = date.toTimeString().split(" ")[0]; // Get HH:MM:SS
        return `${formattedDate} ${formattedTime}`;
    };

    const handleRowChange = (index, field, value) => {
        const updatedRows = rows.map((row, i) =>
            i === index ? { ...row, [field]: value } : row
        );
        setRows(updatedRows);
    };

    const handleDeleteRow = () => {
        const productId = rows[confirmDelete.index].transactionId;
        console.log('Deleting product with ID:', productId);
        axios.delete(`${API_BASE_URL}/${productId}`)
            .then(() => {
                const updatedRows = rows
                    .filter((_, i) => i !== confirmDelete.index)
                    .map((row, i) => ({ ...row, number: i + 1 }));
                setRows(updatedRows);
                setConfirmDelete({ open: false, index: null });
            })
            .catch(error => {
                console.error('There was an error deleting the product!', error);
            });
    };

    const handleEdit = (index) => {
        if (rows[index].productName == 0) {
            setZeroProductDialogOpen(true); // Open the popup
            return;
        }
        console.log(rows[index].productName);
        setEditIndex(index); // Proceed with edit
    };

    const closeZeroProductDialog = () => {
        setZeroProductDialogOpen(false);
    };


    const handleCancelEdit = () => {
        setEditIndex(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openConfirmDelete = (index) => {
        setConfirmDelete({ open: true, index });
    };

    const closeConfirmDelete = () => {
        setConfirmDelete({ open: false, index: null });
    };

    const fetchProducts = async (transactionId) => {
        try {
            console.log('Fetching product with ID:', transactionId);
            const response = await axios.get(`${API_BASE_URL}/${transactionId}`); // Fetch only the data for the given rfid1
            const updatedProduct = {
                number: rows.findIndex((row) => row.stockId === transactionId) + 1, // Serial number (existing index + 1)
                stockId: response.data.rfid, // Mapped from productId
                transactionId: response.data.transactionId, // Mapped from productId

                releaseQuantity: response.data.releaseQuantity, // Mapped from quantity
                releasePrice: response.data.releasePrice, // Mapped from stockPrice
                time: response.data.timestamp,
            };
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.stockId === transactionId ? updatedProduct : row // Replace only the matching row
                )
            );
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSave = () => {
        const updatedProduct = rows[editIndex];
        console.log('Updated Product:', updatedProduct);
        console.log('Updated Product ID:', updatedProduct.transactionId);
        axios.put(`${API_BASE_URL}/${updatedProduct.transactionId}`, updatedProduct)
            .then(() => {
                //console.log('Product updated successfully:', updatedProduct);
                
                alert('Product updated successfully!');
                //setDialogOpen(true);
                //setDialogOpen(false);
                console.log('Product updated successfully:', updatedProduct);
                console.log('Product updated successfully:', updatedProduct.transactionId);
                fetchProducts(updatedProduct.transactionId);
                setEditIndex(null); // Exit edit mode
                

            })
            .catch(error => {
                console.error('There was an error updating the product!', error);
            });
        
            

    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <div style={{ padding: '16px' }}>
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    gutterBottom
                    sx={{
                        fontSize: '2.0rem',
                        fontWeight: 'bold',
                        color: '#1976d2',
                    }}
                >
                    View Release Stock
                </Typography>
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.number}</TableCell>
                                    <TableCell>{formatTimestamp(row.time)}</TableCell>
                                    <TableCell>{row.transactionId}</TableCell>
                                    <TableCell>{row.stockId}</TableCell>
                                    

                                    <TableCell>
                                        {editIndex === index ? (
                                            <TextField
                                                type="number"
                                                value={row.releaseQuantity}
                                                onChange={(e) => handleRowChange(index, 'releaseQuantity', e.target.value)}
                                                fullWidth
                                            />
                                        ) : (
                                            row.releaseQuantity
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editIndex === index ? (
                                            <TextField
                                                type="number"
                                                value={row.releasePrice}
                                                onChange={(e) => handleRowChange(index, 'releasePrice', e.target.value)}
                                                fullWidth
                                            />
                                        ) : (
                                            row.releasePrice
                                        )}
                                    </TableCell>


                                    <TableCell>
                                        {editIndex === index ? (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: '#24A0ED',
                                                        color: 'white',
                                                        marginRight: '8px',
                                                    }}
                                                    onClick={handleSave}
                                                    startIcon={<SaveIcon />}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: '#d11a2a',
                                                        color: 'white',
                                                    }}
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: '#24A0ED',
                                                        color: 'white',
                                                        marginRight: '8px',
                                                    }}
                                                    onClick={() => handleEdit(index)}
                                                    startIcon={<EditIcon />}
                                                >
                                                    Edit
                                                </Button>



                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: '#d11a2a',
                                                        color: 'white',
                                                    }}
                                                    onClick={() => openConfirmDelete(index)}
                                                    startIcon={<DeleteIcon />}
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>

                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog
                open={confirmDelete.open}
                onClose={closeConfirmDelete}
                aria-labelledby="confirm-delete-title"
                aria-describedby="confirm-delete-description"
            >
                <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-delete-description">
                        Are you sure you want to delete this stock?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteRow} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>



            <Dialog
                open={zeroProductDialogOpen}
                onClose={closeZeroProductDialog}
                aria-labelledby="product-id-zero-title"
                aria-describedby="product-id-zero-description"
            >
                <DialogTitle id="product-id-zero-title">Edit Not Allowed</DialogTitle>
                <DialogContent>
                    <DialogContentText id="product-id-zero-description">
                        You cannot edit a product with Product ID 0.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeZeroProductDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>



        </Paper>
    );
}

export default ViewRelease;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     fetchReleases,
//     updateRelease,
//     deleteRelease,
// } from '../State/actions/ViewReleaseActions';
// import {
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TablePagination,
//     TableRow,
//     TextField,
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,
//     Typography,
// } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';

// const columns = [
//     { id: 'number', label: 'No', minWidth: 50 },
//     { id: 'time', label: 'Time', minWidth: 150 },
//     { id: 'transactionId', label: 'Transaction ID', minWidth: 150 },
//     { id: 'stockID', label: 'Stock ID', minWidth: 150 },
//     { id: 'releaseQuantity', label: 'Release Quantity', minWidth: 100 },
//     { id: 'releasePrice', label: 'Release Price', minWidth: 150 },
//     { id: 'actions', label: 'Actions', minWidth: 200 },
// ];

// function ViewRelease() {
//     const dispatch = useDispatch();
//     const { releases } = useSelector((state) => state.release);

//     const [editIndex, setEditIndex] = useState(null);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     useEffect(() => {
//         dispatch(fetchReleases());
//     }, [dispatch]);

//     const handleRowChange = (index, field, value) => {
//         const updatedRow = { ...releases[index], [field]: value };
//         dispatch(updateRelease(updatedRow.transactionId, updatedRow));
//     };

//     const handleDeleteRow = (transactionId) => {
//         dispatch(deleteRelease(transactionId));
//     };

//     const handleEdit = (index) => setEditIndex(index);
//     const handleCancelEdit = () => setEditIndex(null);

//     const handleChangePage = (event, newPage) => setPage(newPage);
//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };

//     return (
//         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//             <Typography variant="h4" align="center" gutterBottom>
//                 View Release Stock
//             </Typography>
//             <TableContainer sx={{ maxHeight: 440 }}>
//                 <Table stickyHeader>
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <TableCell key={column.id}>{column.label}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {releases
//                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                             .map((row, index) => (
//                                 <TableRow key={row.transactionId}>
//                                     <TableCell>{row.number}</TableCell>
//                                     <TableCell>{row.time}</TableCell>
//                                     <TableCell>{row.transactionId}</TableCell>
//                                     <TableCell>{row.stockId}</TableCell>
//                                     <TableCell>
//                                         {editIndex === index ? (
//                                             <TextField
//                                                 type="number"
//                                                 value={row.releaseQuantity}
//                                                 onChange={(e) =>
//                                                     handleRowChange(index, 'releaseQuantity', e.target.value)
//                                                 }
//                                             />
//                                         ) : (
//                                             row.releaseQuantity
//                                         )}
//                                     </TableCell>
//                                     <TableCell>
//                                         {editIndex === index ? (
//                                             <TextField
//                                                 type="number"
//                                                 value={row.releasePrice}
//                                                 onChange={(e) =>
//                                                     handleRowChange(index, 'releasePrice', e.target.value)
//                                                 }
//                                             />
//                                         ) : (
//                                             row.releasePrice
//                                         )}
//                                     </TableCell>
//                                     <TableCell>
//                                         {editIndex === index ? (
//                                             <>
//                                                 <Button
//                                                     startIcon={<SaveIcon />}
//                                                     onClick={() => setEditIndex(null)}
//                                                 >
//                                                     Save
//                                                 </Button>
//                                                 <Button onClick={handleCancelEdit}>Cancel</Button>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Button
//                                                     startIcon={<EditIcon />}
//                                                     onClick={() => handleEdit(index)}
//                                                 >
//                                                     Edit
//                                                 </Button>
//                                                 <Button
//                                                     startIcon={<DeleteIcon />}
//                                                     onClick={() => handleDeleteRow(row.transactionId)}
//                                                 >
//                                                     Delete
//                                                 </Button>
//                                             </>
//                                         )}
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[10, 25, 100]}
//                 component="div"
//                 count={releases.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </Paper>
//     );
// }

// export default ViewRelease;

