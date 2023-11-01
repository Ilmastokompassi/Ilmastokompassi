DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS responses CASCADE;

DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS profile_questions CASCADE;
DROP TABLE IF EXISTS profile_answers CASCADE;

DROP TABLE IF EXISTS quiz_answers CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS quiz_question_options CASCADE;

CREATE TABLE groups (
    token TEXT PRIMARY KEY
);

CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    group_token TEXT REFERENCES groups(token)
);

/* Climate profile survey */
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT
);

CREATE TABLE profile_questions (
    id SERIAL PRIMARY KEY,
    content TEXT,
    profile_id INTEGER REFERENCES profiles(id)
);

CREATE TABLE profile_answers (
    id SERIAL PRIMARY KEY,
    response_id INTEGER REFERENCES responses(id),
    question_id INTEGER REFERENCES profile_questions(id),
    score INTEGER
);

/* Fact quiz */
CREATE TABLE quiz_questions (
    id SERIAL PRIMARY KEY,
    content TEXT,
    info_text TEXT
);

CREATE TABLE quiz_question_options (
    id SERIAL PRIMARY KEY,
    option TEXT,
    is_correct BOOLEAN,
    question_id INTEGER REFERENCES quiz_questions(id)
);

CREATE TABLE quiz_answers (
    id SERIAL PRIMARY KEY,
    response_id INTEGER REFERENCES responses(id),
    question_id INTEGER REFERENCES quiz_questions(id),
    selected_option_id INTEGER REFERENCES quiz_question_options(id)
);
