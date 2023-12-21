import {z} from 'zod'
export const createQuestionSchema = z.object({
    title: z.string({ required_error: "Title is required"}),
    body: z.string({required_error: "Body is required"}),
})