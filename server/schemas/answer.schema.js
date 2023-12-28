import {z} from 'zod'
export const createAnswerSchema = z.object({
    body_answer: z.string({required_error: "Body is required"}),
})