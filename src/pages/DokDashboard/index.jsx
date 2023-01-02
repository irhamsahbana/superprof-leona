import React, { useEffect, useState } from "react";
import MainCalendar from "../../components/MainCalendar";
import Container from "../../layouts/Container";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import {
  Stack,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Icon,
} from "@mui/material";

export default function DokDashboard() {
  return (
    <div>
      <h1 className="mb-2">Dashboard</h1>

      <div className="flex flex-col md:flex-row lg:flex-row mb-6">
        <p className="text-lg">Selamat datang, Dokter</p>
      </div>
      <Stack>
        <Box sx={{ display: "flex", mb: 4 }}>
          <Card
            sx={{
              width: "100%",
              height: 150,
              mr: 2,
              backgroundColor: "#e9d5ff",
            }}
          >
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box sx={{ fontSize: 16, ml: 1 }}>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  Pasien{" "}
                </Typography>
                <Typography variant="h2" component="div">
                  8
                </Typography>
                <Typography variant="body1">Hari ini </Typography>
              </Box>
              <Box sx={{ width: 48, height: "auto", mr: 4, mt: 2 }}>
                <AccountBoxRoundedIcon
                  sx={{ fontSize: "80px", color: "#a855f7" }}
                />
              </Box>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: "100%",
              height: 150,
              mr: 2,
              backgroundColor: "#bfdbfe",
            }}
          >
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box sx={{ fontSize: 16, ml: 1 }}>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  Rekam Medis{" "}
                </Typography>
                <Typography variant="h2" component="div">
                  8
                </Typography>
                <Typography variant="body1">Hari ini </Typography>
              </Box>
              <Box sx={{ width: 48, height: "auto", mr: 4, mt: 2 }}>
                <PermContactCalendarIcon
                  sx={{ fontSize: "80px", color: "#60a5fa" }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Container>
          <MainCalendar />
        </Container>
      </Stack>
    </div>
  );
}
