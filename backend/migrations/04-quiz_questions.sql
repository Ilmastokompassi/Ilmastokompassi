INSERT INTO quiz_questions(id, content, info_text) 
VALUES 
  (1, 'Kysymys 1', 'infoa'),
  (2, 'Kysymys 2', 'infoa'),
  (3, 'Kysymys 3', 'infoa');

INSERT INTO quiz_question_options(id, option, is_correct, question_id)
VALUES
    (1, 'Vastaus 1', 'true', 1),
    (2, 'Vastaus 2', 'false', 1),
    (3, 'Vastaus 3', 'false', 1),
    (4, 'Vastaus 4', 'false', 2),
    (5, 'Vastaus 5', 'true', 2),
    (6, 'Vastaus 6', 'true', 3),
    (7, 'Vastaus 7', 'true', 3),
    (8, 'Vastaus 8', 'true', 3),
    (9, 'Vastaus 9', 'false', 3),
    (10, 'Vastaus 10', 'true', 3);