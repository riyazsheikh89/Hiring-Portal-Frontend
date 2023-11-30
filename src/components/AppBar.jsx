import "../styles/AppBar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "@emotion/styled";
import {  Button, Drawer } from "@mui/material";
import logo from "../assets/digibox-logo-bluebg.png";
import close from "../assets/close-btn.svg";
import menu from "../assets/menu.svg";
import { UserState } from "../context/UserProvider";


function AppBar() {
  const { userInfo, setUserInfo } = UserState();  // getting from context
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // Button Customization
  const BootstrapButton = styled(Button)({
    margin: "0 15px 0 15px",
    backgroundColor: "#FECB00",
    color: "black",
    "&:hover": {
      backgroundColor: "#F2F8FF",
      color: "black",
    },
  });

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  console.log("userInfo : ", userInfo);
  
  // if the user is loged in then show the logout button
  if (userInfo.username) {
    return (
      <div className="navbar-container">
        <div id="company-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="right-nav-container">
        <div className="profile_image_container">
          <img src={userInfo.avatar} alt="profile-pic" id="profile-pic" />
        </div>
          <h4 id="user_name">{userInfo.username}</h4>
          <BootstrapButton 
            variant="contained" 
            onClick={() => {
              localStorage.setItem("token", null);
              setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                username: "",
                avatar: "",
                email: "",
                role: "",
              }));
              window.location = "/";
            }}
          > Logout </BootstrapButton>
        </div>

        <div className="drawer-menu">
        <div>
          <Button onClick={toggleDrawer}>
            <img id="menu-icon" src={menu} alt="menu" />
          </Button>
          <Drawer anchor="top" open={visible}>
            <img id="menu-close-btn" 
              src={close} 
              alt="close"
              onClick={toggleDrawer} 
            />
            <div id="drawer-items">
              <h2>{userInfo.username}</h2>
              <h3 
              onClick={() => {
                toggleDrawer();
                localStorage.setItem("token", null);
                window.location = "/" ; // go to home/login page
              }}
              >Logout</h3>
            </div>
          </Drawer>
        </div>
      </div>
      </div>
    );
  }


  // if the user is not loged in then show them login and signup button
  return (
    <div className="navbar-container">
      <div id="company-logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="right-nav-container">
        <BootstrapButton 
          variant="contained" 
          onClick={() => navigate("/")}
        > Login </BootstrapButton>
        <BootstrapButton 
          variant="contained" 
          onClick={() => navigate("/signup")}
        > Sign Up </BootstrapButton>
      </div>

      <div className="drawer-menu">
        <div>
          <Button onClick={toggleDrawer}>
            <img id="menu-icon" src={menu} alt="menu" />
          </Button>
          <Drawer anchor="top" open={visible}>
            <img id="menu-close-btn" 
              src={close} 
              alt="close"
              onClick={toggleDrawer} 
            />
            <div id="drawer-items">
              <h3 
              onClick={() => {
                toggleDrawer();
                navigate("/");
              }}
              >Login</h3>
              <h3 
              onClick={() => {
                toggleDrawer();
                navigate("/signup");
              }}
              >Sign Up</h3>
            </div>
          </Drawer>
        </div>
      </div>
      
    </div>
  );
}

export default AppBar;
