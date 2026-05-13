import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Responsive layout
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "78vh",
        padding: "32px",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#1976d2", // Primary color
          }}
        >
          Admin Dashboard
        </Typography>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/dashboard")}
          sx={{
            width: "400px",
            fontSize: "18px",
          }}
        >
          Dashboard
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/view-stock")}
          sx={{
            width: "400px",
            fontSize: "18px",
          }}
        >
          View Inventory
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/release-stock")}
          sx={{
            width: "400px",
            fontSize: "18px",
          }}
        >
          Sale
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
