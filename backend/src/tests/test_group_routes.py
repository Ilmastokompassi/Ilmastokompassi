import json


def test_new_group(client):
    group_token = "FOOBAR1"
    response = client.post(
        '/api/groups/new', json={'groupToken': group_token})
    result = json.loads(response.data)

    assert response.status_code == 201
    assert result['group_token'] == group_token


def test_new_group_already_exists(client):
    group_token = "FOOBAR1"

    client.post('/api/groups/new', json={'groupToken': group_token})
    response = client.post(
        '/api/groups/new', json={'groupToken': group_token})
    result = json.loads(response.data)

    assert response.status_code == 409
    assert result['description'] == "Group already exists"


def test_get_group(client):
    group_token = 'FOOBAR3'
    response = client.post(
        '/api/groups/new', json={'groupToken': group_token})

    response = client.get('/api/groups/' + group_token)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['group_token'] == group_token


def test_get_nonexisting_group(client):
    group_token = "NOGROUP"
    response = client.get('/api/groups/' + group_token)
    result = json.loads(response.data)

    assert response.status_code == 404
    assert result['description'] == 'Group not found'


def test_get_group_score(client):
    group_token = 'FOOBAR4'
    response = client.post(
        '/api/groups/new', json={'groupToken': group_token})

    data = {"responses": {"1": 1, "2": 2, "3": 3}, "groupToken": group_token}
    response = client.post('/api/survey/submit', json=data)

    response = client.get(f'/api/groups/{group_token}/score')
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['score'] == {'1': 0, '2': 25, '3': 50}
    assert result['response_amount'] == 1


def test_get_nonexisting_group_score(client):
    group_token = 'NOGROUP'
    response = client.get(f'/api/groups/{group_token}/score')
    result = json.loads(response.data)

    assert response.status_code == 404
    assert result['description'] == 'Group not found'
