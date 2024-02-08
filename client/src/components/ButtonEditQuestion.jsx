import { Link } from "react-router-dom";
import { useQuestions } from "../context/QuestionContext";
function ButtonEditQuestion() {
  const { updateForm, setQuestion } = useQuestions();
  const sendEdit = (question) => {

  };
  return (
    <Link
      onClick={() => {
        sendEdit(question);
      }}
      className="bg-sky-600  hover:bg-sky-700 text-white px-4 py-2 rounded-md"
    >
      Edit
    </Link>
  );
}

export default ButtonEditQuestion;
