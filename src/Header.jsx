import React from "react";
import { LoginSharp } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ flexGrow: 1 }}
        >
          <img
            src="public/L.jpg"
            alt="Logo"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              marginRight: "20px",
            }}
          />
          <Typography variant="h6" component="div">
            Siddha Shivalayas Patient Management
          </Typography>
        </Box>
        <IconButton component={Link} to="/login" color="inherit">
          <LoginSharp />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
