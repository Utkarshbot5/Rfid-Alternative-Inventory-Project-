import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn ,GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "#4265c9", // Matching the header's color scheme
        color: "#fff", // White text for contrast
        borderTop: "1px solid rgb(81, 129, 200)",
        position: "sticky", // Stick footer to the bottom
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2" color="inherit">
        © 2024 Intake 21 EN3521 Group 07. All rights reserved.
      </Typography>
      <Box>
        {/* <IconButton href="https://facebook.com" target="_blank" sx={{ color: "#fff" }}>
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" sx={{ color: "#fff" }}>
          <Twitter />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" sx={{ color: "#fff" }}>
          <Instagram />
        </IconButton>
        <IconButton href="https://linkedin.com" target="_blank" sx={{ color: "#fff" }}>
          <LinkedIn />
        </IconButton> */}
        <IconButton href="https://github.com/dilsha01/RFID-Based-Inventory-Managemet-System-.git" target="_blank" sx={{ color: "#fff" }}>
          <GitHub />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
