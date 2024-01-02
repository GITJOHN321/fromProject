import axios from "./axios";

export const createCategoryRequest = (category) => axios.post('/categories', category)
export const getCategoriesRequest= () => axios.get('/categories')