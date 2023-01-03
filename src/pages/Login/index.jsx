import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Logo from "../../assets/logo-transparent.png";
// redux, routes
import { setRole, login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.instagram.com/dentologybali/">
        Dentology Aesthetic Dental Care
      </Link>{" "}
      2022 {"."}
    </Typography>
  );
}

// const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPwd, setShowPwd] = useState(false);
  const [isError, setIsError] = useState({
    general: false,
    authorized: false,
    username: false,
    password: false,
  });
  const [errorMsg, setErrorMsg] = useState("");

  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    if (inputValues) {
      setIsError({ general: false });
      setErrorMsg("");
    }

    if (inputValues.username === "admin") {
      dispatch(setRole("admin"));
    } else {
      dispatch(setRole("dokter"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.username.length < 1) {
      setIsError({ ...isError, username: true, general: true });
      setErrorMsg("Harap isi field");
    } else if (
      //TODO: not complete with pwd validation
      inputValues.username !== "admin" &&
      inputValues.username !== "drgandy"
    ) {
      setIsError({ ...isError, authorized: true, general: true });
      setErrorMsg("Username/ password tidak terdaftar");
    } else {
      if (inputValues.username === "admin") {
        dispatch(setRole("admin"));
      } else {
        dispatch(setRole("dokter"));
      }
      dispatch(login(inputValues));
      setErrorMsg("");
      navigate("/");
    }
    e.target.reset();
  };

  return (
    <>
      <img className="w-36 h-auto mt-4 ml-4" alt="dentology" src={Logo} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginTop: 2,
            }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              error={isError.general ? true : false}
              helperText={isError ? errorMsg : null}
              fullWidth
              id="username"
              label="Username"
              name="username"
              onChange={handleChange}
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              error={isError.general ? true : false}
              helperText={isError ? errorMsg : null}
              fullWidth
              name="password"
              label="Password"
              type={showPwd ? `text` : `password`}
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPwd(!showPwd);
                      }}
                    >
                      {showPwd ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </>
  );
}
