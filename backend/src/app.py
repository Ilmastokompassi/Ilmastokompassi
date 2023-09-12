from flask import Flask

app = Flask(__name__)

import routes # pylint: disable=unused-import, wrong-import-position, cyclic-import
