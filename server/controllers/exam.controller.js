import {pool} from "../db.js"

export const getExams = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM exams WHERE id_user = ?", [req.user.id])

        res.json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
} 
export const getExam = async(req, res) => {
    try {

        const [result_questions] = await pool.query("SELECT question_exam.id_question, questions.title, question_exam.question_score FROM question_exam JOIN exams ON question_exam.id_exam = exams.id_exam JOIN questions ON question_exam.id_question = questions.id_question WHERE question_exam.id_exam = ?", [req.params.id])
        const [result] = await pool.query(
            "SELECT * FROM exams WHERE id_exam = ?",
            [req.params.id]
          );
        
            
          if(result.length === 0){
            return res.status(404).json({message: "task not found"})
          }
          result[0].questions= [result_questions][0]
          res.json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createExam = async(req, res)=> {
    try {
        const id = req.user.id
        const {name_exam, body_exam, available_time, max_score} = req.body
        const [result] = await pool.query(
            "INSERT INTO exams(name_exam, body_exam, available_time_minutes, max_score, id_user) VALUES (?,?,?,?,?)",
            [name_exam, body_exam, available_time, max_score, id]
          );
          res.json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const updateExam = async(req, res) => {
    try {
        const [result] = await pool.query(
          "UPDATE exams SET ? WHERE id_exam = ?",
          [req.body, req.params.id]
        );
        res.json(result);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

export const deleteExam = async (req,res) => {
    try {

        const [result] = await pool.query(
          "DELETE FROM exams WHERE id_exam = ?",
          [req.params.id]
        );
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

export const insertQuestionInExam = async (req, res) => {
    try {
        const {question_score, id_question, id_exam} = req.body
        const [result] = await pool.query("INSERT INTO question_exam (question_score, id_question, id_exam) VALUES (?,?,?)", [question_score, id_question, id_exam])

        res.json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createUserResolved = async (req,res) => {
    try {
        const id_user = req.user.id
        const {user_score, resolved_time, id_exam} = req.body
        const [result] = await pool.query("INSERT INTO user_resolved(user_score, id_user, resolved_time_minutes, id_exam) VALUES (?,?,?,?)",[user_score, id_user, resolved_time, id_exam])

        res.json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const getUserResolvedExam = async (req, res) => {
    try {
        const {id_userResolved, id_exam} = req.body
        const [result] = await pool.query ("SELECT user_resolved.* , users.username , exams.name_exam, exams.max_score, exams.available_time_minutes from user_resolved JOIN users ON user_resolved.id_user = users.id_users JOIN exams ON user_resolved.id_exam = exams.id_exam WHERE user_resolved.id_user = ? AND user_resolved.id_exam = ?", [id_userResolved, id_exam])

        if(result.length === 0){
            return res.status(404).json({message: "task not found"})
          }
        res.json(result)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}