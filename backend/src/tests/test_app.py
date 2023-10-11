
def test_index_route(client):
    response = client.get('/api/ping')
    assert response.status_code == 200
    assert response.data == b'pong'


def test_index_route(client):
    response = client.get('/api/question')
    assert response.status_code == 200
    assert response.data == b'pong'
