import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="nav flex justify-between py-5 px-20 md:px-30 xl:px-60 transition duration-300">
      <h1 className="text-2xl font-bold hover:text-sky-500">
        <Link to="/">Questionnaire</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="hover:text-sky-500">
            <Link to="/">Welcome <b>{user.username}</b></Link>
              
            </li>
            <li className="hover:text-sky-500">
              <Link to="/create-exam">Exam</Link>
            </li>
            
            <li className="hover:text-sky-500">
              <Link to="/" onClick={()=>{logout()}}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li className="hover:text-sky-500">
              <Link to="/login">Login</Link>
            </li>
            <li className="hover:text-sky-500">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;