// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import axios from 'axios';

// const API_LAST_ITEM_URL = 'http://localhost:8080/api/stocks/last';
// const API_BASE_URL = 'http://localhost:8080/api/stocks';

// function AddStock() {
//   const [stock, setStock] = React.useState(null);
//   const [productOptions, setProductOptions] = React.useState([]);
//   const [selectedProduct, setSelectedProduct] = React.useState('');
//   const [selectedProductName, setSelectedProductName] = React.useState('');

//   React.useEffect(() => {
//     // Fetch the latest stock item
//     axios
//       .get(API_LAST_ITEM_URL)
//       .then((response) => {
//         const product = response.data;
//         setStock({
//           stockId: product.rfid,
//           productName: product.productId,
//           count: product.quantity,
//           purchasingPrice: product.stockPrice,
          
//         });
//         if (product.productId !== 0) {
//           alert('Current scanned RFID related stock ' + product.rfid + ' already added. Redirecting to view Stock Page. Scan new RFID and try again.');
//           window.location.href = '/view-stock'; // Redirect to /view-stock
//           return;
//         };
        
//         setSelectedProduct(product.productId); // Set the default selected product
        
//       })
//       .catch((error) => {
//         console.error('Error fetching the latest stock:', error);
//       });

//     // Fetch product options for dropdown
//     axios
//       .get('http://localhost:8080/api/products')
//       .then((response) => {
//         setProductOptions(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching product options:', error);
//       });
//   }, []);

//   const handleFieldChange = (field, value) => {
//     setStock((prevStock) => ({
//       ...prevStock,
//       [field]: value,
//     }));
//   };

//   const handleProductChange = (value) => {
//     setSelectedProduct(value);
//     console.log('Selected product:', value);
//     const product = productOptions.find((product) => product.productName === value);
//     console.log('Product:', product);
//     console.log('Product ID:', product.pid);
//     setSelectedProduct(product.pid);
//     setSelectedProductName(product.productName);
//     //alert(` ${product.productName} selected Click on Submit to add the stock`);

//   };

//   const handleSubmit = () => {
//     if (!selectedProduct) {
//       alert('Please select a product.');
//       return;
//     }

//     if (stock.count <= 0 || stock.purchasingPrice <= 0) {
//       alert('Please provide valid count and purchasing price.');
//       return;
//     }

//     const payload = {
//       rfid: stock.stockId,
//       productId: selectedProduct, // Use selected product ID
//       quantity: parseInt(stock.count, 10), // Ensure numeric values
//       stockPrice: parseFloat(stock.purchasingPrice), // Ensure numeric values
//     };
//     console.log('Payload:', payload);

//     axios
//       .put(`${API_BASE_URL}/${stock.stockId}`, payload)
//       .then(() => {
//         alert('Stock Added successfully!');
//         window.location.href = '/view-stock'; // Redirect to /view-stock
//         setSelectedProductName('Select ');
//       })
//       .catch((error) => {
//         console.error('Error updating stock:', error);
//         alert('Failed to update stock. Check the console for details.');
//       });
//   };

//   if (!stock) {
//     return <Typography>Loading stock details...</Typography>;
//   }

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <Typography
//         variant="h4"
//         component="h1"
//         align="center"
//         gutterBottom
//         sx={{
//           fontSize: '2.0rem',
//           fontWeight: 'bold',
//           color: '#1976d2',
//         }}
//       >
//         Add Stock
//       </Typography>

//       <TableContainer>
//         <Table stickyHeader aria-label="stock table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Stock ID</TableCell>
//               <TableCell>Product Name</TableCell>
//               <TableCell>Count</TableCell>
//               <TableCell>Purchasing Price</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell>{stock.stockId}</TableCell>
//               <TableCell>
//                  <Select
//                   value={selectedProductName}
//                   placeholder="Product"
//                   onChange={(e) => handleProductChange(e.target.value)}
//                   displayEmpty
//                   fullWidth
//                 >
//                   <MenuItem value="" disabled>
//                     Select a Product
//                   </MenuItem>
//                   {productOptions.map((product, idx) => (
//                     <MenuItem key={idx} value={product.productName}>
//                       {product.productName}
//                     </MenuItem>
//                   ))}
//                 </Select> 
             
        
            
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   type="number"
//                   value={stock.count}
//                   onChange={(e) => handleFieldChange('count', e.target.value)}
//                   fullWidth
//                 />
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   type="number"
//                   value={stock.purchasingPrice}
//                   onChange={(e) => handleFieldChange('purchasingPrice', e.target.value)}
//                   fullWidth
//                 />
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </div>
//     </Paper>
//   );
// }

// export default AddStock;



import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';

const API_LAST_ITEM_URL = 'http://localhost:8080/api/stocks/last';
const API_BASE_URL = 'http://localhost:8080/api/stocks';

function AddStock() {
  const [stock, setStock] = React.useState(null);
  const [productOptions, setProductOptions] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [selectedProductName, setSelectedProductName] = React.useState('');
  const [dialog, setDialog] = React.useState({ open: false, title: '', message: '', onConfirm: null });

  React.useEffect(() => {
    // Fetch the latest stock item
    axios
      .get(API_LAST_ITEM_URL)
      .then((response) => {
        const product = response.data;
        setStock({
          stockId: product.rfid,
          productName: product.productId,
          count: product.quantity,
          purchasingPrice: product.stockPrice,
        });
        if (product.productId !== 0) {
          setDialog({
            open: true,
            title: 'Existing Stock Detected',
            message: `Current scanned RFID related stock ${product.rfid} already added. Redirecting to View Stock Page.`,
            onConfirm: () => (window.location.href = '/view-stock'),
          });
          return;
        }
        setSelectedProduct(product.productId);
      })
      .catch((error) => {
        console.error('Error fetching the latest stock:', error);
      });

    // Fetch product options for dropdown
    axios
      .get('http://localhost:8080/api/products')
      .then((response) => {
        setProductOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product options:', error);
      });
  }, []);

  const handleFieldChange = (field, value) => {
    setStock((prevStock) => ({
      ...prevStock,
      [field]: value,
    }));
  };

  const handleProductChange = (value) => {
    const product = productOptions.find((product) => product.productName === value);
    setSelectedProduct(product.pid);
    setSelectedProductName(product.productName);
  };

  const handleSubmit = () => {
    if (!selectedProduct) {
      setDialog({
        open: true,
        title: 'Validation Error',
        message: 'Please select a product.',
        onConfirm: () => setDialog({ ...dialog, open: false }),
      });
      return;
    }

    if (stock.count <= 0 || stock.purchasingPrice <= 0) {
      setDialog({
        open: true,
        title: 'Validation Error',
        message: 'Please provide valid count and purchasing price.',
        onConfirm: () => setDialog({ ...dialog, open: false }),
      });
      return;
    }

    const payload = {
      rfid: stock.stockId,
      productId: selectedProduct,
      quantity: parseInt(stock.count, 10),
      stockPrice: parseFloat(stock.purchasingPrice),
    };

    axios
      .put(`${API_BASE_URL}/${stock.stockId}`, payload)
      .then(() => {
        setDialog({
          open: true,
          title: 'Success',
          message: 'Stock added successfully!',
          onConfirm: () => (window.location.href = '/view-stock'),
        });
      })
      .catch((error) => {
        console.error('Error updating stock:', error);
        setDialog({
          open: true,
          title: 'Error',
          message: 'Failed to update stock. Check the console for details.',
          onConfirm: () => setDialog({ ...dialog, open: false }),
        });
      });
  };

  if (!stock) {
    return <Typography>Loading stock details...</Typography>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
        Add Stock
      </Typography>

      <TableContainer>
        <Table stickyHeader aria-label="stock table">
          <TableHead>
            <TableRow>
              <TableCell>Stock ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Purchasing Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{stock.stockId}</TableCell>
              <TableCell>
                <Select
                  value={selectedProductName}
                  onChange={(e) => handleProductChange(e.target.value)}
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
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={stock.count}
                  onChange={(e) => handleFieldChange('count', e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={stock.purchasingPrice}
                  onChange={(e) => handleFieldChange('purchasingPrice', e.target.value)}
                  fullWidth
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      {/* Dialog Component */}
      <Dialog
        open={dialog.open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            setDialog({ ...dialog, open: false });
          }
        }}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">{dialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setDialog({ ...dialog, open: false })} color="primary">
            Close
          </Button> */}
          {dialog.onConfirm && (
            <Button onClick={dialog.onConfirm} color="secondary" autoFocus>
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default AddStock;
