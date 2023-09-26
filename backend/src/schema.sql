CREATE TABLE users (
    id SERIAL PRIMARY KEY
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    question_id INTEGER REFERENCES questions(id),
    score INTEGER
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    content TEXT,
    climate_profile_id INTEGER REFERENCES climate_profiles(id),
);

CREATE TABLE climate_profiles (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT
);