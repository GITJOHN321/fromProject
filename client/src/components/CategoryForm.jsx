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

  const {
    createCategory,
    categoryErrors,
    getSubcategories,
    resetErrors,
    createSubcategory,
    deleteSubcategory,
  } = useCategories();

  const [activeForm, setActiveForm] = useState(false);
  const [id, setId] = useState(0);
  const [list, setList] = useState([]);

  const removeFields = (index) => {

      let data = [...list];
      data.splice(index, 1);
      setList(data);
    
  };

  useEffect(() => {
    resetErrors();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!activeForm) {
      const idCategory = await createCategory(data);

      if (idCategory) {
        setId(idCategory.insertId);
        console.log(idCategory);
        setActiveForm(true);
        resetErrors();
      }
    } else {
      await createSubcategory(data.name_subcategory, id);
      const subs = await getSubcategories(id);
      setList(subs);
    }
  });
  return (
    <div className="flex items-center justify-center">
      <div className="bg-slate-100 rounded-lg ">
        <h1 className="head px-10 mb-5 font-bold text-2xl">
          {!activeForm ? "New Category" : "New Subcategory" + id}
        </h1>

        {categoryErrors && (
          <div className="bg-red-500 p-2 text-white text-center">
            {categoryErrors.message}
          </div>
        )}

        <form className="px-10" onSubmit={onSubmit}>
          {!activeForm ? (
            <>
              <input
                type="text"
                {...register("name_category", { required: true })}
                className="w-full input px-4 py-2 rounded-md my-2"
                placeholder="Name Category"
              />

              <button
                className="bg-sky-600  hover:bg-sky-500 text-white px-4 mt-3 py-2 rounded-md"
                type="submit"
              >
                Save
              </button>
            </>
          ) : (
            <div>
              <div className="relative w-full">
                <input
                  type="text"
                  {...register("name_subcategory", { required: true })}
                  className=" block w-full input px-4 py-2 rounded-md my-2"
                  placeholder="Name Subcategory"
                />

                <button className="absolute top-0 end-0 px-2.5 h-full font-medium   rounded-e-lg  border-2 border-sky-800 bg-sky-600  hover:bg-sky-500 text-white">
                  Add
                </button>
              </div>
              {list.map((e, index) => (
                <div
                className="tag "
                  key={e.id_subcategory}
                  onClick={async (o) => {
                    o.preventDefault();
                    removeFields(index)
                    await deleteSubcategory(e.id_subcategory)
                    console.log(e)
                  }}
                >
                  {e.name_subcategory}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
