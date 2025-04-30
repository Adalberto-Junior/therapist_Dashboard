#=================================================================================================================
# Author:      Adalberto Júnior
# Date:        2025-04-30
# Version:     1.0
# Python:      3.10
# Local:       UA, Aveiro
# Description: This file contains the routes for the health user management system.
# It includes the routes for getting health user information, updating health user information, and deleting a user.
# It also includes the routes for getting health user results and deleting health user results.
#=================================================================================================================

# Import necessary modules and packages
from flask import request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
import bcrypt
import jwt
import datetime
from . import utente_bp
from models import users as user_model
from models import analysisResult as result_model
from models import exercise as exercise_model
from models import utente as utente_model
from models.creatDocument import *

def decode_token(token):
    """
    Decode the JWT token to get the user ID and username.
    :param token: The JWT token.
    :return: The decoded token data.
    """
    try:
        return jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    
@utente_bp.route('/', methods=['POST'])
def register_utente():
    """
    Register a new health user.
    :return: JSON response with the user ID and a success message.
    """
    token = request.headers.get('Authorization')
    if not token or not token.startswith("Bearer "):
        return jsonify({"error": "Token ausente"}), 401

    try:
        token = token.replace("Bearer ", "")
        decoded = decode_token(token)
        therapist_id = decoded['user_id']
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Token inválido"}), 401

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    observation = data.get('observation')
    medical_condition = data.get('medical_condition')
    date_birth = data.get('date_birth')
    health_user_number = data.get('health_user_number')
    cellphone = data.get('health_user_cellphone')
    address = data.get('health_user_address')

    if utente_bp.get_health_user_by_email(email):
        return jsonify({"error": " Já há utente com este email registrado"}), 400

    docuemnto = CreatDocumentToDB()
    doc = docuemnto.healthUserDocument(name=name, email=email, date_of_birth=date_birth, observation=observation, medical_condition=medical_condition, therapist=therapist_id, health_user_number=health_user_number, cellphone=cellphone, address=address)
    health_user_id = utente_model.create_health_user(doc)

    return jsonify({"message": "Utente registrado com sucesso", "id": str(health_user_id)}), 201

@utente_bp.route('/', methods=['GET'])
def get_utente():
    """
    Get the health users information by Therapist ID.
    :return: JSON response with the health users information.
    """
    token = request.headers.get('Authorization')
    if not token or not token.startswith("Bearer "):
        return jsonify({"error": "Token ausente"}), 401

    try:
        token = token.replace("Bearer ", "")
        decoded = decode_token(token)
        therapistId = decoded['user_id']
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Token inválido"}), 401

    health_users = utente_model.get_all_health_users_by_therapist(therapistId)

    if not health_users:
        return jsonify({"error": "Utentes não encontrado"}), 404

    return jsonify(health_users), 200

