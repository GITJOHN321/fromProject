import { Router } from "express";
import { getSubcategories, getSubcategory, createSubcategory, deleteSubcategory, updateSubcategory, questionSubcategory } from "../controllers/subcategory.controller.js";
import {authRequired} from "../middlewares/validateToken.js"
import { validateSchema} from "../middlewares/validator.schema.js"
import { createSubcategorySchema, getSubcategorySchema } from "../schemas/subcategory.schema.js";


const router = Router()

router.get("/subcategories", authRequired, validateSchema(getSubcategorySchema),getSubcategories)
router.get("/subcategories/:id", authRequired, getSubcategory)
router.put("/subcategories/:id", authRequired, updateSubcategory)
router.delete("/subcategories/:id", authRequired, deleteSubcategory)
router.post("/subcategories", authRequired,validateSchema(createSubcategorySchema), createSubcategory)
router.post("/subcategories_question", authRequired, questionSubcategory)

export default router