import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddProductPopup({ open, onClose, onAddProduct }) {
  const [productName, setProductName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (!productName.trim()) return; // Prevent adding empty product names
    setLoading(true);
    try {
      // Simulating backend call
      const productId = Math.floor(Math.random() * 1000); // Assuming backend will return a new product ID
      const newProduct = { productId, productName };
      onAddProduct(newProduct); // Add product to the list
      setProductName(''); // Clear the product name field
      onClose(); // Close the popup
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the product name to add a new product.
        </DialogContentText>
        <form onSubmit={handleAddProduct}> {/* Wrapping in a form */}
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            type="text"
            fullWidth
            value={productName}
            onChange={handleProductNameChange}
          />
          <DialogActions>
            <Button onClick={onClose} color="primary" disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading || !productName.trim()}>
              {loading ? 'Adding...' : 'Add Product'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProductPopup;
