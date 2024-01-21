import { Link } from "react-router-dom";
import { useQuestions } from "../context/QuestionContext";
function QuestionExamCard({ question, index }) {
  const {updateForm, setQuestion } = useQuestions();
  const sendEdit = (question) => {
    updateForm();
    setQuestion(question);
  };
  return (
    <div>
      <h1 className="text-xl font-bold">
        {question.title}
      </h1>
      <p className="py-2 font-medium" dangerouslySetInnerHTML={{ __html: question.body }}></p>
      <h1 className="py-2 text-xl font-bold">Respuestas: </h1>
      <ul className="pt-2 pb-4">
        {question.list_answers.map((e, i) => (
          <li key={i}><strong>{i+1}.</strong> {e.body_answer}</li>
        ))}
      </ul>

      <Link
        onClick={() => {
          sendEdit(question);
        }}
        className="bg-sky-600  hover:bg-sky-700 text-white px-4 py-2 rounded-md"
      >
        Edit
      </Link>
    </div>
  );
}

export default QuestionExamCard;
