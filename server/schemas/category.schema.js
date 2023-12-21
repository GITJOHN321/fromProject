import {z} from 'zod'
export const createCategorySchema = z.object({
    name_category: z.string({required_error: "Name is required"}),
})