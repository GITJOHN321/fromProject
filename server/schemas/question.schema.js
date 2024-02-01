import {z} from 'zod'
export const createQuestionSchema = z.object({
    title: z.string({ required_error: "Title is required"}),
    body: z.string({required_error: "Body is required"}),
})



export const answerSchema = z.object({
    body_answer: z.string({required_error: "Body is required"}),
    done: z.boolean({required_error: "done is required"})
})

export const createQuestionAnswersSchema = z.object({
    title: z.string({ required_error: "Title is required"}),
    body: z.string({required_error: "Body is required"}),
    list_answers: z.array(answerSchema)
})

