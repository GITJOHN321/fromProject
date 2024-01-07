import {z} from 'zod'
export const createSubcategorySchema = z.object({
    name_subcategory: z.string({required_error: "Name is required"}),
})

export const getSubcategorySchema = z.object({
    id_category: z.number({required_error: "id_category is required"})
})

export const arrayListSubcategories = z.object({
    id_category: z.number({required_error: "idcategory is required"}),
    subcategories: z.array(createSubcategorySchema)
})