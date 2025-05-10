"use strict";

const React = require("react");
const { useState } = React;
const axios = require("axios");
const { 
  Box, 
  TextField, 
  Button,
  Typography,
  InputAdornment,
  Link: MuiLink,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert
} = require("@mui/material");
const { Person, Lock } = require("@mui/icons-material");



export default function Login({ onToggleMode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "PATIENT"
  });
  const [loginStatus, setLoginStatus] = useState({
    show: false,
    success: false,
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    setLoginStatus(prev => ({ ...prev, show: false }));

    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/auth/login',
        data: {
          email: formData.email,
          password: formData.password,
          role: formData.role
        }
      });

      console.log("Login successful:", response.data);
      
      localStorage.setItem("authToken", response.data.jwt);
      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userName", response.data.name);

      setLoginStatus({
        show: true,
        success: true,
        message: "Login successful! Check console for details."
      });

    } catch (error) {
      let errorMessage = "Login failed";
      if (error.response) {
        switch (error.response.status) {
          case 401: errorMessage = "Invalid email or password"; break;
          case 403: errorMessage = "Role permission denied"; break;
          case 404: errorMessage = "User not found"; break;
          default: errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        errorMessage = "No server response";
      } else {
        errorMessage = error.message;
      }
      
      setLoginStatus({
        severity: "error",
        message: errorMessage
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      {loginStatus.show && (
        <Alert severity={loginStatus.success ? "success" : "error"} sx={{ mb: 2 }}>
          {loginStatus.message}
        </Alert>
      )}
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, mt: 2 }}>
        <Typography variant="body2">Password</Typography>
        <MuiLink href="#" variant="body2" color="primary" underline="hover">
          Forgot password?
        </MuiLink>
      </Box>

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
      
      <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
        <FormLabel component="legend" sx={{ mb: 1, color: 'text.primary', fontSize: '0.875rem' }}>
          I am a
        </FormLabel>
        <RadioGroup
          row
          aria-label="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          sx={{ justifyContent: 'space-between' }}
        >
          <FormControlLabel
            value="PATIENT"
            control={<Radio size="small" />}
            label="Patient"
            disabled={isLoading}
          />
          <FormControlLabel
            value="DOCTOR"
            control={<Radio size="small" />}
            label="Doctor"
            disabled={isLoading}
          />
        </RadioGroup>
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          py: 1.5,
          bgcolor: "#00a895",
          "&:hover": {
            bgcolor: "#00806f",
          },
        }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
      </Button>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <MuiLink
            component="button"
            variant="body2"
            onClick={onToggleMode}
            color="primary"
            underline="hover"
            sx={{ fontWeight: "medium" }}
          >
            Sign up
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}

