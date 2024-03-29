import { useEffect, useState } from "react";
import { useQuestions } from "../context/QuestionContext";
import QuestionCard from "../components/QuestionCard";
import QuestionCreateForm from "../components/QuestionCreateForm";
import CategoryForm from "../components/CategoryForm";
import ExamForm from "../components/ExamForm";
import { Link } from "react-router-dom";

function ExamPage() {
  const {
    getQuestions,
    Questions,
    setQuestion,
    Question,
    Active,
    updateForm,
    setActive,
  } = useQuestions();

  const [CategoryActive, setCategoryActive] = useState(false);

  const resetCategory = () => {
    setActive(false);
    setCategoryActive(!CategoryActive);
  };

  const resetForm = () => {
    setCategoryActive(false);
    updateForm();
    setQuestion(null);
  };

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
      <Link
        to={`/create-exam`}
        onClick={() => {
          resetForm();
        }}
        className="bg-sky-600 border-2  hover:bg-sky-700 text-white px-4 py-2 rounded-md"
      >
        Add
      </Link>
      <Link
        to={`/create-exam`}
        onClick={() => {
          resetCategory();
        }}
        className="bg-sky-600 border-2  hover:bg-sky-700 text-white px-4 py-2 rounded-md"
      >
        Add Category
      </Link>
      {Active === true && (
        <div className=" flex  items-center justify-center">
          <div className="py-8 my-2 bg-slate-100 rounded-lg">
            <QuestionCreateForm questions={Question}></QuestionCreateForm>
          </div>
        </div>
      )}
      {Active === false && null}

      {CategoryActive === true && Active === false && (
        <div className=" flex  items-center justify-center">
          <div className="py-8 my-2 bg-slate-100 rounded-lg">
            <CategoryForm></CategoryForm>
          </div>
        </div>
      )}

      <div className="h-screen grid grid-flow-row md:grid-cols-3 gap-4 ">
        <div className="row-span-2 col-span-2 md:col-span-1  overflow-auto touch-pan-y">
          {Questions.map((question) => (
            <QuestionCard
              question={question}
              key={question.id_question}
            ></QuestionCard>
          ))}
          {Questions.length < 1 && (
            <div className="px-10 py-5 ">
              <Link
                to={`/create-exam`}
                onClick={() => {
                  resetCategory();
                }}
              >
                <div className="bg-blue-200 py-5 rounded-lg border-4 border-dashed border-sky-800 text-center text-sky-500 transition hover:scale-105 duration-300 w-full">
                  ADD CATEGORY FOR CREATE A QUESTION
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className=" row-span-2 col-span-2 ">
          <ExamForm></ExamForm>
        </div>
      </div>
      
    </>
  );
}

export default ExamPage;
