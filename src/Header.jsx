import React, { useState } from "react";
import { LoginSharp } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import LoginModal from "./LoginModal"; // Ensure the path is correct

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ flexGrow: 1 }}
          >
            <img
              src="/L.jpg"
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
          <IconButton color="inherit" onClick={handleLoginOpen}>
            <LoginSharp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <LoginModal open={loginOpen} onClose={handleLoginClose} />
    </>
  );
};

export default Header;
