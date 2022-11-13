import React, { useContext } from "react";
import Profile from "./Profile";
import { UserContext } from "../context/UserContext";
import { UserIdContext } from "../context/UserIdContext";

const Header = () => {
  const [token, setToken] = useContext(UserContext)
  const [userId,setUserId] = useContext(UserIdContext)

  const handleLogout = () => {
    setToken(null)
    setUserId(null)
  };

  return (
    <nav className="navbar  p-2 is-primary">
     
      <div className="navbar-end">
        <div className="nav-item">
        {token && (
        <button className="button is-info" onClick={handleLogout}>
          Logout
        </button>
      )}
        </div>
        </div>
      
      
     
    </nav>
  );
};

export default Header;
