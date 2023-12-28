import { useForm } from "react-hook-form";
import { useExams } from "../context/examContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuestions } from "../context/QuestionContext";
import QuestionCreateForm from "../components/QuestionCreateForm";

function ExamForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createExam } = useExams();
  const { Questions, getQuestion } = useQuestions();
  const navigate = useNavigate();
  const [listQuestions, setListQuestions] = useState([]);

  const dragingOver = (evt) => {
    evt.preventDefault();
  };

  const onDrop = async (evt) => {
    evt.preventDefault();
    const itemID = evt.dataTransfer.getData("itemID");
    const item = await getQuestion(parseInt(itemID));
    setListQuestions([...listQuestions, item]);
  };

  const onSubmit = handleSubmit((data) => {
    //createExam(data);
   console.log(data)
  
  });

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">Encabezado de Examen</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("name_exam", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Title Exam"
          />

          <input
            type="text"
            {...register("body_exam", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Description..."
          />
          <div className=" grid grid-flow-row sm:grid-cols-2 gap-4 ">
            <div className="col-span-1">
              <label htmlFor="available_time">Tiempo Maximo (Minutos)</label>
              <input
                type="number"
                {...register("available_time", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="00"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="max_score">Nota Maxima</label>
              <input
                type="number"
                {...register("max_score", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="00"
              />
            </div>
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" type="submit"> Save Exam </button>
        </form>
        <div
          droppable="true"
          onDragOver={(evt) => dragingOver(evt)}
          onDrop={(evt) => onDrop(evt, Questions)}
        >
          {listQuestions.length<1 && (<h1>DRAG AND DROP</h1>)}
          {listQuestions.map((question, index) => (
            <div key={index}>
              <h1 className="font-bold bg-slate-500 my-4">Pregunta {index + 1}</h1>
              <QuestionCreateForm questions={question} enable = {true}></QuestionCreateForm>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExamForm;
