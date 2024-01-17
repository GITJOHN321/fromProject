import { useQuestions } from "../context/QuestionContext";
import { Link } from "react-router-dom";
import SubcategoryTag from "./SubcategoryTag";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
function QuestionCard({ question }) {
  const { deleteQuestion, updateForm, setQuestion } = useQuestions();

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData("itemID", item.id_question);
   // console.log(item);
   //evt.dataTransfer.setData("itemID", JSON.stringify(item));
  };

  const sendEdit = (question) => {
    updateForm();
    setQuestion(question);
  };
 
  
  return (
    <div
      draggable
      onDragStart={(evt) => startDrag(evt, question)}
      className=" bg-slate-100 border-2 border-slate-200  w-full px-5 py-5 rounded-md cursor-grab shadow-lg"
    >
      <header className="flex flex-nowrap justify-between">
        <h1 className="  text-2xl font-bold text-nowrap pb-2">
          {question.title}
        </h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center pr-2">
          <p
            className="text-ellipsis overflow-hidden text-nowrap"
            dangerouslySetInnerHTML={{ __html: question.body }}
          ></p>
        </div>

        <div>
          <div className="flex flex-nowrap gap-x-1 items-center">
            <Link
              onClick={() => {
                sendEdit(question);
              }}
              className="border-2 border-sky-800 bg-sky-600  hover:bg-sky-500 text-white py-2 px-2.5 rounded-md"
            >
              <FaEdit />
            </Link>
            <button
              className="border-2 border-sky-800 bg-sky-100 hover:bg-sky-200 hover:border-sky-900 text-sky-900 py-2 px-2.5 rounded-md"
              onClick={() => {
                console.log(question.id_question);
                deleteQuestion(question.id_question);
              }}
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
      </div>
      <div className="md:grid lg:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-2">
        {question.subcategories.map((sub) => (
          <SubcategoryTag
            key={sub.id_subcategory}
            name={sub.name_subcategory}
          ></SubcategoryTag>
        ))}
      </div>
      <p>{new Date(question.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default QuestionCard;
