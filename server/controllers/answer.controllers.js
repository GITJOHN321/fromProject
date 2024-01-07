import { pool } from "../db.js";
export const getAnswers = async (req, res) => {
  // res.send("get answers");
  try {
    const { question_id } = req.body;
    const [result] = await pool.query(
      "SELECT * FROM answers WHERE question_id = ?",
      [question_id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAnswer = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM answers WHERE id_answer = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "question not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const postAnswer = async (req, res) => {
  try {
    const { body_answer, question_id, done } = req.body;
    const [result] = await pool.query(
      "INSERT INTO answers(body_answer ,question_id, done) VALUES (?,?,?)",
      [body_answer, question_id, done]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateAnswer = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE answers SET ? WHERE  id_answer = ? ",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateListAnswer = async (req, res) => {
  try {
    let list = [];
    const { answers, id_question } = req.body;
    const [result] = await pool.query(
      "SELECT * FROM answers WHERE question_id = ?",
      [id_question]
    );

    answers.map((e) => {
      e.id_answer ? list.push(e.id_answer) : null;
    });

    answers.map(async (e) => {
      if (!e.id_answer) {
        await pool.query(
          "INSERT INTO answers(body_answer ,question_id, done) VALUES (?,?,?)",
          [e.body_answer, id_question, e.done]
        );
      } else {
        result.map(async (elemento) => {
          !list.includes(elemento.id_answer)
            ? await pool.query("DELETE FROM answers WHERE id_answer = ?", [
                elemento.id_answer,
              ])
            : await pool.query("UPDATE answers SET ? WHERE  id_answer = ? ", [
                e,
                e.id_answer,
              ]);
        });
      }
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteAnswer = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM answers WHERE id_answer = ?",
      [req.params.id]
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
