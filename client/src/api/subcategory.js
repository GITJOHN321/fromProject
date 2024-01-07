import axios from "./axios";

export const refreshSubcategorListRequest = (subcategory) => axios.post(`/subcategories-list`, subcategory)

export const getSubcategoriesRequest= (id) => axios.get(`/subcategories-list/${id}`)

export const intoSubcategoriQuestionRequest = (match) => axios.post('/subcategories_question', match)