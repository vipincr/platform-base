from flask_mongoengine import MongoEngine
from ..user.models import User  # Importing the User model for reference

db = MongoEngine()

class Settings(db.Document):
    user = db.ReferenceField(User, required=True)
    global_settings = db.DictField()
    user_specific_settings = db.DictField()

    def __str__(self):
        return f"Settings(User={self.user.email})"

    # Additional methods can be added for settings-related functionalities
    # For example, methods to update global or user-specific settings
