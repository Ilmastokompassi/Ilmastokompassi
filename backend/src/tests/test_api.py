import json


def test_ping(client):
    response = client.get('/api/ping')

    assert response.status_code == 200
    assert response.data == b'pong'


def test_config(client):
    response = client.get('/api/config')
    result = json.loads(response.data)

    assert response.status_code == 200
    assert result['environment'] == 'dev'
