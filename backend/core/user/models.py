from flask_mongoengine import MongoEngine

db = MongoEngine()

class User(db.Document):
    email = db.StringField(required=True, unique=True)
    name = db.StringField(required=True)

    # Additional fields can be added as needed, such as password hashes, roles, etc.
    # Example: password_hash = db.StringField(required=True)

    def __str__(self):
        return f"User(email={self.email}, name={self.name})"

    # Additional methods can be added for user-related functionalities
    # Example: password verification, update methods, etc.
