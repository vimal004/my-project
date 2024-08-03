import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const PatientEntry = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phno: "",
    age: "",
    sex: "",
  });

  const [tdat, setTdat] = useState(null);
  const [gdat, setGdat] = useState(null);
  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [success, setSuccess] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      phno: "",
      address: "",
      group: "",
    });
  };

  useEffect(() => {
    axios
      .get("https://vcf-backend.vercel.app/group")
      .then((response) => {
        setTdat(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching group:", error);
      });
  }, []);

  useEffect(() => {
    if (tdat) {
      setGdat(tdat.filter((d) => d.group === formData.group));
    }
  }, [formData, tdat]);

  const handleDelete = () => {
    setLoadingDelete(true);
    axios
      .delete(`https://vcf-backend.vercel.app/Patient/${formData.id}`)
      .then(() => {
        setDeleted(true);
        resetForm();
        setTimeout(() => {
          setDeleted(false);
        }, 3000);
        axios
          .delete(`https://vcf-backend.vercel.app/group/transaction`, {
            data: { id: formData.id },
          })
          .then((res) => {})
          .catch((err) => {
            console.error(err);
          })
          .finally(() => setLoadingDelete(false));
      })
      .catch((err) => {
        console.error(err);
        setLoadingDelete(false);
        setErrorMessage("Patient deletion failed");
        setSuccess(false);
      });
  };

  const handleUpdate = () => {
    setLoadingUpdate(true);
    axios
      .put("https://vcf-backend.vercel.app/Patient", formData)
      .then((res) => {
        setUpdated(true);
        resetForm();
        setTimeout(() => {
          setUpdated(false);
        }, 3000);
        setLoadingUpdate(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingUpdate(false);
        setErrorMessage("Patient update failed");
        setSuccess(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setLoadingCreate(true);
    if (!formData.id) {
      setErrorMessage("ID is required");
      setSuccess(false);
      setLoadingCreate(false);
      return;
    }

    axios
      .post("https://vcf-backend.vercel.app/Patient", formData)
      .then(() => {
        setSuccess(true);
        setCreated(true);
        resetForm();
        setTimeout(() => {
          setCreated(false);
          setSuccess(null);
          setErrorMessage("");
        }, 3000);
        if (tdat) {
          setGdat(tdat.filter((d) => d.group === formData.group) || null);
        }
        if (gdat && gdat.length > 0) {
          setInputValues(
            Array.from({ length: gdat[0].months }, () => ({
              auctionDate: "",
              dueDate: "",
              remainingAmount: "",
              dueAmount: "",
              paidAmount: "",
              status: "Pending",
            }))
          );

          axios
            .post("https://vcf-backend.vercel.app/group/transaction", {
              id: formData.id,
              data: inputValues,
            })
            .then((res) => {})
            .catch((err) => {});
        }
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
        setErrorMessage("Patient creation failed");
      })
      .finally(() => setLoadingCreate(false));
  };

  const isIdEntered = formData.id.trim() !== "";

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <div
        style={{
          background: "#ffffff",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Patient Form
        </Typography>
        <form onSubmit={handleCreate}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  style: { borderRadius: "8px" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  style: { borderRadius: "8px" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phno"
                value={formData.phno}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  style: { borderRadius: "8px" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Age"
                name="age"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  style: { borderRadius: "8px" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select
                  label="Sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  style={{ borderRadius: "8px" }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                  disabled={!isIdEntered || loadingCreate}
                  style={{
                    borderRadius: "8px",
                    textTransform: "none",
                    margin: "8px",
                  }}
                >
                  {loadingCreate ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Create"
                  )}
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  disableElevation
                  disabled={!isIdEntered || loadingUpdate}
                  onClick={handleUpdate}
                  style={{
                    borderRadius: "8px",
                    textTransform: "none",
                    margin: "8px",
                  }}
                >
                  {loadingUpdate ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Update"
                  )}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  disableElevation
                  disabled={!isIdEntered || loadingDelete}
                  onClick={handleDelete}
                  style={{
                    borderRadius: "8px",
                    textTransform: "none",
                    margin: "8px",
                  }}
                >
                  {loadingDelete ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
              <div className="text-center">
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "8px",
                    textTransform: "none",
                    margin: "8px",
                  }}
                >
                  View Patients
                </Button>
              </div>
            </Grid>
          </Grid>
          <Snackbar
            open={created || deleted || updated}
            autoHideDuration={3000}
            onClose={() => {
              setCreated(false);
              setDeleted(false);
              setUpdated(false);
            }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity="success"
              onClose={() => {
                setCreated(false);
                setDeleted(false);
                setUpdated(false);
              }}
            >
              {created && "Patient Created"}
              {deleted && "Patient Record Deleted"}
              {updated && "Patient Record Updated"}
            </MuiAlert>
          </Snackbar>
          {success === false && (
            <Snackbar open={true} autoHideDuration={3000}>
              <MuiAlert elevation={6} variant="filled" severity="error">
                {errorMessage}
              </MuiAlert>
            </Snackbar>
          )}
        </form>
      </div>
    </Container>
  );
};

export default PatientEntry;
