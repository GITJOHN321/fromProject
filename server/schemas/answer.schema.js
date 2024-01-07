import {z} from 'zod'
export const createAnswerSchema = z.object({
    body_answer: z.string({required_error: "Body is required"}),
    done: z.number({required_error: "done is required"})
})

export const arrayListAnswers = z.object({
    id_question: z.number({required_error: "idquestion is required"}),
    answers: z.array(createAnswerSchema)
})