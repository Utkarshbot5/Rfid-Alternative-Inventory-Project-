import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [productProfits, setProductProfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SUMMARY_API_URL = 'http://localhost:8080/api/dashboard/summary';
  const PROFITS_API_URL = 'http://localhost:8080/api/dashboard/product-profits';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryResponse, profitsResponse] = await Promise.all([
          axios.get(SUMMARY_API_URL),
          axios.get(PROFITS_API_URL),
        ]);
        setSummary(summaryResponse.data);
        setProductProfits(profitsResponse.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderCard = (title, value, valueColor) => (
    <Card
      sx={{
        minWidth: 250,
        maxWidth: 300,
        backgroundColor: '#e3f2fd',
        boxShadow: 3,
        margin: '10px',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
            marginBottom: '10px',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          component="p"
          sx={{
            color: valueColor,
            fontWeight: 'bold',
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  const renderProductProfitsTable = () => (
    <Table
      sx={{
        marginTop: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <TableHead
        sx={{
          backgroundColor: '#1976d2',
          '& .MuiTableCell-root': {
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          },
        }}
      >
        <TableRow>
          <TableCell>Product Name</TableCell>
          <TableCell align="right">Units Available</TableCell>
          <TableCell align="right">Units Released</TableCell>
          <TableCell align="right">Profit (LKR)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {productProfits.map((product) => (
          <TableRow
            key={product.productId}
            sx={{
              '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
              '&:hover': { backgroundColor: '#e3f2fd' },
            }}
          >
            <TableCell sx={{ textAlign: 'center', color: '#555' }}>
              {product.productName}
            </TableCell>
            <TableCell align="center" sx={{ color: '#555' }}>
              {product.stockQuantity}
            </TableCell>
            <TableCell align="center" sx={{ color: '#555' }}>
              {product.releaseQuantity}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'green' }}>
              {product.profit.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderPieCharts = () => {
    const labels = productProfits.map((product) => product.productName);

    const availableData = productProfits.map((product) => product.stockQuantity);
    const releasedData = productProfits.map((product) => product.releaseQuantity);
    const profitData = productProfits.map((product) => product.profit);

    const colors = [
      '#D32F2F',  // Dark Red
      '#1976D2',  // Dark Blue
      '#388E3C',  // Dark Green
      '#F57C00',  // Dark Orange
      '#8E24AA',  // Dark Purple
      '#0288D1',  // Bright Blue
      '#C2185B',  // Dark Pink
      '#7B1FA2',  // Purple
      '#0288D1',  // Bright Blue
      '#FBC02D',  // Dark Yellow
      '#FF5722',  // Dark Coral
      '#FF9800',  // Dark Amber
      '#8B4513',  // Dark Brown
      '#3F51B5',  // Indigo
      '#607D8B',  // Dark Slate Gray
      '#9E9D24',  // Olive Green
      '#E64A19',  // Red-Orange
      '#43A047',  // Green
      '#512DA8',  // Deep Purple
      '#795548',  // Dark Brown
    ];

    const createChartData = (data, label) => ({
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    });

    return (
      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              minWidth: 250,
              maxWidth: 300,
              backgroundColor: '#e3f2fd',
              boxShadow: 3,
              margin: '10px',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: '#1976d2',
                }}
              >
                Units Available
              </Typography>
              <Doughnut data={createChartData(availableData, 'Units Available')} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              minWidth: 250,
              maxWidth: 300,
              backgroundColor: '#e3f2fd',
              boxShadow: 3,
              margin: '10px',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: '#1976d2',
                }}
              >
                Units Released
              </Typography>
              <Doughnut data={createChartData(releasedData, 'Units Released')} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              minWidth: 250,
              maxWidth: 300,
              backgroundColor: '#e3f2fd',
              boxShadow: 3,
              margin: '10px',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: '#1976d2',
                }}
              >
                Profit Distribution
              </Typography>
              <Doughnut data={createChartData(profitData, 'Profit')} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };


  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Box
        sx={{
          padding: '10px',
          textAlign: 'left',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: 'bold', color: '#1976d2' }}
        >
          Overall Performance
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography
          color="error"
          sx={{ textAlign: 'center', marginTop: '20px' }}
        >
          {error}
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Products', summary.totalProducts, '#003366')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Units Available', summary.totalStockQuantity, '#003366')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Units Released', summary.totalReleaseUnits, '#003366')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Purchase Price', `LKR ${summary.totalPurchasePrice.toLocaleString()}`, 'red')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Revenue', `LKR ${summary.totalRevenue.toLocaleString()}`, '#FFB300')}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderCard('Total Profit', `LKR ${summary.totalProfit.toLocaleString()}`, 'green')}
            </Grid>
          </Grid>

          <Typography
            variant="h5"
            component="h2"
            sx={{ marginTop: '30px', fontWeight: 'bold', color: '#1976d2' }}
          >
            Product Performance
          </Typography>

          {renderPieCharts()}

          <Typography
            variant="h5"
            component="h2"
            sx={{ marginTop: '30px', fontWeight: 'bold', color: '#1976d2' }}
          >
            
          </Typography>

          {renderProductProfitsTable()}
        </>
      )}
    </Box>
  );
}

export default Dashboard;




