import { pool } from "../db.js";
export const getSubcategories = async (req, res) => {
  // res.send("get answers");
  try {
    const [result] = await pool.query(
      "SELECT * FROM subcategories WHERE id_category = ?",
      [req.params.id]
    );
    //console.log(id_category)
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getSubcategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM subcategories WHERE id_subcategory = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "subcategory not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSubcategory = async (req, res) => {
  try {
    const { name_subcategory, id_category } = req.body;
    const [result] = await pool.query(
      "INSERT INTO subcategories(name_subcategory ,id_category) VALUES (?,?)",
      [name_subcategory, id_category]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateSubcategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE subcategories SET ? WHERE  id_subcategory = ? ",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteSubcategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM subcategories WHERE id_subcategory = ?",
      [req.params.id]
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const questionSubcategory = async (req, res) => {
  try {
    const { id_subcategory, id_question } = req.body;
    const [result] = await pool.query(
      "INSERT INTO question_category(id_subcategory, id_question) VALUES (?,?)",
      [id_subcategory, id_question]
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const refreshListSubcategories = async (req, res) => {
  try {
    const { subcategories, id_category } = req.body;
    if (Array.isArray(subcategories)) {
      let list = [];
      const [categoriesActual] = await pool.query(
        "SELECT * FROM subcategories WHERE id_category = ?",
        [id_category]
      );

      categoriesActual.map((elemento) => {
        list.push(elemento.id_subcategory);
      });

      subcategories.map(async (subcategory) => {
        if (!subcategory.id_subcategory) {
          try {
            await pool.query(
              "INSERT INTO subcategories(name_subcategory , id_category) VALUES (?,?)",
              [subcategory.name_subcategory, id_category]
            );
            console.log({ create: subcategory });
          } catch (error) {
            console.error(error);
          }
        } else if (subcategory.id_subcategory) {
          if (subcategories.length < categoriesActual.length) {
            if (list.includes(subcategory.id_subcategory)) {
              await pool.query("DELETE FROM subcategories WHERE id_subcategory = ?", [
                subcategory.id_subcategory,
              ]);
              console.log("eliminar: " + answer.id_answer);
            }
          } else {
            await pool.query("UPDATE subcategories SET ? WHERE  id_subcategory = ? ", [
              subcategory,
              subcategory.id_subcategory,
            ]);
            console.log("actualizar: " + answer.id_answer);
          }
        }
      });
      res.status(201).json({ message: "list update" });
    } else {
      return res.status(500).json({ message: "receive a array" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
