import { useForm } from "react-hook-form";
import { useQuestions } from "../context/QuestionContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function QuestionCreateForm({ questions, enable }) {
  const { register, handleSubmit, setValue } = useForm();
  const {
    createQuestion,
    getQuestion,
    updateQuestion,
    getQuestions,
    setActive,
    refreshListAnswer,
  } = useQuestions();
  const navigate = useNavigate();
  const params = useParams();

  //dinamic InputFields--------------------------------
  const [inputFields, setInputFields] = useState([
    { body_answer: "", done: 0 },
  ]);
  const [description, setDescription] = useState("");

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const addFields = (e) => {
    e.preventDefault();
    let newfield = { body_answer: "", done: 0 };
    setInputFields([...inputFields, newfield]);
  };
  const removeFields = (index) => {
    if (index > 0) {
      let data = [...inputFields];
      data.splice(index, 1);
      setInputFields(data);
    }
  };
  //----------------------------------------------------

  useEffect(() => {
    async function loadQuestion() {
      if (questions != null) {
        let list = [];
        const id = questions.id_question;
        const question = await getQuestion(id);

        setValue("title", question.title);
        setDescription(question.body);
        question.answers.map((answer) => {
          list.push({ body_answer: answer.body_answer });
        });
        setInputFields(list);
      }
    }

    loadQuestion();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (questions) {
      const id = questions.id_question;
      //function update question
      async function updateQuestionAndAnswers() {
        const question_data = {
          title: data.title,
          body: description,
        };
        updateQuestion(id, question_data);

        //controller List inputs answers --------------------------------------------

        refreshListAnswer(inputFields, id);

        //----------------------------------------------------------------------
      }
      updateQuestionAndAnswers();
      setActive(false);
      getQuestions();
    } else {
      const regex = /^\s*$/;
      if (regex.test(description)) {
        console.log(false);
        return;
      } else {
        const question_data = {
          title: data.title,
          body: description,
        };
        const idQuestion = await createQuestion(question_data);
        refreshListAnswer(inputFields, idQuestion.insertId);
      }
    }

    setActive(false);
    await getQuestions();
  });
  return (
    <div className="bg-zinc-800  ">
      {!questions && <h1 className="my-2">New Question</h1>}
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          placeholder="title"
          type="text"
          {...register("title")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
          required
        />

        <label htmlFor="body">Description</label>
        <ReactQuill
          theme="snow"
          name="body"
          value={description}
          onChange={setDescription}
          placeholder="Write a Description please..."
        ></ReactQuill>

        <label>Answers</label>
        {inputFields.map((inputField, index) => (
          <div key={index} className="relative w-full">
            <input
              className="block w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="text"
              name="body_answer"
              value={inputField.body_answer}
              onChange={(event) => handleFormChange(index, event)}
              required
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                removeFields(index);
              }}
              className="absolute top-0 end-11 p-2.5 h-full text-sm font-medium text-white bg-blue-700  hover:bg-blue-800  dark:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 12H6"
                />
              </svg>
            </button>
            <button
              onClick={addFields}
              className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-red-700 rounded-e-lg  hover:bg-red-800  dark:bg-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </button>
          </div>
        ))}
        {enable === true ? <button></button> : <button>Save</button>}
      </form>
    </div>
  );
}

export default QuestionCreateForm;
