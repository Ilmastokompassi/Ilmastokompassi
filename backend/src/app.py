from . import create_app
from .config import EnvironmentConfig

app = create_app(EnvironmentConfig)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
