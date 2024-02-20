import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { createAccesToken } from "../libs/jwt.js";
import { v4 as uuidv4 } from 'uuid';


export const register = async (req, res) => {
  const { username, email, password, password2} = req.body;
  try {
    if(password !== password2) return res.status(500).json(["passwords do not match"])
    //GENERATE CODE UUID--------------------
    const code = uuidv4()
    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users(username,email,password) VALUES(?,?,?)",
      [username, email, passwordHash]
    );

    res.json({
      id: result.insertId,
      username,
      email,
    });
  } catch (error) {
    if (error.message === `Duplicate entry '${username}' for key 'username'`) {
      error.message = "Username already exist";
    } else if (error.message === `Duplicate entry '${email}' for key 'email'`) {
      error.message = "Email already exist";
    }
    return res.status(500).json([error.message]);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userFound] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!userFound[0]) return res.status(400).json(["User not found"]);

    const isMatch = await bcrypt.compare(password, userFound[0].password);

    if (!isMatch) return res.status(400).json(["Incorrect password"]);

    const token = await createAccesToken({ id: userFound[0].id_users });

    res.cookie("token", token);
    res.json({
      id: userFound[0].id_users,
      username: userFound[0].username,
      email: userFound[0].email,
      date: new Date(userFound[0].createdAt).toLocaleDateString(),
    });
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(204);
};

export const profile = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM users WHERE id_users = ?",
      [req.user.id]
    );

    res.json({
      id: result[0].id_users,
      username: result[0].username,
      email: result[0].email,
      date: result[0].createdAt,
    });
  } catch (error) {
    return res.status(400).json({ message: "ERROR" });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const [userFound] = await pool.query(
      "SELECT * FROM users WHERE id_users = ?",
      [user.id]
    );

    if (!userFound[0]) return res.status(401).json(["Unauthorized"]);

    return res.json({
      id: userFound[0].id_users,
      username: userFound[0].username,
      email: userFound[0].email,
      date: new Date(userFound[0].createdAt).toLocaleDateString(),
    });
  });
};

export const changePasswordFromPerfil = async (req, res) => {
  try {
    const { old_password, new_password, new_password2 } = req.body;
    const { id } = req.user;
    
    if (new_password !== new_password2)
      return res.status(400).json(["new passwords do not match"]);
    if (old_password === new_password2)
      return res.status(400).json(["new password don't same to old_password"]);
    const [userFound] = await pool.query(
      "SELECT * FROM users WHERE id_users = ?",
      [id]
    );

    if (!userFound[0]) return res.status(400).json(["User not found"]);

    const isMatch = await bcrypt.compare(old_password, userFound[0].password);

    if (!isMatch) return res.status(400).json(["Incorrect password"]);

    const passwordHash = await bcrypt.hash(new_password, 10);
    userFound[0].password = passwordHash;
    const [result] = await pool.query("UPDATE users SET ? WHERE id_users = ?", [
      userFound[0],
      id,
    ]);
    return res.status(204).json({ message: "password updated successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Check if password is correct" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM users WHERE id_users = ?",
      [req.user.id]
    );
    console.log(result[0])
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
