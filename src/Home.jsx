import React from "react";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Stack spacing={2}>
        <Button
          component={Link}
          to="/addpatient"
          variant="contained"
          color="primary"
          size="large"
        >
          Manage Patient Record
        </Button>
        <Button
          component={Link}
          to="/billing"
          variant="contained"
          color="secondary"
          size="large"
        >
          Billing
        </Button>
        <Button
          component={Link}
          to="/productpurchases"
          variant="contained"
          color="success"
          size="large"
        >
          Product Purchases
        </Button>
        <Button
          component={Link}
          to="/appointments"
          variant="contained"
          color="info"
          size="large"
        >
          Appointments
        </Button>
        <Button
          component={Link}
          to="/productstocks"
          variant="contained"
          color="warning"
          size="large"
        >
          Product Stocks
        </Button>
      </Stack>
    </div>
  );
};

export default Home;
