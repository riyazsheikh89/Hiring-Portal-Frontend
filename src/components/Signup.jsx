import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import logo from "../assets/og-logo.svg";
import "../styles/Signup.css";
import { UserState } from '../context/UserProvider';


// Input fields will be validated upon this schema
const signupSchema = yup.object({
  name: yup
    .string()
    .min(2)
    .max(30)
    .required('Please enter your name'),
  email: yup
    .string()
    .email()
    .required('Please enter your email'),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
    .required('Please enter your password'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  role: yup
    .string()
    .required("Please choose your role"),
});


function Signup() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { userInfo } = UserState();  // getting from context
  const navigate = useNavigate();


  useEffect(() => {
    // if the user is already loggedin
    if (userInfo.username) {
      console.log(userInfo);
      if (userInfo.role === "candidate") {
        navigate("/candidate");
      } else {
        navigate("/candidate-list");
      }   
    }
  }, [navigate, userInfo]);
  

  // Initial value of input fields
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signupSchema,
      validateOnChange: true,
      validateOnBlur: true,

      onSubmit: async (values, action) => {
        try {
          const { confirmPassword, ...otherProps } = values;
          otherProps.email = otherProps.email.toLocaleLowerCase();
          otherProps.avatar = avatar;
          const formData = new FormData();
          for (const key in otherProps) {
              formData.append(key, otherProps[key]);
          }
          const route = values.role === "candidate" ? "candidate-signup" : "recruiter-signup";
          const response = await axios.post(`/api/v1/${route}`, formData);
          console.log(response);
          action.resetForm(); // clears input fields
          navigate("/");
        } catch (error) {
          console.log(error);
          alert(error.response.data.err);
        }
      },
    });

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  }
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

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

  return (
    <div className="signup__container">
      <div className="signup_left_container">
        <img src={logo} alt="logo" style={{ height: "100%", width: "100%" }} />
      </div>

      <div className="signup_right_container">
        <div id="signup-heading">
          <h1>Sign up</h1>
        </div>
        <form>
          <TextField
            name="name"
            value={values.name}
            label="Name"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name ? <p id="err">{errors.name}</p> : null}

          <TextField
            name="email"
            value={values.email}
            label="Email"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? (
            <p id="err">{errors.email}</p>
          ) : null}

          {/* Password Field with hide/show icon */}
          <FormControl
            fullWidth
            variant="outlined"
            required
            margin="dense"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              value={values.password}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {touched.password && errors.password ? (
            <p id="err">{errors.password}</p>
          ) : null}

          <FormControl
            fullWidth
            variant="outlined"
            required
            margin="dense"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              name="confirmPassword"
              value={values.confirmPassword}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
          {touched.confirmPassword && errors.confirmPassword ? (
            <p id="err">{errors.confirmPassword}</p>
          ) : null}

          <TextField
            name="role"
            select
            label="Who you are?"
            value={values.role}
            required
            fullWidth
            margin="dense"
            onChange={handleChange}
          >
            {userRoles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {touched.role && errors.role ? <p id="err">{errors.role}</p> : null}

          {/* avatr image */}
          <div style={{display: 'flex', paddingTop: "5px"}} >
            <input type="file" accept='image/*' onChange={handleAvatarChange}/>
          </div>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            size="large"
            style={{ marginTop: "15px" }}
            onClick={handleSubmit}
          > 
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
