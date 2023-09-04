from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello world!"

@app.route("/hello1")
def index():
    return "Hello world! 1"

@app.route("/hello2")
def index():
    return "Hello world! 2"

@app.route("/mika")
def index():
    return "Mika"