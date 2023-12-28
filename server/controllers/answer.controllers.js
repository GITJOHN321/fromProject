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
    const { answers, id_question } = req.body;
   if(Array.isArray(answers)){
    let list = [];
    const [answersActual] = await pool.query(
      "SELECT * FROM answers WHERE question_id = ?",
      [id_question]
    );

    answersActual.map((elemento) => {
      list.push(elemento.id_answer);
    });
    
    console.log(answers)

    answers.map(async (answer, lister) => {
      if (!answer.id_answer) {
        try {
          await pool.query(
            "INSERT INTO answers(body_answer ,question_id, done) VALUES (?,?,?)",
            [answer.body_answer, id_question, answer.done]
          );
          console.log({create: answer})
        } catch (error) {
          console.error(error);
        }
      } else if (answer.id_answer) {
        if (answers.length < answersActual.length) {
          if (list.includes(answer.id_answer)) {
            await pool.query("DELETE FROM answers WHERE id_answer = ?", [
              answer.id_answer,
            ]);
            console.log("eliminar: " + answer.id_answer);
          }
        } else {
          await pool.query("UPDATE answers SET ? WHERE  id_answer = ? ", [
            answer,
            answer.id_answer,
          ]);
          console.log("actualizar: " + answer.id_answer);
        }
      }
    });
    res.status(201).json({message: "list update" });
   }else{
    return res.status(500).json({ message: "receive a array"});
   }
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
