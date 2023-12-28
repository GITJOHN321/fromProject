import { useEffect, useState, useRef } from "react";
import { useQuestions } from "../context/QuestionContext";
import QuestionCard from "../components/QuestionCard";
import QuestionCreateForm from "../components/QuestionCreateForm";
import ExamForm from "../components/ExamForm";
import { Link } from "react-router-dom";

function ExamPage() {
  const { getQuestions, Questions, setQuestion, Question, Active, updateForm } =
    useQuestions();


  const resetForm = () =>{
    updateForm();
    setQuestion(null)
  }
  
  
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
      <Link
        to={`/create-exam`}
        onClick={() => {
          resetForm()
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Add
      </Link>
      {Active === true && (
        <div className="bg-sky-400 flex  items-center justify-center">
          <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <QuestionCreateForm questions = {Question}></QuestionCreateForm>
          </div>
        </div>
      )}
      {Active === false && null}

      
      <div className="h-screen grid grid-flow-row md:grid-cols-3 gap-4 bg-red-300">
        <div className="row-span-2 col-span-2 md:col-span-1 bg-amber-600 overflow-auto touch-pan-y">
          {Questions.map((question) => (
            <QuestionCard
              question={question}
              key={question.id_question}
            ></QuestionCard>
          ))}
        </div>
        <div className=" row-span-2 col-span-2 bg-green-500">
          <ExamForm></ExamForm>
        </div>
      </div>
    </>
  );
}

export default ExamPage;
