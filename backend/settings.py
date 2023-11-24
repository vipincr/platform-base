from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

class Config:
    # MongoDB settings
    MONGODB_SETTINGS = {
        'db': os.getenv('MONGODB_DB', 'platform_base'),
        'host': os.getenv('MONGODB_HOST', 'localhost'),
        'port': int(os.getenv('MONGODB_PORT', 27017))
    }

    # Secret key for JWT
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret')  # Change this in production

    # Dramatiq broker settings (Redis)
    DRAMATIQ_BROKER_URL = os.getenv('DRAMATIQ_BROKER_URL', 'redis://localhost:6379')

    # OpenAI API Key
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', 'default_key')

    # LangChain API Key
    LANGCHAIN_API_KEY = os.getenv('LANGCHAIN_API_KEY', 'default_key')

    # Debug mode
    DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'

    # Add other configuration variables as needed
