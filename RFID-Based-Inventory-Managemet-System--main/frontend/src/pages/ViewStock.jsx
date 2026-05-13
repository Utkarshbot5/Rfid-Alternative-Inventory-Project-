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
  { id: 'number', label: 'Number', minWidth: 50 },
  { id: 'stockId', label: 'Stock ID', minWidth: 150 },
  { id: 'productName', label: 'Product Name', minWidth: 150 },
  { id: 'count', label: 'Count', minWidth: 100 },
  { id: 'purchasingPrice', label: 'Purchasing Price(per unit)', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 200 },
];

const API_BASE_URL = 'http://localhost:8080/api/stocks';

function ViewStock() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editIndex, setEditIndex] = React.useState(null);
  const [confirmDelete, setConfirmDelete] = React.useState({ open: false, index: null });
  const [productOptions, setProductOptions] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [zeroProductDialogOpen, setZeroProductDialogOpen] = React.useState(false);
  const [selectedProductName, setSelectedProductName] = React.useState('');

  React.useEffect(() => {
    axios.get(API_BASE_URL)
      .then(response => {
        const products = response.data.map((product, index) => ({
          number: index + 1, // Serial number
          stockId: product.rfid, // Mapped from productId
          productName: product.productId, // Assuming rfid is used as product name
          count: product.quantity, // Mapped from quantity
          purchasingPrice: product.stockPrice, // Mapped from stockPrice
        }));
        console.log(products); // Debugging
        setRows(products); // Update state with mapped data
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);
  

  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const handleDeleteRow = () => {
    const productId = rows[confirmDelete.index].stockId;
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

// const handleEdit = async (index) => {
//   console.log(rows[index].productName); // Debugging
//   if (rows[index].productName == 0) {
//     setZeroProductDialogOpen(true); // Open the popup
//     return;
//   }
//   console.log("Name",rows[index].productName);
//   setEditIndex(index); // Proceed with edit
//   setSelectedProductName(selectedProduct.productName);
// };

const handleEdit = async (index) => {
  console.log(rows[index].productName); // Debugging
  if (!rows[index].productName) { // Check if productName is falsy
    setZeroProductDialogOpen(true); // Open the popup
    return;
  }
  console.log("Name", rows[index].productName);
  setEditIndex(index); // Proceed with edit

  console.log("Selected Product Name: Hi", rows[index].productName);
    const products = await getProductsByID(rows[index].productName);
    console.log("Products:", products);
    setSelectedProductName(products.data.productName);
    setSelectedProduct(products.data.pid);
     
  
};


const closeZeroProductDialog = () => {
  setZeroProductDialogOpen(false);
};


  // const handleSave = () => {
  //   const updatedProduct = rows[editIndex];
  //   console.log('save'); // Debugging
  //   console.log(updatedProduct); // Debugging
  //   // Prepare the correct payload based on the original mapping
  //   const payload = {
  //     rfid: updatedProduct.stockId, // Mapped back to rfid
  //     productId: updatedProduct.selected.Pid, // Mapped back to productId
  //     quantity: updatedProduct.count, // Mapped back to quantity
  //     stockPrice: updatedProduct.purchasingPrice, // Mapped back to stockPrice
  //   };
  
  //   // Make the PUT request with the correct URL and payload
  //   axios.put(`${API_BASE_URL}/${updatedProduct.stockId}`, payload)
  //     .then(() => {
  //       console.log('Product updated successfully:', payload);
  //       setEditIndex(null); // Exit edit mode
  //     })
  //     .catch(error => {
  //       console.error('There was an error updating the product!', error);
  //     });
  // };
  

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

  const getProductsByID = async (Pid) => {
    const response = await axios.get(`http://localhost:8080/api/products/${Pid}`);
    
    return response; // Returns the list of products
  };

  const getProducts = async () => {
    const response = await axios.get('http://localhost:8080/api/products');
    const products = response.data.map((product) => ({
      Pid: product.pid,
      productName: product.productName,
    }));
    return products; // Returns the list of products
  };
  
  const myProduct = async (value) => {
    try {
      const products = await getProducts();
      const selected = products.find((product) => product.productName === value);
   
      console.log(selected);
      if (selected) {
        console.log("Selected Product:", selected.productName);
        console.log("Selected Product ID:", selected.Pid);
        setSelectedProductName(selected.productName);
        setSelectedProduct(selected.Pid); // Assuming Pid is the value you want to store
        console.log("Selected Product PID:", selectedProduct);
        console.log("Selected Product is:",selectedProduct);
      } else {
        console.warn("Product not found!");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProductOptions(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  
  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get(API_BASE_URL);
  //     const products = response.data.map((product, index) => ({
  //       number: index + 1, // Serial number
  //       stockId: product.rfid, // Mapped from productId
  //       productName: product.productId, // Assuming rfid is used as product name
  //       count: product.quantity, // Mapped from quantity
  //       purchasingPrice: product.stockPrice, // Mapped from stockPrice
  //     }));
  //     console.log(products); // Debugging
  //     setRows(products); // Update state with mapped data
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };

  const fetchProducts = async (rfid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${rfid}`); // Fetch only the data for the given rfid
      const updatedProduct = {
        number: rows.findIndex((row) => row.stockId === rfid) + 1, // Serial number (existing index + 1)
        stockId: response.data.rfid, // Mapped from productId
        productName: response.data.productId, // Assuming rfid is used as product name
        count: response.data.quantity, // Mapped from quantity
        purchasingPrice: response.data.stockPrice, // Mapped from stockPrice
      };
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.stockId === rfid ? updatedProduct : row // Replace only the matching row
        )
      );
    } catch (error) {
        console.error('Error fetching products:', error);
    }
 };

  const handleSave = () => {
    const updatedProduct = rows[editIndex];
    console.log(selectedProduct); // Debugging
    
    console.log('save'); // Debugging
    console.log(updatedProduct); // Debugging
    // Prepare the correct payload based on the original mapping
    const payload = {
      rfid: updatedProduct.stockId, // Mapped back to rfid
      productId: selectedProduct, // Mapped back to productId
      quantity: updatedProduct.count, // Mapped back to quantity
      stockPrice: updatedProduct.purchasingPrice, // Mapped back to stockPrice
    };
  
    console.log('Payload:', payload);
    // Make the PUT request with the correct URL and payload
    axios.put(`${API_BASE_URL}/${updatedProduct.stockId}`, payload)
      .then(() => {
        console.log('Product updated successfully:', payload);
        fetchProducts(updatedProduct.stockId);
        setEditIndex(null); // Exit edit mode
        //setSelectedProductName('');
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
          View Stock
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
          {/* <TableBody>
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
                        <MenuItem value="Product 1">Product 1</MenuItem>
                        <MenuItem value="Product 2">Product 2</MenuItem>
                        <MenuItem value="Product 3">Product 3</MenuItem>
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
                  </TableCell> */}


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
            value={selectedProductName}
            
            placeholder="Product"
            onChange={(e) => myProduct(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              Select a Product
            </MenuItem>

            {productOptions.map((product, idx) => (

              <MenuItem key={idx} value={product.productName}>
                 {product.productName} 
              </MenuItem>
              
            ))}
          </Select>
          ) : (
            productOptions.find((product) => product.Pid === row.productName)?.productName || row.productName
          )}
        </TableCell>
        {/* <TableCell>
  {editIndex === index ? (
    <Select
      value={row.productName} // This holds the productId
      onChange={(e) => handleRowChange(index, 'productName', e.target.value)} // Save the productId
      displayEmpty  // Show the placeholder
      fullWidth // Take the full width
    >
      <MenuItem value="" disabled> {/* Placeholder */}
        {/* Select a Product
      </MenuItem>
      {productOptions.map((product) => (
        <MenuItem key={product.Pid} value={product.Pid}>  {/* Save the productId */}
          {/* {product.productName} {/* Show productName in the dropdown */}
        {/* </MenuItem>
      ))}
    </Select>
  ) : (
    productOptions.find((product) => product.Pid === row.productName)?.productName || row.productName
  )}
</TableCell>  */}  

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
      {/* <Button
        variant="contained"
        sx={{
          backgroundColor: '#24A0ED',
          color: 'white',
          marginRight: '8px',
        }}
        onClick={() => {
          if (row.productId === '0') {
            alert('Cannot edit product with ID = 0');
            return;
          }
          handleEdit(index);
        }}
        startIcon={<EditIcon />}
      >
        Edit
      </Button> */}

    
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

export default ViewStock;

// import React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Typography from '@mui/material/Typography';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SaveIcon from '@mui/icons-material/Save';
// import axios from 'axios';

// const columns = [
//   { id: 'number', label: 'Number', minWidth: 50 },
//   { id: 'stockId', label: 'Stock ID', minWidth: 150 },
//   { id: 'productName', label: 'Product Name', minWidth: 150 },
//   { id: 'count', label: 'Count', minWidth: 100 },
//   { id: 'purchasingPrice', label: 'Purchasing Price', minWidth: 150 },
//   { id: 'actions', label: 'Actions', minWidth: 200 },
// ];

// const API_BASE_URL = 'http://localhost:8080/api/stocks';

// function ViewStock() {
//   const [rows, setRows] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [editIndex, setEditIndex] = React.useState(null);
//   const [confirmDelete, setConfirmDelete] = React.useState({ open: false, index: null });
//   const [productOptions, setProductOptions] = React.useState([]);
//   const [selectedProduct, setSelectedProduct] = React.useState('');

//   React.useEffect(() => {
//     axios.get(API_BASE_URL)
//       .then(response => {
//         const products = response.data.map((product, index) => ({
//           number: index + 1,
//           stockId: product.rfid,
//           productName: product.productId,
//           count: product.quantity,
//           purchasingPrice: product.stockPrice,
//         }));
//         setRows(products);
//       })
//       .catch(error => {
//         console.error('Error fetching stocks:', error);
//       });

//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/products');
//         const products = response.data.map(product => ({
//           productName: product.productName,
//         }));
//         setProductOptions(products);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleRowChange = (index, field, value) => {
//     const updatedRows = rows.map((row, i) =>
//       i === index ? { ...row, [field]: value } : row
//     );
//     setRows(updatedRows);
//   };

//   const handleDeleteRow = () => {
//     const productId = rows[confirmDelete.index].stockId;
//     axios.delete(`${API_BASE_URL}/${productId}`)
//       .then(() => {
//         const updatedRows = rows
//           .filter((_, i) => i !== confirmDelete.index)
//           .map((row, i) => ({ ...row, number: i + 1 }));
//         setRows(updatedRows);
//         setConfirmDelete({ open: false, index: null });
//       })
//       .catch(error => {
//         console.error('Error deleting stock:', error);
//       });
//   };

//   const handleEdit = (index) => {
//     setEditIndex(index);
//   };

//   const handleSave = () => {
//     const updatedProduct = rows[editIndex];
//     const payload = {
//       rfid: updatedProduct.stockId,
//       productId: updatedProduct.productName,
//       quantity: updatedProduct.count,
//       stockPrice: updatedProduct.purchasingPrice,
//     };

//     axios.put(`${API_BASE_URL}/${updatedProduct.stockId}`, payload)
//       .then(() => {
//         setEditIndex(null);
//       })
//       .catch(error => {
//         console.error('Error updating stock:', error);
//       });
//   };

//   const handleCancelEdit = () => {
//     setEditIndex(null);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const openConfirmDelete = (index) => {
//     setConfirmDelete({ open: true, index });
//   };

//   const closeConfirmDelete = () => {
//     setConfirmDelete({ open: false, index: null });
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <div style={{ padding: '16px' }}>
//         <Typography
//           variant="h4"
//           component="h1"
//           align="center"
//           gutterBottom
//           sx={{
//             fontSize: '2.0rem',
//             fontWeight: 'bold',
//             color: '#1976d2',
//           }}
//         >
//           View Stock
//         </Typography>
//       </div>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{row.number}</TableCell>
//                   <TableCell>{row.stockId}</TableCell>
//                   <TableCell>
//                     {editIndex === index ? (
//                       <Select
//                         value={row.productName}
//                         onChange={(e) => handleRowChange(index, 'productName', e.target.value)}
//                         displayEmpty
//                         fullWidth
//                       >
//                         <MenuItem value="" disabled>Select a Product</MenuItem>
//                         {productOptions.map((product, idx) => (
//                           <MenuItem key={idx} value={product.productName}>
//                             {product.productName}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     ) : (
//                       row.productName
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {editIndex === index ? (
//                       <TextField
//                         type="number"
//                         value={row.count}
//                         onChange={(e) => handleRowChange(index, 'count', e.target.value)}
//                         fullWidth
//                       />
//                     ) : (
//                       row.count
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {editIndex === index ? (
//                       <TextField
//                         type="number"
//                         value={row.purchasingPrice}
//                         onChange={(e) => handleRowChange(index, 'purchasingPrice', e.target.value)}
//                         fullWidth
//                       />
//                     ) : (
//                       row.purchasingPrice
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     {editIndex === index ? (
//                       <>
//                         <Button
//                           variant="contained"
//                           sx={{ backgroundColor: '#24A0ED', color: 'white', marginRight: '8px' }}
//                           onClick={handleSave}
//                           startIcon={<SaveIcon />}
//                         >
//                           Save
//                         </Button>
//                         <Button
//                           variant="contained"
//                           sx={{ backgroundColor: '#d11a2a', color: 'white' }}
//                           onClick={handleCancelEdit}
//                         >
//                           Cancel
//                         </Button>
//                       </>
//                     ) : (
//                       <>
//                         <Button
//                           variant="contained"
//                           sx={{ backgroundColor: '#24A0ED', color: 'white', marginRight: '8px' }}
//                           onClick={() => handleEdit(index)}
//                           startIcon={<EditIcon />}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           variant="contained"
//                           sx={{ backgroundColor: '#d11a2a', color: 'white' }}
//                           onClick={() => openConfirmDelete(index)}
//                           startIcon={<DeleteIcon />}
//                         >
//                           Delete
//                         </Button>
//                       </>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//       <Dialog
//         open={confirmDelete.open}
//         onClose={closeConfirmDelete}
//         aria-labelledby="confirm-delete-title"
//         aria-describedby="confirm-delete-description"
//       >
//         <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="confirm-delete-description">
//             Are you sure you want to delete this stock?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeConfirmDelete} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteRow} color="secondary" autoFocus>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// }

// export default ViewStock;
