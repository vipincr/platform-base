from flask import Blueprint, request, jsonify
from .models import User
from flask_jwt_extended import jwt_required, get_jwt_identity

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/create', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')

    # Add validation for email and name as needed

    # Check if user already exists
    if User.objects(email=email).first():
        return jsonify({'message': 'User already exists'}), 409

    new_user = User(email=email, name=name)
    new_user.save()
    return jsonify({'message': 'User created successfully', 'user': str(new_user)}), 201

@user_blueprint.route('/<user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    current_user_id = get_jwt_identity()
    if str(current_user_id) != user_id:
        return jsonify({'message': 'Unauthorized access'}), 403

    user = User.objects(id=user_id).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({'email': user.email, 'name': user.name}), 200

# Additional routes for updating, deleting, and other user operations can be added here.
