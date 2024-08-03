import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Slide,
  IconButton,
  Snackbar,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Slices/loginSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://mern-project-backend-green.vercel.app/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", res?.data?.email);
        dispatch(login(res?.data?.email));
        console.log(res?.data?.email);
        onClose();
        setSnackbarMessage("Login Successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage("Login Failed! Please check your credentials.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            borderRadius: 15,
            padding: "10px 20px",
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : "white",
            color: theme.palette.mode === "dark" ? "white" : "black",
          },
        }}
      >
        <DialogTitle>
          Login
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email and password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputProps={{
              style: {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error !== ""}
            helperText={error}
            sx={{ marginBottom: 2 }}
            InputProps={{
              style: {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ borderRadius: 50 }}>
            Cancel
          </Button>
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 50, boxShadow: 3 }}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default LoginModal;
