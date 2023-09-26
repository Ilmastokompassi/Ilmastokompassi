# Database structure

## Tables
### users
| name | type                   |
| ---- | ---------------------- |
| id   | ``SERIAL PRIMARY KEY`` |

### answers
| name        | type                             |
| ----------- | -------------------------------- |
| id          | ``SERIAL PRIMARY KEY``           |
| user_id     | ``INTEGER REFERENCES users``     |
| question_id | ``INTEGER REFERENCES questions`` |
| score       | ``INTEGER``                      |

### questions
| name                | type                                    |
| ------------------- | --------------------------------------- |
| id                  | ``SERIAL PRIMARY KEY``                  |
| content             | ``TEXT``                                |
| climate_profiles_id | ``INTEGER REFERENCES climate_profiles`` |

### climate_profiles
| name        | type                   |
| ----------- | ---------------------- |
| id          | ``SERIAL PRIMARY KEY`` |
| name        | ``TEXT``               |
| description | ``TEXT``               |