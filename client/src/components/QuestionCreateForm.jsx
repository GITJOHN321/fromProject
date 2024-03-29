import { useForm } from "react-hook-form";
import { useQuestions } from "../context/QuestionContext";
import { useEffect, useState } from "react";
import { useCategories } from "../context/CategoryContext";
import SubcategoryTag from "./SubcategoryTag";
import Dropdown from "./Dropdown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useExams } from "../context/ExamContext";

function QuestionCreateForm({ questions }) {
  const { listQuestions, setListQuestions } = useExams();
  const { register, handleSubmit, setValue } = useForm();
  const {
    updateQuestion,
    getQuestions,
    setActive,
    createQuestionWithAnswer,
    Questions,
  } = useQuestions();

  const {
    getCategories,
    categories,
    listSubCategories,
    setListSubCategories,
    subcategories,
    subcategoriesQuestion,
  } = useCategories();

  const removeSubcategories = (index) => {
    let data = [...listSubCategories];
    data.splice(index, 1);
    setListSubCategories(data);
  };

  //dinamic InputFields--------------------------------
  const [inputFields, setInputFields] = useState([
    { body_answer: "", done: false },
  ]);
  const [description, setDescription] = useState("");

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const addFields = (e) => {
    e.preventDefault();
    let newfield = { body_answer: "", done: false };
    setInputFields([...inputFields, newfield]);
  };
  const removeFields = (index) => {
    if (index > 0) {
      let data = [...inputFields];
      data.splice(index, 1);
      setInputFields(data);
    }
  };
  //Checkbox control------------------------------------

  const onCheck = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.checked;
    setInputFields(data);
  };
  //----------------------------------------------------
  useEffect(() => {
    async function loadQuestion() {
      if (questions != null) {
        setValue("title", questions.title);
        setDescription(questions.body);
        setListSubCategories(questions.subcategories);
        setInputFields(questions.list_answers);
      } else {
        setListSubCategories([]);
      }
      await getCategories();
    }

    loadQuestion();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const question_data = {
      title: data.title,
      body: description,
      list_answers: inputFields,
    };

    //validate description is empty with regex-----------
    const regex = /^\s*$/;
    if (regex.test(description) || listSubCategories.length <= 0) {
      console.log(false);
      return;
    } else {
      if (questions) {
        const id = questions.id_question;
        await updateQuestion(id, question_data);
        await subcategoriesQuestion(listSubCategories, id);
        setActive(false);
      } else {
        const idQuestion = await createQuestionWithAnswer(question_data);
        await subcategoriesQuestion(listSubCategories, idQuestion.insertId);
      }
    }

    setActive(false);
    const a = await getQuestions();

    if (questions) {
      const indice = listQuestions.findIndex(
        (elemento) => elemento.id_question === questions.id_question
      );
      if (indice !== -1) {
        const b = a.find((e) => e.id_question === questions.id_question);
        const list = [...listQuestions];
        list.splice(indice, 1, b);
        setListQuestions(list);
      }
    }
  });
  return (
    <div className="bg-slate-100 rounded-lg  ">
      {!questions && (
        <h1 className="head px-10 font-bold text-2xl">New Question</h1>
      )}
      <form className="px-10" onSubmit={onSubmit}>
        <label className="text-lg" htmlFor="title">
          Title:
        </label>
        <input
          placeholder="title"
          type="text"
          {...register("title")}
          className="w-full input px-4 py-2 rounded-md my-2"
          autoFocus
          required
        />

        <label htmlFor="body">Description</label>
        <div className="relative border-2 ">
          <ReactQuill
            theme="snow"
            name="body"
            value={description}
            onChange={setDescription}
            placeholder="Write a Description please..."
          ></ReactQuill>
        </div>

        <label>Answers</label>
        {inputFields.map((inputField, index) => (
          <div key={index} className="relative w-full ">
            <input
              className="block w-full input px-4 py-2 rounded-md my-2"
              type="text"
              name="body_answer"
              value={inputField.body_answer}
              onChange={(event) => handleFormChange(index, event)}
              required
            />
            <input
              type="checkbox"
              className="z-10 absolute top-0  h-full"
              onChange={(e) => onCheck(index, e)}
              checked={inputField.done}
              name="done"
              id=""
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                removeFields(index);
              }}
              className="absolute top-0 end-11 px-2.5 h-full text-sm font-medium border-2 border-sky-800 bg-sky-100 hover:bg-sky-200 hover:border-sky-900 text-sky-900"
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
              className="absolute top-0 end-0 px-2.5 h-full font-medium   rounded-e-lg  border-2 border-sky-800 bg-sky-600  hover:bg-sky-500 text-white "
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

        <div className="grid grid-cols-2">
          <div className="col col-span1">
            <Dropdown list={categories} name={"category"}></Dropdown>
          </div>
          <div className="col col-span1">
            <Dropdown list={subcategories} name={"subcategory"}></Dropdown>
          </div>
        </div>
        <div className="py-2">
          <h1 className="text-xl font-bold pb-2">Subcategories:</h1>
          <div className="grid grid-cols-4">
            {listSubCategories.map((e, index) => (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  removeSubcategories(index);
                }}
                key={e.id_subcategory}
                className="flex text-center"
              >
                <SubcategoryTag name={e.name_subcategory}></SubcategoryTag>
              </span>
            ))}
          </div>
        </div>
        <button className="bg-sky-600  hover:bg-sky-500 text-white px-4 py-2 rounded-md">
          {questions ? "Update Question" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default QuestionCreateForm;
