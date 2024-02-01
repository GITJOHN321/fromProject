CREATE TABLE users(
    id_users INTEGER PRIMARY KEY AUTO_INCREMENT,
    username varchar(40) NOT NULL UNIQUE,
    email varchar (320) NOT NULL UNIQUE, 
    password varchar(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE categories (
    id_category INTEGER PRIMARY KEY AUTO_INCREMENT,
    name_category VARCHAR(200) NOT NULL UNIQUE,
    id_users INTEGER NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_users) REFERENCES users(id_users)
);
CREATE TABLE subcategories (
    id_subcategory INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_category INTEGER NOT NULL,
    name_subcategory VARCHAR(255) NOT NULL UNIQUE,
   
    FOREIGN KEY (id_category) REFERENCES categories(id_category)
);
CREATE TABLE questions (
    id_question INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    body TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0,
    id_user INTEGER NOT NULL,
    list_answers JSON NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_users)
);
CREATE TABLE answers(
    id_answer INTEGER PRIMARY KEY AUTO_INCREMENT,
    body_answer TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0,
    question_id INTEGER NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id_question)
);
CREATE TABLE question_category(
    id_subcategory INTEGER NOT NULL,
    id_question INTEGER NOT NULL,
    PRIMARY KEY (id_question, id_subcategory),
    FOREIGN KEY (id_question) REFERENCES questions(id_question),
    FOREIGN KEY (id_subcategory) REFERENCES subcategories(id_subcategory)
);
select * from questions JOIN question_category ON questions.id_question = question_category.id_question JOIN subcategorys ON question_category.id_subcategory = subcategorys.id_subcategory;

select subcategorys.id_subcategory, subcategorys.id_category, subcategorys.name_subcategory from question_category JOIN subcategorys ON question_category.id_subcategory = subcategorys.id_subcategory WHERE id_question = 1;

select subcategorys.id_subcategory, categorys.name_category, subcategorys.name_subcategory from question_category JOIN subcategorys ON question_category.id_subcategory = subcategorys.id_subcategory 
JOIN categorys ON categorys.id_category = subcategorys.id_category WHERE id_question = 1;


CREATE TABLE exams(
    id_exam INTEGER PRIMARY KEY AUTO_INCREMENT,
    name_exam VARCHAR(200) NOT NULL,
    body_exam TEXT DEFAULT '',
    available_time_minutes INT NOT NULL DEFAULT 0,
    enable_exam BOOLEAN NOT NULL DEFAULT 0,
    public_exam BOOLEAN NOT NULL DEFAULT 0,
    max_score DECIMAL(5, 2) NOT NULL,
    id_user INTEGER NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_users)
);


INSERT INTO exams (name_exam, body_exam, available_time_minutes, max_score, id_user) VALUES ('examen #1', 'este es un examen preparado', 30, 5,1);

CREATE TABLE question_exam (
    question_score DECIMAL (5,2) DEFAULT 0,
    id_question INTEGER NOT NULL,
    id_exam INTEGER NOT NULL,
    PRIMARY KEY (id_question, id_exam),
    FOREIGN KEY (id_question) REFERENCES questions(id_question),
    FOREIGN KEY (id_exam) REFERENCES exams(id_exam)
);
--Lista de Preguntas en un examen
SELECT question_exam.*, questions.title FROM question_exam JOIN exams ON question_exam.id_exam = exams.id_exam JOIN questions ON question_exam.id_question = questions.id_question ORDER BY question_exam.id_exam ASC WHERE question_exam.id_exam = 1 ;

INSERT INTO question_exam (question_score, id_question, id_exam) VALUES (1.5,1,1)

CREATE TABLE user_resolved (
    id_note INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_user INTEGER NOT NULL,
    user_score DECIMAL(5, 2),
    resolved_time_minutes INT NOT NULL DEFAULT 0,
    id_exam INTEGER NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_users),
    FOREIGN KEY (id_exam) REFERENCES exams(id_exam)
);

--Lista de usuarios que han resuelto un determinado examen
SELECT user_resolved.* , users.username , exams.name_exam, exams.max_score, exams.available_time_minutes from user_resolved JOIN users ON user_resolved.id_user = users.id_users JOIN exams ON user_resolved.id_exam = exams.id_exam;

INSERT INTO user_resolved (user_score, id_user, resolved_time_minutes, id_exam) VALUES (4,1,6,1);

