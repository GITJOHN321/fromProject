import { useAuth } from "../context/AuthContext";
import { useExams } from "../context/ExamContext";
import { useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import {Link} from "react-router-dom"
useExams;
function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const { Exams, getExams } = useExams();

  useEffect(() => {
    getExams();
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div className="container bg-slate-100">
          <h1 className="font-bold text-4xl">Profile</h1>
          <h3>username: </h3>
          <strong className="uppercase">{user.username}</strong>
          <h3>email: </h3>
          <strong className="">{user.email}</strong>

          <div>
            <h1 className="font-bold text-4xl">Exams: </h1>
            {Exams.map((e) => (
              <p>{e.name_exam}</p>
            ))}
          </div>
          <div>
            <h1 className="font-bold text-4xl">Categories: </h1>
          </div>
        </div>
      ) : (
        
        <div className="bg-slate-100 lg:w-1/2 mx-auto py-10 mt-2 rounded-lg shadow-lg transition duration-300">
          <h1 className="head px-10">WELCOME TO QUESTIONNAIRE</h1>
          <div className="px-10">
          <p>Project to create forms, made with:</p>
          <ul className="pb-4">
            <li className="flex items-center">
            <FaAngleRight fill="#007cc4"/>React Js and Tailwind css as main libraries in the front-end.
            </li>
            <li className="flex items-center"><FaAngleRight fill="#007cc4"/>Node Js and Express as main libraries for the back-end.</li>
            <li className="flex items-center"><FaAngleRight fill="#007cc4"/>MYSQL as a database manager.</li>
          </ul>
          <Link to="/register" className="bg-sky-600 hover:bg-sky-500 p-2 rounded-md text-white ">GET STARTED</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
