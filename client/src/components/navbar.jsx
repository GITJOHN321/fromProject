import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="bg-zinc-700 flex justify-between py-5 px-10">
      <h1 className="text-2xl font-bold">
        <Link to="/">Questionnaire</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Welcome <b>{user.username}</b>
            </li>
            <li>
              <Link to="/create-exam">Exam</Link>
            </li>
            
            <li>
              <Link to="/" onClick={()=>{logout()}}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;