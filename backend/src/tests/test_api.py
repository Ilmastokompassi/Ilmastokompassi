import json


def test_ping(client):
    response = client.get('/api/ping')

    assert response.status_code == 200
    assert response.data == b'pong'


def test_get_questions(client):
    response = client.get('/api/question')
    result = json.loads(response.data)
    first_question = result[0]

    assert response.status_code == 200
    assert len(result) == 33
    assert first_question['id'] == 1
    assert 'Haluan hankkia enemmän tieteellistä tietoa' in first_question['content']


def test_get_profiles(client):
    response = client.get('/api/roles')
    result = json.loads(response.data)
    first_profile = result[0]

    assert response.status_code == 200
    assert len(result) == 4
    assert first_profile['id'] == 1
    assert first_profile['name'] == 'Ilmastoasiantuntija'


def test_get_individual_question(client):
    response = client.get('/api/question/33')
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['id'] == 33
    assert 'teknologiseen kehitykseen ei ole panostettu tarpeeksi' in result['content']


def test_get_individual_question_not_found(client):
    response = client.get('/api/question/420')

    assert response.status_code == 500
    assert b'Something went wrong!' in response.data


def test_submit(client):
    data = {"responses": {"1": 1, "2": 2, "3": 3,
                          "4": 4, "5": 5}, "groupToken": None}

    response = client.post('/api/submit', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['user_id'] == 1


def test_get_summary(client):
    response = client.get('api/summary/1')
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['count'] == 5
    assert result['summary'] == {'1': 100, '2': 25, '3': 50, '4': 75}
    assert result['total_questions_count'] == 33


def test_new_group(client):
    data = {'token': 'YESGROUP'}
    response = client.post('/api/group/new', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['status'] == 'success'


def test_submit_group(client):
    data = {"responses": {"1": 1, "2": 2, "3": 3}, "groupToken": "YESGROUP"}

    response = client.post('/api/submit', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['user_id'] > 0


def test_group_summary(client):
    response = client.get('api/group/YESGROUP/summary')
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['status'] == 'success'
    assert result['message'] == 'Group exists'


def test_nonexisting_group_summary(client):
    response = client.get('api/group/NOGROUP/summary')
    result = json.loads(response.data)

    assert response.status_code == 400
    assert result['status'] == 'fail'
    assert result['message'] == 'Group does not exist'


def test_get_group(client):
    response = client.get('api/group/YESGROUP')
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result == {'group_token': True}


def test_get_nonexisting_group(client):
    response = client.get('api/group/NOGROUP')
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result == {'group_token': False}


def test_get_group_score(client):
    response = client.get('api/group/YESGROUP/score')
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['score'] == {'1': 0, '2': 25, '3': 50}
    assert result['response_amount'] == 1


def test_get_nonexisting_group_score(client):
    response = client.get('api/group/NOGROUP/score')
    result = json.loads(response.data)

    assert response.status_code == 400
    assert result['status'] == 'fail'
    assert result['message'] == 'Group does not exist'


def test_create_new_quiz_response_with_grouptoken(client):
    data = {"groupToken": "YESGROUP"}
    response = client.post('api/new-quiz', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['response_id'] == 3


def test_create_new_quiz_response_without_grouptoken(client):
    data = {}
    response = client.post('api/new-quiz', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['response_id'] == 4


def test_get_quiz_questions(client):
    response = client.get('api/quiz')
    result = json.loads(response.data)
    first_question = result['1']

    assert response.status_code == 200
    assert len(result) == 8

    assert first_question['id'] == 1
    assert 'Ilmastonmuutokseen liittyviä väitteitä on kaikenlaisia. Tunnistatko mitkä seuraavista ovat totta?' in first_question[
        'content']


def test_save_quiz_answer(client):
    data = {'questionId': 1, 'answer': [3, 5, 6], 'responseId': 3}
    response = client.post('api/quiz', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['correct_answers'] == [2, 3, 4, 5]
    assert result['info_text'] == "Näin on näkkileipä. Ilmastonmuutoksen taustalla on paljon fysiikkaa sekä kemiaa, kuten säteilyä ja kasvihuonekaasuja. Maapallo ei ole kuitenkaan yksin kasvihuonekaasuilmiön kanssa, vaan sitä tapahtuu muillakin planeetoilla. Erona tosin on se, että täällä se on lähtöisin ihmisen toiminnasta ja sen vuoksi voimistunut viime aikoina aika lailla."


def test_save_quiz_answer_that_has_infotext(client):
    data = {'questionId': 2, 'answer': [3, 5, 6], 'responseId': 3}
    response = client.post('api/quiz', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['correct_answers'] == [8, 9]
    assert result['info_text'] == 'Nämä ovat niin kutsuttuja palauteilmiöitä. Eli ilmastonmuutoksesta johtuvia tapahtumia, ja jotka puolestaan voimistavat tai heikentävät ilmastonmuutosta, johtaen näin ketjureaktioon. Jos ihmisten ilmastonmuutosta voimistava toiminta loppuisi tänään, palauteilmiöt vaikuttaisivat maapallon lämpötilaan vielä seuraavien tuhannen vuoden ajan. Esimerkiksi merivirtojen tasaantuminen vie hyvin kauan.'
