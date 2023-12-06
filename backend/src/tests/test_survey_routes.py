import json


def test_get_roles(client):
    response = client.get('/api/survey/roles')
    result = json.loads(response.data)
    first_profile = result[0]

    assert response.status_code == 200
    assert len(result) == 4
    assert first_profile['id'] == 1
    assert first_profile['name'] == 'Ilmastoasiantuntija'


def test_get_questions(client):
    response = client.get('/api/survey/questions')
    result = json.loads(response.data)
    first_question = result[0]

    assert response.status_code == 200
    assert len(result) == 33
    assert first_question['id'] == 1
    assert 'Haluan hankkia enemmän tieteellistä tietoa' in first_question['content']


def test_get_question(client):
    response = client.get('/api/survey/questions/33')
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['id'] == 33
    assert 'teknologiseen kehitykseen ei ole panostettu tarpeeksi' in result['content']


def test_get_question_not_found(client):
    response = client.get('/api/survey/questions/420')
    result = json.loads(response.data)

    assert response.status_code == 404
    assert result['description'] == 'Question not found'


def test_submit(client):
    data = {"responses": {"1": 1, "2": 2, "3": 3,
                          "4": 4, "5": 5}, "groupToken": None}

    response = client.post('/api/survey/submit', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200


def test_submit_with_group(client):
    group_token = 'FOOBAR7'
    response = client.post('/api/groups/new', json={'groupToken': group_token})

    data = {"responses": {"1": 1, "2": 2, "3": 3}, "groupToken": group_token}
    response = client.post('/api/survey/submit', json=data)
    result = json.loads(response.data)

    assert response.status_code == 200


def test_get_summary(client):

    data = {"responses": {"1": 1, "2": 2, "3": 3,
                          "4": 4, "5": 5}, "groupToken": None}

    response = client.post('/api/survey/submit', json=data)
    result = json.loads(response.data)
    response_id = result['user_id']

    response = client.get(f'/api/survey/summary/{response_id}')
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['count'] == 5
    assert result['summary'] == {'1': 100, '2': 25, '3': 50, '4': 75}
    assert result['total_questions_count'] == 33
