from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello world!"

@app.route("/hello1")
def index():
    return "Hello world! 1"