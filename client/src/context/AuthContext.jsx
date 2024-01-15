import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const resetErrors = () =>{
    setErrors([])
  }

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      return res.data
      //setUser(res.data);
      //setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);

      setIsAuthenticated(true);
      //console.log(res, isAuthenticated);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const logout = () =>{
    Cookies.remove("token") 
    setIsAuthenticated(false)
    setUser(null)
  }
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);

        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }
        setIsAuthenticated(true)
        setLoading(false)
        setUser(res.data)
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, loading, logout, user, isAuthenticated, errors, resetErrors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
