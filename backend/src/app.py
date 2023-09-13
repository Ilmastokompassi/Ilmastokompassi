from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


import routes  # pylint: disable=unused-import, wrong-import-position, cyclic-import # nopep8
