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
    let list = [];
    let list2 = [];
    const { listSubcategories, id_question } = req.body;
    const [currentList] = await pool.query(
      "SELECT * FROM question_category WHERE id_question = ?",
      [id_question]
    );

    listSubcategories.map((e) => {
      list.push(e.id_subcategory);
    });
    currentList.map((e) => {
      list2.push(e.id_subcategory);
    });
    //INSERT INTO question_category (id_subcategory, id_question) VALUES (?, ?)
    if (currentList.length < 1) {
      listSubcategories.map(async (e) => {
        await pool.query(
          "INSERT INTO question_category (id_subcategory, id_question) VALUES (?, ?)",
          [e.id_subcategory, id_question]
        );
      });
    } else {
      list2.map(async (e) => {
        !list.includes(e)
          ? await pool.query(
              "DELETE FROM question_category WHERE id_subcategory = ? and id_question = ?",
              [e, id_question]
            )
          : null;
      });
      list.map(async (e) => {
        !list2.includes(e)
          ? await pool.query(
              "INSERT INTO question_category (id_subcategory, id_question) VALUES (?, ?)",
              [e, id_question]
            )
          : null;
      });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


