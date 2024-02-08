
import { FaCheck } from "react-icons/fa";

function QuestionExamCard({ question, index }) {
 
  return (
    <div className=""> 
      <h1 className="text-xl font-bold">
        {question.title}
      </h1>
      <p className="py-2 font-medium" dangerouslySetInnerHTML={{ __html: question.body }}></p>
      <h1 className="py-2 text-xl font-bold">Respuestas: </h1>
      <ul className="pt-2 pb-4">
        {question.list_answers.map((e, i) => (
          <li key={i} className="flex items-center"><strong>{i+1}. </strong> {e.body_answer}&nbsp;{e.done ? <FaCheck fill="#007cc4"/> : null}</li>
        ))}
      </ul>

      
    </div>
  );
}

export default QuestionExamCard;
