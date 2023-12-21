import {pool} from "../db.js"

export const getCategories = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM categories WHERE id_users = ?", [req.user.id])

        res.json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const getCategory = async(req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM categories WHERE id_category = ?",
            [req.params.id]
          );
          const [result_subcategory] = await pool.query(
            "SELECT * FROM subcategories WHERE id_category = ?",
            [req.params.id]
          );
          
    
          if(result.length === 0){
            return res.status(404).json({message: "category not found"})
          }
    
          result[0].subcategories = [result_subcategory][0]
          res.json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createCategory = async(req, res)=> {
    try {
        const id = req.user.id
        const {name_category} = req.body
        const [result] = await pool.query(
            "INSERT INTO categories(name_category, id_users) VALUES (?,?)",
            [name_category, id]
          );
          res.json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateCategory = async(req, res) => {
    try {
        const [result] = await pool.query(
          "UPDATE categories SET ? WHERE id_category = ?",
          [req.body, req.params.id]
        );
        res.json(result);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}
export const deleteCategory = async (req,res) => {
    try {
        const delete_answer = await pool.query(
          "DELETE FROM subcategories WHERE id_category = ?",
          [req.params.id]
        );
        const [result] = await pool.query(
          "DELETE FROM categories WHERE id_category = ?",
          [req.params.id]
        );
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}