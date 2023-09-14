from app import app


@app.route("/")
def index():
    return "Hello world!"


@app.route("/api/test-content")
def apitest():
    res = {
        "content": "This is the test content"
    }

    return res
