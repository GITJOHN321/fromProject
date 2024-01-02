import { useForm } from "react-hook-form";
import { useExams } from "../context/ExamContext";
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
  const { createExam, insertQuestionExam } = useExams();
  const { Questions, getQuestion, getQuestions, setActive } = useQuestions();

  const navigate = useNavigate();
  const [listQuestions, setListQuestions] = useState([]);
  const [scores, setScores] = useState([0]);
  const [maxScore, setMaxScore] = useState([0]);

  //question listInputs-----------------------------------------------------------
  const removeFields = (index) => {
    let data = [...listQuestions];
    data.splice(index, 1);
    setListQuestions(data);
  };
  const handleFormChange = (index, event) => {
    let data = [...listQuestions];
    data[index][event.target.name] = event.target.value;
    setListQuestions(data);
  };
  //input Scores-----------------------------------------------------------------------
  const maxScores = (score, count) => {
    if (count === 0) setScores(score);
    if (count > 0) {
      setScores(score / count);
    }
    console.log(score + ": " + count);
  };

  const handleScoreChange = (evt) => {
    evt.preventDefault();
    let score = evt.target.value;
    let count = listQuestions.length;
    setMaxScore(score);
    maxScores(score, count);
  };

  //drag on Drop -----------------------------------------------------------------------
  const dragingOver = (evt) => {
    evt.preventDefault();
  };

  const onDrop = async (evt) => {
    evt.preventDefault();
    const itemID = evt.dataTransfer.getData("itemID");
    const item = await getQuestion(parseInt(itemID));
    setListQuestions([...listQuestions, item]);
    setActive(false);
    maxScores(maxScore, listQuestions.length + 1);
  };
  //------------------------------------------------------------------------------------
  const onSubmit = handleSubmit(async (data) => {
    //insertId

    const examid = await createExam(data);
    console.log(listQuestions[0].question_score);
    listQuestions.map(async (question) => {
      if (question.question_score === undefined) {
        question.question_score = 0;
      }
      const data = {
        question_score: Number(question.question_score),
        id_question: Number(question.id_question),
        id_exam: Number(examid.insertId),
      };
      await insertQuestionExam(data);
    });
    getQuestions();
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
                min="0"
                {...register("available_time", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="00"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="max_score">Nota Maxima</label>
              <input
                type="number"
                min="0"
                {...register("max_score", { required: true })}
                onChange={(event) => handleScoreChange(event)}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="00"
              />
            </div>

            <label htmlFor="max_score">Nota Maxima</label>
          </div>

          <button
            className="bg-fuchsia-800 hover:bg-fuchsia-900 text-white px-4 py-2 rounded-md"
            type="submit"
          >
            Save Exam
          </button>
        </form>
        <div
          droppable="true"
          onDragOver={(evt) => dragingOver(evt)}
          onDrop={(evt) => onDrop(evt, Questions)}
        >
          {listQuestions.length < 1 && <h1>DRAG AND DROP</h1>}
          {listQuestions.map((question, index) => (
            <div key={index}>
              <div className="flex flex-row items-center">
                <h1 className="block text-2xl w-full font-bold  my-4 basis-1/8">
                  Pregunta {index + 1}
                </h1>
                <input
                  className=" border-2 bg-zinc-800 border-fuchsia-600 hover:border-fuchsia-700 text-white px-4 text-center rounded-md my-2 basis-1/25 w-16 h-9"
                  type="text"
                  min="0"
                  name="question_score"
                  value={scores}
                  onChange={(event) => handleFormChange(index, event)}
                  required
                  disabled
                />
                <button className="text-white px-4 py-2 rounded-md basis-1/25">
                  <svg
                    className="h-10  text-fuchsia-600 hover:text-fuchsia-700"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFields(index);
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="rounded"
                    strokeLinejoin="rounded"
                  >
                    {" "}
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    />{" "}
                    <line x1="9" y1="9" x2="15" y2="15" />{" "}
                    <line x1="15" y1="9" x2="9" y2="15" />
                  </svg>
                </button>
              </div>

              <QuestionCreateForm
                questions={question}
                enable={true}
              ></QuestionCreateForm>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExamForm;
