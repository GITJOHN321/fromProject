import { useEffect } from "react";
import CategoryForm from "../components/CategoryForm";
import { useCategories } from "../context/CategoryContext";
function CategoryPage() {
  const {
    getCategories,
    categories,
    listSubCategories,
    setListSubCategories,
    subcategories,
    subcategoriesQuestion,
  } = useCategories();

  useEffect(() => {
    getCategories()
  }, [])
  
  return (
    <div className="h-screen grid grid-flow-row md:grid-cols-3 gap-4 ">
      <div className="row-span-2 col-span-2 md:col-span-1  overflow-auto touch-pan-y">
      {categories.map((category) => (
            <p key={category.id_category}>{category.name_category}</p>
          ))}
      </div>
      <div className=" row-span-2 col-span-2 ">
        <div className=" flex  items-center justify-center">
          <div className="py-8 my-2 bg-slate-100 rounded-lg">
            <CategoryForm></CategoryForm>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
