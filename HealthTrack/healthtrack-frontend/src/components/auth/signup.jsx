"use client"

import { useState } from "react"
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Link as MuiLink,
  CircularProgress,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  MenuItem,
  Collapse,
} from "@mui/material"
import { Person, Email, Lock, Phone, CalendarMonth, MedicalServices } from "@mui/icons-material"

export default function Signup({ onToggleMode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState("PATIENT")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Here you would typically:
      // 1. Call your registration API
      // 2. Store the token/user data
      // 3. Redirect to dashboard or onboarding

      const formData = new FormData(e.target)
      const data = Object.fromEntries(formData.entries())
      console.log("Signup submitted:", data)
    } catch (error) {
      console.error("Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Full Name"
        name="name"
        autoComplete="name"
        autoFocus
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="phone"
        label="Phone Number"
        id="phone"
        autoComplete="tel"
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Phone />
            </InputAdornment>
          ),
        }}
      />

      <FormControl component="fieldset" margin="normal" fullWidth>
        <FormLabel component="legend">I am a:</FormLabel>
        <MuiRadioGroup row name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <FormControlLabel value="PATIENT" control={<Radio />} label="Patient" />
          <FormControlLabel value="DOCTOR" control={<Radio />} label="Doctor" />
        </MuiRadioGroup>
      </FormControl>

      {/* Conditional fields based on role */}
      <Collapse in={role === "PATIENT"} timeout="auto" sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            animation: "fadeIn 0.3s ease-in-out",
            "@keyframes fadeIn": {
              from: {
                opacity: 0,
                transform: "translateY(10px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <TextField
            required={role === "PATIENT"}
            fullWidth
            id="dob"
            label="Date of Birth"
            name="dob"
            type="date"
            disabled={isLoading}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonth />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            required={role === "PATIENT"}
            fullWidth
            id="condition"
            label="Chronic Condition"
            name="condition"
            disabled={isLoading}
          >
            <MenuItem value="">Select your condition</MenuItem>
            <MenuItem value="DIABETES">Diabetes</MenuItem>
            <MenuItem value="HYPERTENSION">Hypertension</MenuItem>
            <MenuItem value="ASTHMA">Asthma</MenuItem>
            <MenuItem value="COPD">COPD</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
          </TextField>
        </Box>
      </Collapse>

      <Collapse in={role === "DOCTOR"} timeout="auto" sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            animation: "fadeIn 0.3s ease-in-out",
            "@keyframes fadeIn": {
              from: {
                opacity: 0,
                transform: "translateY(10px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <TextField
            required={role === "DOCTOR"}
            fullWidth
            id="license"
            label="Medical License Number"
            name="license"
            placeholder="Enter your license number"
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MedicalServices />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            required={role === "DOCTOR"}
            fullWidth
            id="specialization"
            label="Specialization"
            name="specialization"
            placeholder="Enter your specialization"
            disabled={isLoading}
          />
        </Box>
      </Collapse>

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
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
      </Button>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <MuiLink
            component="button"
            variant="body2"
            onClick={onToggleMode}
            color="primary"
            underline="hover"
            sx={{ fontWeight: "medium" }}
          >
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  )
}

