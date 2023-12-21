import { Router } from "express";
import { getCategory, getCategories, updateCategory, deleteCategory, createCategory } from "../controllers/category.controller.js";
import {authRequired} from "../middlewares/validateToken.js"
import { validateSchema} from "../middlewares/validator.schema.js"
import { createCategorySchema } from "../schemas/category.schema.js";


const router = Router()

router.get("/categories", authRequired, getCategories)
router.get("/categories/:id", authRequired, getCategory)
router.put("/categories/:id", authRequired, updateCategory)
router.delete("/categories/:id", authRequired, deleteCategory)
router.post("/categories", authRequired,validateSchema(createCategorySchema), createCategory)

export default router