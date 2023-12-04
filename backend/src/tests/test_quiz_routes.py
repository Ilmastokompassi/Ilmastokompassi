import json


def test_create_new_quiz_response_with_group_token(client):
    group_token = "FOOBAR5"
    response = client.post('/api/groups/new', json={'token': group_token})
    response = client.post('/api/quiz/new', json={"groupToken": group_token})
    result = json.loads(response.data)

    assert response.status_code == 200


def test_create_new_quiz_response_without_group_token(client):
    response = client.post('/api/quiz/new', json={"groupToken": None})
    result = json.loads(response.data)

    assert response.status_code == 200


def test_get_quiz_questions(client):
    response = client.get('/api/quiz/questions')
    result = json.loads(response.data)
    first_question = result['1']

    assert response.status_code == 200
    assert len(result) == 8
    assert first_question['id'] == 1
    assert 'Ilmastonmuutokseen liittyviä väitteitä on kaikenlaisia. Tunnistatko mitkä seuraavista ovat totta?' in first_question[
        'content']


def test_save_quiz_answer(client):
    group_token = "FOOBAR6"
    response = client.post('/api/groups/new', json={'token': group_token})

    response = client.post('/api/quiz/new', json={"groupToken": group_token})
    result = json.loads(response.data)
    response_id = result['response_id']

    data = {'questionId': 1, 'answer': [3, 5, 6], 'responseId': response_id}
    response = client.post('/api/quiz/save', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['correct_answers'] == [2, 3, 4, 5]
    assert result['info_text'] == "Näin on näkkileipä. Ilmastonmuutoksen taustalla on paljon fysiikkaa sekä kemiaa, kuten säteilyä ja kasvihuonekaasuja. Maapallo ei ole kuitenkaan yksin kasvihuonekaasuilmiön kanssa, vaan sitä tapahtuu muillakin planeetoilla. Erona tosin on se, että täällä se on lähtöisin ihmisen toiminnasta ja sen vuoksi voimistunut viime aikoina aika lailla."
