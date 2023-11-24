from flask import Flask
from flask_jwt_extended import JWTManager
from flask_mongoengine import MongoEngine
from .core.user.routes import user_blueprint
from .core.settings.routes import settings_blueprint
from .graphql_schema import schema
from flask_graphql import GraphQLView
from .dramatiq_setup import broker  # Import Dramatiq broker setup
from .settings import Config  # Import configuration settings

# Initialize Flask application with external settings
app = Flask(__name__)
app.config.from_object(Config)

# Initialize MongoEngine with app
db = MongoEngine(app)

# Initialize JWTManager with app
jwt = JWTManager(app)

# Register user and settings blueprints
app.register_blueprint(user_blueprint, url_prefix='/user')
app.register_blueprint(settings_blueprint, url_prefix='/settings')

# Setup GraphQL endpoint
app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True  # Set to False in production
    )
)

# Start Dramatiq worker with Flask app
@app.before_first_request
def start_dramatiq():
    broker.emit_after("process_boot")

# Default route for testing
@app.route('/')
def hello_world():
    return 'Hello, World from Platform-Base!'

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])  # Debug mode based on config
