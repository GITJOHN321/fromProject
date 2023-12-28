import { useQuestions } from "../context/QuestionContext";
import { Link } from "react-router-dom";
function QuestionCard({ question }) {
  const { deleteQuestion, updateForm ,setQuestion} = useQuestions();
  
  const startDrag = (evt, item) => {
    evt.dataTransfer.setData("itemID", item.id_question);
    console.log(item);
  };

  const sendEdit = (question) =>{
    updateForm();
    setQuestion(question)
  }
  return (
    <div
      draggable
      onDragStart={(evt) => startDrag(evt, question)}
      className=" bg-zinc-800  w-full px-5 py-8 rounded-md"
    >
      <header className="flex flex-nowrap justify-between">
        <h1 className="text-2xl font-bold px-1">{question.title}</h1>

        <div className="flex flex-nowrap gap-x-1 items-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => {
              console.log(question.id_question);
              deleteQuestion(question.id_question);
            }}
          >
            Delete
          </button>
          <Link
            
            onClick={() => {
              sendEdit(question)
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Edit
          </Link>
        </div>
      </header>
      <p
        className="text-slate-300"
        dangerouslySetInnerHTML={{ __html: question.body }}
      ></p>
      <p>{new Date(question.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default QuestionCard;
