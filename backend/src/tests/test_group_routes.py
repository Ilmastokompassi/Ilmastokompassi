import json


def test_new_group(client):
    group_token = "FOOBAR1"
    response = client.post('/api/groups/new', json={'token': group_token})
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['status'] == 'success'


def test_group_get_survey_summary(client):
    group_token = 'FOOBAR2'
    response = client.post('/api/groups/new', json={'token': group_token})
    response = client.get(f'/api/groups/{group_token}/survey/summary')
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['status'] == 'success'
    assert result['message'] == 'Group exists'


def test_nonexisting_group_summary(client):
    group_token = 'NOGROUP'
    response = client.get(f'/api/groups/{group_token}/survey/summary')
    result = json.loads(response.data)

    assert response.status_code == 400
    assert result['status'] == 'fail'
    assert result['message'] == 'Group does not exist'


def test_get_group(client):
    group_token = 'FOOBAR3'
    response = client.post('/api/groups/new', json={'token': group_token})

    response = client.get('/api/groups/' + group_token)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result == {'group_token': True}


def test_get_nonexisting_group(client):
    group_token = "NOGROUP"
    response = client.get('/api/groups/' + group_token)
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result == {'group_token': False}


def test_get_group_score(client):
    group_token = 'FOOBAR4'
    response = client.post('/api/groups/new', json={'token': group_token})

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

    assert response.status_code == 400
    assert result['status'] == 'fail'
    assert result['message'] == 'Group does not exist'
