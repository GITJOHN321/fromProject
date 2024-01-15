import axios from "./axios";

export const getSubcategoriesRequest= (id) => axios.get(`/subcategories-list/${id}`)

export const intoSubcategoriQuestionRequest = (match) => axios.post('/subcategories_question', match)

export const createSubCategoryRequest = (subcategory) => axios.post('/subcategories', subcategory)

export const deleteSubcategoryRequest = (id) => axios.delete(`/subcategories/${id}`)