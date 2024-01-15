import { createContext, useContext, useState } from "react";
import {
  createCategoryRequest,
  getCategoriesRequest,
} from "../api/Category.js";
import {
  getSubcategoriesRequest,
  intoSubcategoriQuestionRequest,
  createSubCategoryRequest,
  deleteSubcategoryRequest,
} from "../api/subcategory.js";

const CategoryContext = createContext();

export const useCategories = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategories must be used within a ExamProvider");
  }
  return context;
};

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [listSubCategories, setListSubCategories] = useState([]);
  const [categoryErrors, setCategoryErrors] = useState(null);

  const resetErrors = () => {
    setCategoryErrors(null);
  };

  //methods category-----------------------------------------------------------------

  const createCategory = async (category) => {
    try {
      const res = await createCategoryRequest(category);
      return res.data;
    } catch (error) {
      setCategoryErrors(error.response.data);
    }
  };
  const getCategories = async () => {
    try {
      const res = await getCategoriesRequest();
      setCategories(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  //methods Subcategorys --------------------------------------------------------------
  const createSubcategory = async (subcategory, id) => {
    try {
      const data = {
        name_subcategory: subcategory,
        id_category: Number(id),
      };
      const res = await createSubCategoryRequest(data);
      return res.data;
    } catch (error) {
      console.error(error);
      setCategoryErrors(error.response.data);
    }
  };

  const getSubcategories = async (id) => {
    try {
      const res = await getSubcategoriesRequest(id);

      setSubcategories(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSubcategory = async (id) => {
    try {
      await deleteSubcategoryRequest(id)

    } catch (error) {
      console.error(error)
    }
  }

  const subcategoriesQuestion = async (list_subcategories, id_question) => {
    try {
      const data = {
        id_question: id_question,
        listSubcategories: list_subcategories,
      };
      await intoSubcategoriQuestionRequest(data);
    } catch (error) {
      console.error(error);
    }
  };

  //-----------------------------------------------------------------------------
  return (
    <CategoryContext.Provider
      value={{
        createCategory,
        categories,
        getCategories,
        getSubcategories,
        subcategories,
        listCategories,
        setListCategories,
        listSubCategories,
        setListSubCategories,
        subcategoriesQuestion,
        categoryErrors,
        resetErrors,
        createSubcategory,
        deleteSubcategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
