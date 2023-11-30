import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    role: "",
    avatar: ""
  });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };
        const { data } = await axios.get("api/v1/me", config);

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          role: data.data.role,
          username: data.data.name,
          email: data.data.email,
          avatar: data.data.avatar
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [localStorage.getItem("token")]); // Include dependency

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {loading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
}
