import {z} from 'zod'
export const createAnswerSchema = z.object({
    body: z.string({required_error: "Body is required"}),
})