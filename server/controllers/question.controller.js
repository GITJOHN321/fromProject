import { pool } from "../db.js";

export const getQuestions = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM questions WHERE id_user = ? ORDER BY id_question DESC",
      [req.user.id]
    );

    for (let i = 0; i < result.length; i++) {
      const [sub] = await pool.query(
        "select subcategories.id_subcategory, subcategories.id_category, subcategories.name_subcategory from question_category JOIN subcategories ON question_category.id_subcategory = subcategories.id_subcategory JOIN categories ON categories.id_category = subcategories.id_category WHERE id_question = ?",
        [result[i].id_question]
      );
      result[i].subcategories = [sub][0];
      result[i].list_answers = JSON.parse(result[i].list_answers)
 
    }

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getQuestion = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM questions WHERE id_question = ?",
      [req.params.id]
    );

    const [result_subcategories] = await pool.query(
      "select subcategories.id_subcategory, subcategories.name_subcategory, subcategories.id_category, categories.name_category from question_category JOIN subcategories ON question_category.id_subcategory = subcategories.id_subcategory JOIN categories ON categories.id_category = subcategories.id_category WHERE id_question = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "task not found" });
    }
    result[0].list_answers = JSON.parse(result[0].list_answers)
    result[0].subcategories = [result_subcategories][0];
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const id = req.user.id;
    const { title, body } = req.body;
    const [result] = await pool.query(
      "INSERT INTO questions(title, body, id_user) VALUES (?,?,?)",
      [title, body, id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createQuestionWithAnswer = async (req, res) => {
  try {
    const id = req.user.id;
    const { title, body, list_answers } = req.body;
    const answers = JSON.stringify(list_answers)
    console.log(answers)
    const [result] = await pool.query(
      "INSERT INTO questions(title, body, list_answers ,id_user) VALUES (?,?,?,?)",
      [title, body, answers , id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    
    req.body.list_answers = JSON.stringify(req.body.list_answers)
    console.log(req.body)
    const [result] = await pool.query(
      "UPDATE questions SET ? WHERE id_question = ?",
      [req.body, req.params.id]
    );

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteQuestion = async (req, res) => {
  try {
    const delete_categorys = await pool.query(
      "DELETE FROM question_category WHERE id_question = ?",
      [req.params.id]
    );

    const [result] = await pool.query(
      "DELETE FROM questions WHERE id_question = ?",
      [req.params.id]
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
