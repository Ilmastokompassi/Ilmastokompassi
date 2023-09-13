from app import app


@app.route("/")
def index():
    return "Hello world!"


@app.route("/apitest")
def apitest():
    res = {
        "content": "This is the content"
    }

    return res
