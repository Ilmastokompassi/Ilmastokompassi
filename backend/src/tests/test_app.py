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
    assert first_question['climate_profile_id'] == 1


def test_get_profiles(client):
    response = client.get('/api/profiles')
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
    assert result['climate_profile_id'] == 1


def test_get_individual_question_not_found(client):
    response = client.get('/api/question/420')

    assert response.status_code == 404
    assert b'Question not found' in response.data


def test_submit(client):
    data = {"responses": {"1": 1, "2": 2, "3": 3,
                          "4": 4, "5": 5}, "groupToken": None}

    response = client.post('/api/submit', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['user_id'] > 0


"""
    For now... Paulus knows why this doesn't work
def test_subit_group(client):
    data = {"responses": {"1": 1, "2": 2, "3": 3}, "groupToken": "OLLI"}
    response = client.post('/api/submit', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['user_id'] > 0


def test_new_group(client):
    data = {"token": "TESTI"}
    response = client.post('/api/new-group', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['status'] == 'success'

"""
