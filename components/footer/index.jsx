import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" textAlign="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/orgs/SLAF-Project/dashboard"
      >
        The Cabane Project
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: `rgba(248, 249, 250)`,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1"></Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
