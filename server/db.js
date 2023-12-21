import { createPool } from "mysql2/promise";


//createPool es un metodo que obtiene un objeto
export const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'exam_db'
})