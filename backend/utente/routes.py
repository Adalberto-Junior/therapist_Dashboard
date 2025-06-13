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
from flask import request, jsonify, current_app, make_response
from pymongo.cursor import Cursor
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
import bcrypt
import jwt
import datetime
from . import utente_bp
# from models import users as user_model
# from models import therapist as therapist_model
from models import analysisResult as result_model
from models import exercise as exercise_model
from models import utente as utente_model
from models import users as user_model
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
    email = data.get('email').lower()
    observation = data.get('observation')
    medical_condition = data.get('medical_condition')
    date_birth = data.get('date_birth')
    health_user_number = data.get('health_user_number')
    cellphone = data.get('health_user_cellphone')
    address = data.get('health_user_address')

    if utente_model.get_health_user_by_email(email):
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
    
    if isinstance(health_users, Cursor):
        health_users = list(health_users)

    return jsonify(health_users), 200

@utente_bp.route('/informacao/<string:user_id>', methods=['GET'])
def get_utente_by_id(user_id):
    """
    Get the health user information by user ID.
    :param user_id: The ID of the health user.
    :return: JSON response with the health user information.
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

    health_user = utente_model.get_health_user_by_id(user_id)

    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    # response_data = health_user
    # response = make_response(jsonify(response_data))
    # response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    # response.headers["Pragma"] = "no-cache"
    # response.headers["Expires"] = "0"
    
    # return response

    # return jsonify(list(health_user)), 200
    return jsonify(health_user), 200

@utente_bp.route('/informacao/<string:user_id>', methods=['PUT'])
def update_utente(user_id):
    """
    Update the health user information by user ID.
    :param user_id: The ID of the health user.
    :return: JSON response with a success message.
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

    data = request.get_json()
    name = data.get('name')
    email = data.get('email').lower()
    observation = data.get('observation')
    medical_condition = data.get('medical_condition')
    date_birth = data.get('date_of_birth')
    health_user_number = data.get('health_user_number')
    cellphone = data.get('cellphone')
    address = data.get('address')

    documento = CreatDocumentToDB()
    doc = documento.healthUserDocument(name=name, email=email, date_of_birth=date_birth, observation=observation, medical_condition=medical_condition, therapist=therapistId, health_user_number=health_user_number, cellphone=cellphone, address=address)


    health_user = utente_model.update_health_user(user_id, doc)

    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    return jsonify({"message": "Utente atualizado com sucesso"}), 200

@utente_bp.route('/informacao/<string:user_id>', methods=['DELETE'])
def delete_utente(user_id):
    """
    Delete the health user by user ID.
    :param user_id: The ID of the health user.
    :return: JSON response with a success message.
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

    health_user = utente_model.get_health_user_by_id(user_id)

    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    utente_model.delete_health_user(user_id)

    return jsonify({"message": "Utente deletado com sucesso"}), 200

@utente_bp.route('/informacao/<string:health_user_name>', methods=['GET'])
def get_utente_by_name(health_user_name):
    """
    Get the health user information by user name and therapist id.
    :param health_user_name: The name of the health user.
    :return: JSON response with the health user information.
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

    health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)

    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404

    return jsonify(health_user), 200


@utente_bp.route('/<string:user_id>/analise/fonacao', methods=['GET'])
def get_analise_fonacao(user_id):
    """
    Get the phonation analysis results for a specific health user by their id.
    :param user_id: The id of the health user.
    :return: JSON response with the analysis results.
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

    # health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)

    health_user = utente_model.get_health_user_by_id(user_id)
    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    casa_viva_user = user_model.get_user_by_email(health_user['email'])

    if not casa_viva_user:
        return jsonify({"error": "Utente não corresponde ao utilizador da casa viva"}), 404

    analysis_results = result_model.get_result_by_user_and_processingtype(casa_viva_user['_id'],'phonation')

    if not analysis_results:
        return jsonify({"error": "Resultados de análise não encontrados"}), 404
    
    if isinstance(analysis_results, Cursor):
        analysis_results = list(analysis_results)

    return jsonify(analysis_results), 200

@utente_bp.route('/<string:user_id>/analise/articulacao', methods=['GET'])
def get_analise_articulacao(user_id):
    """
    Get the articulation analysis results for a specific health user by their id.
    :param user_id: The id of the health user.
    :return: JSON response with the articulation analysis results.
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

    # health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)

    health_user = utente_model.get_health_user_by_id(user_id)
    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    casa_viva_user = user_model.get_user_by_email(health_user['email'])

    if not casa_viva_user:
        return jsonify({"error": "Utente não corresponde ao utilizador da casa viva"}), 404

    analysis_results = result_model.get_result_by_user_and_processingtype(casa_viva_user['_id'],'articulation')

    if not analysis_results:
        return jsonify({"error": "Resultados de análise não encontrados"}), 404
    
    if isinstance(analysis_results, Cursor):
        analysis_results = list(analysis_results)

    return jsonify(analysis_results), 200

@utente_bp.route('/<string:user_id>/analise/prosodia', methods=['GET'])
def get_analise_prosodia(user_id):
    """
    Get the prosody analysis results for a specific health user by their id.
    :param user_id: The id of the health user.
    :return: JSON response with the prosody analysis results.
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

    # health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)

    health_user = utente_model.get_health_user_by_id(user_id)
    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    casa_viva_user = user_model.get_user_by_email(health_user['email'])

    if not casa_viva_user:
        return jsonify({"error": "Utente não corresponde ao utilizador da casa viva"}), 404

    analysis_results = result_model.get_result_by_user_and_processingtype(casa_viva_user['_id'],'prosody')

    if not analysis_results:
        return jsonify({"error": "Resultados de análise não encontrados"}), 404
    
    if isinstance(analysis_results, Cursor):
        analysis_results = list(analysis_results)

    return jsonify(analysis_results), 200

@utente_bp.route('/<string:user_id>/analise/glotal', methods=['GET'])
def get_analise_glotal(user_id):
    """
    Get the glottal analysis results for a specific health user by their id.
    :param user_id: The id of the health user.
    :return: JSON response with the glottal analysis results.
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

    # health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)

    health_user = utente_model.get_health_user_by_id(user_id)
    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    casa_viva_user = user_model.get_user_by_email(health_user['email'])

    if not casa_viva_user:
        return jsonify({"error": "Utente não corresponde ao utilizador da casa viva"}), 404

    analysis_results = result_model.get_result_by_user_and_processingtype(casa_viva_user['_id'],'glottal')

    if not analysis_results:
        return jsonify({"error": "Resultados de análise não encontrados"}), 404
    
    if isinstance(analysis_results, Cursor):
        analysis_results = list(analysis_results)

    return jsonify(analysis_results), 200

@utente_bp.route('/<string:user_id>/analise/reaprendizado', methods=['GET'])
def get_analise_reaprendizado(user_id):
    """
    Get the replearning analysis results for a specific health user by their id.
    :param user_id: The id of the health user.
    :return: JSON response with the replearning analysis results.
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

    # health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)

    health_user = utente_model.get_health_user_by_id(user_id)
    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    casa_viva_user = user_model.get_user_by_email(health_user['email'])

    if not casa_viva_user:
        return jsonify({"error": "Utente não corresponde ao utilizador da casa viva"}), 404

    analysis_results = result_model.get_result_by_user_and_processingtype(casa_viva_user['_id'],'replearning')

    if not analysis_results:
        return jsonify({"error": "Resultados de análise não encontrados"}), 404
    
    if isinstance(analysis_results, Cursor):
        analysis_results = list(analysis_results)

    return jsonify(analysis_results), 200

@utente_bp.route('/<string:user_id>/analise/fonologica', methods=['GET'])
def get_analise_fonologica(user_id):
    """
    Get the phonological analysis results for a specific health user by their id.
    :param user_id: The id of the health user.
    :return: JSON response with the phonological analysis results.
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

    # health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)

    health_user = utente_model.get_health_user_by_id(user_id)
    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    casa_viva_user = user_model.get_user_by_email(health_user['email'])

    if not casa_viva_user:
        return jsonify({"error": "Utente não corresponde ao utilizador da casa viva"}), 404

    analysis_results = result_model.get_result_by_user_and_processingtype(casa_viva_user['_id'],'phonological')

    if not analysis_results:
        return jsonify({"error": "Resultados de análise não encontrados"}), 404
    
    if isinstance(analysis_results, Cursor):
        analysis_results = list(analysis_results)

    return jsonify(analysis_results), 200

@utente_bp.route('/<string:user_id>/analise/<string:analise_Id>', methods=['Delete'])
def delete_analise(user_id, analise_Id):
    """
    Delete a specific analysis result by its ID for a specific health user by their id.
    :param user_id: The id of the health user.
    :param analise_Id: The ID of the analysis result to be deleted.
    :return: JSON response with a success message.
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

    # health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)

    health_user = utente_model.get_health_user_by_id(user_id)
    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    casa_viva_user = user_model.get_user_by_email(health_user['email'])

    if not casa_viva_user:
        return jsonify({"error": "Utente não corresponde ao utilizador da casa viva"}), 404

    result = result_model.delete_result(analise_Id)

    if not result:
        return jsonify({"error": "Resultado de análise não encontrado"}), 404
    
    return jsonify({"message": "Resultado de análise deletado com sucesso"}), 200

@utente_bp.route('/<string:user_id>/analise/<string:type_of_processing>/<string:date>', methods=['DELETE'])
def delete_analise_by_type_and_date(user_id, type_of_processing, date):
    """
    Delete all analysis results of a specific type and date for a specific health user by their id.
    :param user_id: The id of the health user.
    :param type_of_processing: The type of processing (e.g., 'phonation', 'articulation').
    :param date: The date of the analysis results to be deleted.
    :return: JSON response with a success message.
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

    # health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)

    health_user = utente_model.get_health_user_by_id(user_id)
    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    casa_viva_user = user_model.get_user_by_email(health_user['email'])

    if not casa_viva_user:
        return jsonify({"error": "Utente não corresponde ao utilizador da casa viva"}), 404

    result = result_model.delete_result_by_user_type_and_date(casa_viva_user['_id'], type_of_processing, date)

    if not result:
        return jsonify({"error": "Resultados de análise não encontrados"}), 404
    
    return jsonify({"message": "Resultados de análise deletados com sucesso"}), 200

@utente_bp.route('/<string:user_id>/exercicio/', methods=['GET'])
def get_exercicios(user_id):
    """
    Get the exercises for a specific health user by their id.
    :param user_id: The id of the health user.
    :return: JSON response with the exercises.
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

    # health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)

    health_user = utente_model.get_health_user_by_id(user_id)

    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    casa_viva_user = user_model.get_user_by_email(health_user['email'])

    if not casa_viva_user:
        return jsonify({"error": "Utente não corresponde ao utilizador da casa viva"}), 404

    exercises = exercise_model.get_exercise_by_health_user(casa_viva_user['_id'])

    if not exercises:
        return jsonify({"error": "Exercícios não encontrados"}), 404
    
    if isinstance(exercises, Cursor):
        exercises = list(exercises)

    return jsonify(exercises), 200

@utente_bp.route('/exercicio/<string:exercise_id>/', methods=['GET'])
def get_exercicio(exercise_id):
    """
    Get the a specific exercise by their id.
    :param exercise_id: The id of the health user.
    :return: JSON response with the exercise.
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

    exercise = exercise_model.get_exercise_by_id(exercise_id)

    if not exercise:
        return jsonify({"error": "Exercício não encontrados"}), 404
    
    # if isinstance(exercises, Cursor):
    #     exercises = list(exercises)

    return jsonify(exercise), 200

@utente_bp.route('/<string:user_id>/exercicio/', methods=['POST'])
def add_exercicio(user_id):
    """
    Add a new exercise for a specific health user by their id.
    :param user_id: The name of the health user.
    :return: JSON response with the exercise ID and a success message.
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

    # health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)

    health_user = utente_model.get_health_user_by_id(user_id)
    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    casa_viva_user = user_model.get_user_by_email(health_user['email'])

    if not casa_viva_user:
        return jsonify({"error": "Utente não corresponde ao utilizador da casa viva"}), 404

    data = request.get_json()
    name = data.get('name')
    type = data.get('type')
    description = data.get('description')
    typeOfProcessing = data.get('typeOfProcessing')
    # video_url = data.get('video_url')
    steps = data.get('steps')

    if exercise_model.get_exercise_by_name(name):
        return jsonify({"error": "Já há exercício com este nome registrado"}), 400

    docuemnto = CreatDocumentToDB()
    doc = docuemnto.exerciseDocument(name=name, type=type, description=description, userName=casa_viva_user['name'], user=casa_viva_user['_id'], steps=steps,typeOfProcessing=typeOfProcessing, therapist=therapistId)
    
    exercise_id = exercise_model.create_exercise(doc)

    return jsonify({"message": "Exercício adicionado com sucesso", "id": str(exercise_id)}), 201

#TODO: Verificar isso
@utente_bp.route('/<string:user_id>/exercicio/update/<string:exercise_id>', methods=['PUT'])
def update_exercicio(user_id, exercise_id):
    """
    Update an existing exercise for a specific health user by their id.
    :param user_id: The id of the health user.
    :param exercise_id: The ID of the exercise to be updated.
    :return: JSON response with a success message.
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

    # health_user = utente_model.get_health_user_by_username_and_therapist(health_user_name, therapistId)
    health_user = utente_model.get_health_user_by_id(user_id)

    if not health_user:
        return jsonify({"error": "Utente não encontrado"}), 404
    
    casa_viva_user = user_model.get_user_by_email(health_user['email'])

    if not casa_viva_user:
        return jsonify({"error": "Utente não corresponde ao utilizador da casa viva"}), 404

    data = request.get_json()
    name = data.get('name')
    type = data.get('type')
    description = data.get('description')
    video_url = data.get('video_url')
    steps = data.get('steps')

    docuemnto = CreatDocumentToDB()
    doc = docuemnto.exerciseDocument(name=name, type=type, description=description, userName=casa_viva_user['name'], user=casa_viva_user['_id'], steps=steps)
    exercise = exercise_model.update_exercise(exercise_id, doc)

    if not exercise:
        return jsonify({"error": "Exercício não encontrado"}), 404
    
    return jsonify({"Sucess": "Exercício atualizado com sucesso"}), 200


