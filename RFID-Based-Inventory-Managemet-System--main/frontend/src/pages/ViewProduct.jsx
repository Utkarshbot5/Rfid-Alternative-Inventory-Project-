import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AddProductPopup from '../components/AddProductPopup'; // Import the AddProductPopup component
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect } from 'react';

// const columns = [
//   { id: 'productId', label: 'Product ID', minWidth: 150 },
//   { id: 'productName', label: 'Product Name', minWidth: 150 },
//   { id: 'actions', label: 'Actions', minWidth: 200 }, // Add Actions column
// ];

// function ViewProduct() {
//   const [rows, setRows] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [openAddPopup, setOpenAddPopup] = React.useState(false);
//   const [confirmDelete, setConfirmDelete] = React.useState({ open: false, index: null });
//   const [editDialog, setEditDialog] = React.useState({ open: false, index: null, productName: '' });

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleOpenAddPopup = () => {
//     setOpenAddPopup(true);
//   };

//   const handleCloseAddPopup = () => {
//     setOpenAddPopup(false);
//   };

//   const addNewProduct = (product) => {
//     setRows([...rows, product]);
//     handleCloseAddPopup();
//   };

//   const openConfirmDelete = (index) => {
//     setConfirmDelete({ open: true, index });
//   };

//   const closeConfirmDelete = () => {
//     setConfirmDelete({ open: false, index: null });
//   };

//   const handleDeleteRow = () => {
//     const newRows = rows.filter((_, i) => i !== confirmDelete.index);
//     setRows(newRows);
//     closeConfirmDelete();
//   };

//   const handleEdit = (index) => {
//     const productToEdit = rows[index];
//     setEditDialog({ open: true, index, productName: productToEdit.productName });
//   };

//   const closeEditDialog = () => {
//     setEditDialog({ open: false, index: null, productName: '' });
//   };

//   const handleEditChange = (event) => {
//     setEditDialog((prev) => ({ ...prev, productName: event.target.value }));
//   };

//   const saveEdit = () => {
//     const updatedRows = [...rows];
//     updatedRows[editDialog.index].productName = editDialog.productName;
//     setRows(updatedRows);
//     closeEditDialog();
//   };

const columns = [
  { id: 'number', label: 'No', minWidth: 50 },
  { id: 'productId', label: 'Product ID', minWidth: 150 },
  { id: 'productName', label: 'Product Name', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 200 },
];

function ViewProduct() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openAddPopup, setOpenAddPopup] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState({ open: false, index: null });
  const [editDialog, setEditDialog] = React.useState({ open: false, index: null, productName: '' });

  const API_BASE_URL = 'http://localhost:8080/api/products';

  useEffect(() => {
    // Fetch products on component mount
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        const products = response.data.map((product, index) => ({
          number: index + 1,
          productId: product.pid,
          productName: product.productName,
        }));
        setRows(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenAddPopup = () => {
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const products = response.data.map((product, index) => ({
        number: index + 1,
        productId: product.pid,
        productName: product.productName,
      }));
      setRows(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addNewProduct = async (product) => {
    try {
      const response = await axios.post(API_BASE_URL, product);
      fetchProducts();
      handleCloseAddPopup();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const openConfirmDelete = (index) => {
    setConfirmDelete({ open: true, index });
  };

  const closeConfirmDelete = () => {
    setConfirmDelete({ open: false, index: null });
  };

  const handleDeleteRow = async () => {
    const productToDelete = rows[confirmDelete.index];
    try {
      await axios.delete(`${API_BASE_URL}/${productToDelete.productId}`);
      fetchProducts();
      closeConfirmDelete();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (index) => {
    const productToEdit = rows[index];
    setEditDialog({ open: true, index, productName: productToEdit.productName });
  };

  const closeEditDialog = () => {
    setEditDialog({ open: false, index: null, productName: '' });
  };

  const handleEditChange = (event) => {
    setEditDialog((prev) => ({ ...prev, productName: event.target.value }));
  };

  const saveEdit = async () => {
    const updatedProduct = { ...rows[editDialog.index], productId: rows[editDialog.index].productId, productName: editDialog.productName };
    try {
      await axios.put(`${API_BASE_URL}/${updatedProduct.productId}`, updatedProduct);
      fetchProducts();
      closeEditDialog();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      {/* <div style={{ padding: '16px' }}> */}
      <div>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontSize: '2.0rem',
            fontWeight: 'bold',
            color: '#1976d2', // Primary color for heading
          }}
        >
          Product
        </Typography>
      </div>

      <TableContainer sx={{ maxHeight: 370 }}>
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
        <TableCell>{row.productId}</TableCell>
        <TableCell>{row.productName}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#24A0ED', color: 'white', marginRight: '8px' }}
            onClick={() => handleEdit(index)}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#d11a2a', color: 'white' }}
            onClick={() => openConfirmDelete(index)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleOpenAddPopup}>
          Add New Product
        </Button>
      </div>
      <AddProductPopup open={openAddPopup} onClose={handleCloseAddPopup} onAddProduct={addNewProduct} />
      <Dialog
        open={confirmDelete.open}
        onClose={closeConfirmDelete}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            Are you sure you want to delete this product?
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
        open={editDialog.open}
        onClose={closeEditDialog}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
      >
        <DialogTitle id="edit-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            type="text"
            fullWidth
            value={editDialog.productName}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={saveEdit} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default ViewProduct;
