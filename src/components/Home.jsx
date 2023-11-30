import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/og-logo.svg";
import axios from "axios";
import { UserState } from "../context/UserProvider";



export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { userInfo, setUserInfo } = UserState();  // getting from context

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    if (userInfo.role) {
      if (userInfo.role == "recruiter") {
        navigate("/candidate-list");
      } else {
        navigate("/candidate");
      }
    }
  }, [navigate, userInfo.role]);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  }

  // Handle Form Submission
  const handleSubmit = async () => {
    if (!email || !role || !password) {
      setError(true);
    } else {
      setError(false);
      try {
        const route = (role=="candidate") ? "candidate-login" :"recruiter-login";
        let lowercaseEmail = email.toLocaleLowerCase();
        const { data } = await axios.post(`/api/v1/${route}`, 
          { email: lowercaseEmail, password },
          { headers: { "Content-type": "Application/json" } }
        );
        if (data.success === false) {
          throw data.err;
        }

        localStorage.setItem("token", data.data);
        setUserInfo(prevUserInfo => ({
          ...prevUserInfo,
          username: data.user.name,
          avatar: data.user.avatar,
          email: data.user.email,
          role: role
        }));

        // after login redirect according to role
        if (role === "candidate") {
          navigate("/candidate");
        } else {
          navigate("/candidate-list");
        }
      } catch (error) {
        if (error.name === "AxiosError") {
          alert(error.response.data.err.message);
        } else {
          alert(error);
        }
      }
    }
  };

  // user roles for dropdown
  const userRoles = [
    {
      value: 'recruiter',
      label: 'Recruiter',
    },
    {
      value: 'candidate',
      label: 'Candidate',
    }
  ]

  // if loading is true, show a loader
  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }


  return (
    <div className="container">
      <div className='left-container'>
        <img src={logo} alt="logo" style={{ height: "100%", width: "100%" }} />
      </div>

      <div className='right-container'>
        <div id='heading'>
          <h1>Login</h1>
        </div>

        <form action="">
          <TextField
            label="Select Your Role"
            select
            fullWidth
            required
            margin="dense"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {userRoles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="user-email"
            label="Email"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Field with hide/show icon */}
          <FormControl
            variant="outlined"
            fullWidth
            required
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {error && <p id="error"> *Please fill all the input fields </p> }

          <Button
            variant="contained"
            fullWidth
            size="large"
            style={{marginTop: "10px"}}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>

        <div className="signup-footer">
          <p> Don&apos;t have an account? &nbsp;
            <b> <a onClick={() => navigate("/signup")}>Sign Up</a> </b>
          </p>
        </div>
      </div>

    </div>
  );
}
