import CategoryForm from "../components/CategoryForm";
function CategoryPage() {
  return (
    <div className="h-screen grid grid-flow-row md:grid-cols-3 gap-4 ">
      <div className="row-span-2 col-span-2 md:col-span-1  overflow-auto touch-pan-y">
        <span>OBject Array</span>
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
