import * as React from 'react';
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

const columns = [
  { id: 'number', label: 'Number', minWidth: 50 },
  { id: 'stockId', label: 'Stock ID', minWidth: 150 },
  { id: 'productName', label: 'Product Name', minWidth: 150 },
  { id: 'count', label: 'Count', minWidth: 100 },
  { id: 'purchasingPrice', label: 'Purchasing Price', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 200 },
];

// Dummy data for testing
const dummyData = [
  { number: 1, stockId: 'STK001', productName: 'Product 1', count: 10, purchasingPrice: 100 },
  { number: 2, stockId: 'STK002', productName: 'Product 2', count: 20, purchasingPrice: 200 },
  { number: 3, stockId: 'STK003', productName: 'Product 3', count: 15, purchasingPrice: 150 },
  { number: 4, stockId: 'STK004', productName: 'Product 4', count: 30, purchasingPrice: 300 },
];

function ViewEditStock() {
  const [rows, setRows] = React.useState(dummyData); // Initialize rows with dummy data
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editIndex, setEditIndex] = React.useState(null);
  const [confirmDelete, setConfirmDelete] = React.useState({ open: false, index: null });

  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const handleDeleteRow = () => {
    const updatedRows = rows
      .filter((_, i) => i !== confirmDelete.index)
      .map((row, i) => ({ ...row, number: i + 1 }));
    setRows(updatedRows);
    setConfirmDelete({ open: false, index: null });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSave = () => {
    setEditIndex(null);
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

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* <div style={{ padding: '16px' }}> */}
      <div >
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
          View Edit Stock
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
                  <TableCell>{row.stockId}</TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <Select
                        value={row.productName}
                        onChange={(e) => handleRowChange(index, 'productName', e.target.value)}
                        displayEmpty
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>Select Product</em>
                        </MenuItem>
                        <MenuItem value="Product 1">Product 1</MenuItem>
                        <MenuItem value="Product 2">Product 2</MenuItem>
                        <MenuItem value="Product 3">Product 3</MenuItem>
                        <MenuItem value="Product 4">Product 4</MenuItem>
                      </Select>
                    ) : (
                      row.productName
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        type="number"
                        value={row.count}
                        onChange={(e) => handleRowChange(index, 'count', e.target.value)}
                        fullWidth
                      />
                    ) : (
                      row.count
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        type="number"
                        value={row.purchasingPrice}
                        onChange={(e) => handleRowChange(index, 'purchasingPrice', e.target.value)}
                        fullWidth
                      />
                    ) : (
                      row.purchasingPrice
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                          Save
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="contained" onClick={() => handleEdit(index)}>
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => openConfirmDelete(index)}
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
            Are you sure you want to delete this row?
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
    </Paper>
  );
}

export default ViewEditStock;
