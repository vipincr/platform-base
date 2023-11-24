from flask import Blueprint, request, jsonify
from .models import Settings
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..user.models import User

settings_blueprint = Blueprint('settings', __name__)

@settings_blueprint.route('/', methods=['GET'])
@jwt_required()
def get_settings():
    current_user_id = get_jwt_identity()
    user = User.objects(id=current_user_id).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    settings = Settings.objects(user=user).first()
    if not settings:
        return jsonify({'message': 'Settings not found'}), 404

    return jsonify({'global_settings': settings.global_settings, 'user_specific_settings': settings.user_specific_settings}), 200

@settings_blueprint.route('/update', methods=['PUT'])
@jwt_required()
def update_settings():
    current_user_id = get_jwt_identity()
    user = User.objects(id=current_user_id).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    settings_data = request.get_json()
    settings = Settings.objects(user=user).first()
    if not settings:
        settings = Settings(user=user)

    settings.global_settings = settings_data.get('global_settings', {})
    settings.user_specific_settings = settings_data.get('user_specific_settings', {})
    settings.save()

    return jsonify({'message': 'Settings updated successfully'}), 200

# Additional routes for specific settings operations can be added here.
