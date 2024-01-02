import { createContext, useContext, useState } from "react";
import {
  createCategoryRequest,
  getCategoriesRequest,
} from "../api/Category.js";
import {
  refreshSubcategorListRequest,
  getSubcategoriesRequest,
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

  const createCategory = async (category) => {
    try {
      const res = await createCategoryRequest(category);
      return res.data;
    } catch (error) {
      console.error(error);
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
  const getSubcategories = async (id) => {
    try {
      
      const res = await getSubcategoriesRequest(id);
      console.log(id)
      setSubcategories(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const refreshListSubcategories = async (id, subcategoryList) => {
    try {
      const refreshSubcategoryList = {
        id_category: id,
        subcategories: subcategoryList,
      };
      await refreshSubcategorListRequest(refreshSubcategoryList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        createCategory,
        refreshListSubcategories,
        categories,
        getCategories,
        getSubcategories,
        subcategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
