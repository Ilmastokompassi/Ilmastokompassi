from app import app


@app.route("/")
def index():
    return "Hello world!"


@app.route("/api/test")
def apitest():
    res = {
        "content": "This is the content"
    }

    return res
