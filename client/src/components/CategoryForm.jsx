import { useForm } from "react-hook-form";
import { useCategories } from "../context/CategoryContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuestions } from "../context/QuestionContext";

function CategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createCategory, refreshListSubcategories } = useCategories();

  //dinamic InputFields--------------------------------
  const [inputFields, setInputFields] = useState([{ name_subcategory: "" }]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const addFields = (e) => {
    e.preventDefault();
    let newfield = { name_subcategory: "" };
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

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    console.log(inputFields);
    //createCategory(data);


      const idCategory = await createCategory(data);
      await refreshListSubcategories(idCategory.insertId,inputFields);

  });
  return (
    <div className="flex items-center justify-center">
      <div className="bg-slate-100 rounded-lg ">
      <h1 className="head px-10 mb-5 font-bold text-2xl">New Question</h1>
        <form className="px-10" onSubmit={onSubmit}>
          <input
            type="text"
            {...register("name_category", { required: true })}
            className="w-full input px-4 py-2 rounded-md my-2"
            placeholder="Name Category"
          />
          <label className="text-xl font-bold" htmlFor="">Subcategories:</label>
          {inputFields.map((inputField, index) => (
            <div key={index} className="relative w-full">
              <input
                className="block w-full input px-4 py-2 rounded-md my-2"
                type="text"
                name="name_subcategory"
                value={inputField.name_subcategory}
                onChange={(event) => handleFormChange(index, event)}
                placeholder="subcategory"
                required
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
                className="absolute top-0 end-0 px-2.5 h-full font-medium   rounded-e-lg  border-2 border-sky-800 bg-sky-600  hover:bg-sky-500 text-white"
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
          <button
            className="bg-sky-600  hover:bg-sky-500 text-white px-4 mt-3 py-2 rounded-md"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
