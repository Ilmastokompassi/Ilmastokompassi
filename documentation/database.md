# Database structure

## Tables

### groups

| name  | type               |
| ----- | ------------------ |
| token | `TEXT PRIMARY KEY` |


### users

| name        | type                            |
| ----------- | ------------------------------- |
| id          | `SERIAL PRIMARY KEY`            |
| group_token | `TEXT REFERENCES groups(token)` |

### answers

| name        | type                               |
| ----------- | ---------------------------------- |
| id          | `SERIAL PRIMARY KEY`               |
| user_id     | `INTEGER REFERENCES users(id)`     |
| question_id | `INTEGER REFERENCES questions(id)` |
| score       | `INTEGER`                          |

### questions

| name               | type                                      |
| ------------------ | ----------------------------------------- |
| id                 | `SERIAL PRIMARY KEY`                      |
| content            | `TEXT`                                    |
| climate_profile_id | `INTEGER REFERENCES climate_profiles(id)` |

### climate_profiles

| name        | type                 |
| ----------- | -------------------- |
| id          | `SERIAL PRIMARY KEY` |
| name        | `TEXT`               |
| description | `TEXT`               |
