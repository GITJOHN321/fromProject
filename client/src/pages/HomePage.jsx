import { useAuth } from "../context/AuthContext";
import { useExams } from "../context/ExamContext";
import { useEffect } from "react";
useExams;
function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const { Exams , getExams} = useExams();

  useEffect(() => {
    getExams()
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
            {Exams.map(e => (
              <p>{e.name_exam}</p>
            ))}
          </div>
          <div>
            <h1 className="font-bold text-4xl">Categories: </h1>
          </div>
        </div>
      ) : (
        <div>login</div>
      )}
    </div>
  );
}

export default HomePage;
