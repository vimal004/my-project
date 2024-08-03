import React, { useEffect, useState } from "react";
import { LoginSharp } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Icon,
} from "@mui/material";
import LoginModal from "./LoginModal"; // Ensure the path is correct
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "@mui/icons-material";
import { login, logout } from "../Redux/Slices/loginSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const [loginOpen, setLoginOpen] = useState(false);
  const saveduser = localStorage.getItem("user");

  useEffect(() => {
    if (saveduser != null && saveduser != "null") {
      console.log(saveduser);
      dispatch(login(saveduser));
    }
  }, [saveduser]);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const loggedin = useSelector((state) => state.login.user);

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
            <Link to="">
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
            </Link>
            <Typography variant="h6" component="div" fontWeight={"bold"}>
              Siddha Shivalayas Patient Management
            </Typography>
          </Box>
          {loggedin ? (
            <IconButton
              onClick={() => {
                dispatch(logout());
                localStorage.setItem("user", null);
              }}
            >
              <Logout />
            </IconButton>
          ) : (
            <IconButton onClick={handleLoginOpen}>
              <LoginSharp />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <LoginModal open={loginOpen} onClose={handleLoginClose} />
    </>
  );
};

export default Header;
