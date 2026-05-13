// import * as React from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Clogo from '../assets/clogo.png';

// const headerWidth = 240;
// const navItems = [
//   { name: 'Dashboard', path: '/dashboard' },
//   { name: 'Product', path: '/view-product' },
//   { name: 'Add Stock', path: '/add-stock' },
//   { name: 'View Stock', path: '/view-stock' },
//   { name: 'Release Stock', path: '/release-stock' },
//   { name: 'View Release', path: '/view-release' }
// ];

// function Header(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         Inventory Management System
//       </Typography>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.name} disablePadding>
//             <ListItemButton
//               sx={{
//                 textAlign: 'center',
//                 backgroundColor: location.pathname === item.path ? 'rgb(11, 107, 203)' : 'inherit', // Darker shade for highlighted item
//                 '&:hover': { backgroundColor: 'rgb(11, 107, 203)' }, // Hover color for the items
//               }}
//               onClick={() => navigate(item.path)}
//             >
//               <ListItemText primary={item.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar component="nav">
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           <Typography
//             variant="h5"
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
//           >
//             <Button sx={{ color: '#fff' }} onClick={() => navigate("/")}>
//               <img src={Clogo} alt="Company Logo" style={{ maxWidth: '40px', height: 'auto', padding: '5px' }} />
//               Inventory Management System
//             </Button>
//           </Typography>

//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//             {navItems.map((item) => (
//               <Button
//                 key={item.name}
//                 sx={{
//                   color: '#fff',
//                   borderBottom: location.pathname === item.path ? '2px solid #fff' : 'none',
//                   backgroundColor: location.pathname === item.path ? 'rgb(11, 107, 203)' : 'inherit', // Darker shade for selected item
//                   '&:hover': { backgroundColor: 'rgb(11, 107, 203)' }, // Hover color for the items
//                 }}
//                 onClick={() => navigate(item.path)}
//               >
//                 {item.name}
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <nav>
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: headerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//     </Box>
//   );
// }

// export default Header;

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate, useLocation } from 'react-router-dom';
import Clogo from '../assets/clogo.png';

const headerWidth = 240;
const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Product', path: '/view-product' },
  { name: 'Add Stock', path: '/add-stock' },
  { name: 'View Stock', path: '/view-stock' },
  { name: 'Release Stock', path: '/release-stock' },
  { name: 'View Release', path: '/view-release' }
];

// Snackbar Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [notification, setNotification] = React.useState({ open: false, message: '' });
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/tutorial');

    socket.onmessage = (event) => {
      setNotification({ open: true, message: event.data });
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '' });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Inventory Management System
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'center',
                backgroundColor: location.pathname === item.path ? 'rgb(11, 107, 203)' : 'inherit',
                '&:hover': { backgroundColor: 'rgb(11, 107, 203)' },
              }}
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Button sx={{ color: '#fff' }} onClick={() => navigate("/")}>
              <img src={Clogo} alt="Company Logo" style={{ maxWidth: '40px', height: 'auto', padding: '5px' }} />
              Inventory Management System
            </Button>
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                sx={{
                  color: '#fff',
                  borderBottom: location.pathname === item.path ? '2px solid #fff' : 'none',
                  backgroundColor: location.pathname === item.path ? 'rgb(11, 107, 203)' : 'inherit',
                  '&:hover': { backgroundColor: 'rgb(11, 107, 203)' },
                }}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: headerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={10000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity="info" sx={{ width: '100%' ,
  
            borderRadius: '8px', // Smooth edges for the alert
     
          
        }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Header;
