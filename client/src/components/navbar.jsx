import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import { LuBookMarked, LuBookPlus } from "react-icons/lu";
import { TbCategory } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  let menuRef = useRef();
  const onsubmit = (evt) => {
    evt.preventDefault();
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    if(isAuthenticated){
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
  
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  }, []);

  return (
    <nav className="nav flex justify-between py-5 px-20 md:px-30 xl:px-60 transition duration-300">
      <h1 className="text-2xl font-bold hover:text-sky-500">
        <Link to="/">Questionnaire</Link>
      </h1>
      <ul className="flex items-center gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="hover:text-sky-500">
              <Link to="/">
                Welcome <b>{user.username}</b>
              </Link>
            </li>

            <div className="relative flex flex-col items-center" ref={menuRef}>
              <button
                onClick={(e) => onsubmit(e)}
                className="bg-[#001336] hover:text-sky-300 border-2 flex hover:border-sky-500  px-4 py-2  rounded-md w-full"
              >
                <IoMdMenu />
              </button>

              <ul className={`Dropdown-menu ${isOpen ? "active" : "inactive"}`}>
                <DropdownItem
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  favicon={<LuBookMarked />}
                  url={"/"}
                  text={"Examenes"}
                />
                <DropdownItem
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  url={"/profile"}
                  text={"Mi Perfil"}
                  favicon={<FaRegUserCircle />}
                />
                <DropdownItem
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  favicon={<TbCategory />}
                  url={"/"}
                  text={"Categorias"}
                />
                <DropdownItem
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  favicon={<LuBookPlus />}
                  url={"/create-exam"}
                  text={"Nuevo Examen"}
                />
                <br />
                <DropdownItem
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  favicon={<MdLogout />}
                  url={"/"}
                  text={"Logout"}
                />
              </ul>
            </div>
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

function DropdownItem(props) {
  return (
    
      <Link onClick={props.onClick}  to={props.url}>
        <li className="Dropdown-item">
        {props.favicon}&nbsp;{props.text}
        </li>
      </Link>
   
  );
}
