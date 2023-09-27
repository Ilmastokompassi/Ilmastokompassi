from os import environ

# Base Config - not used directly
class Config:
    DEVELOPMENT = False
    DATABASE_URI = None
    SECRET_KEY = None

# Development Config
class DevelopmentConfig(Config):
    DEVELOPMENT = True
    # Sample values before PostgreSQL setup
    DATABASE_URI = "sqlite:///:memory:"
    SECRET_KEY = "secret"

# Production Config
class ProductionConfig(Config):
    DEVELOPMENT = False
    DATABASE_URI = environ.get("DATABASE_URI")
    SECRET_KEY = environ.get("SECRET_KEY")

config = {
    "Development": DevelopmentConfig,
    "Production": ProductionConfig
}
