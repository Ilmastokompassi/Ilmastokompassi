from os import environ
from . import create_app

app = create_app(environ.get("ENVIRONMENT"))

if __name__ == "__main__":
    app.run(host="0.0.0.0")
