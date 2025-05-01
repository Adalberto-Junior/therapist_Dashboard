#=====================================================================
# File: exercise.py
# Created by: Adalberto Jr
# Created date: 30/04/2025
# Version: 1.0
# Python: 3.10
# Local: Universidade de Aveiro
# Description: This module is responsible for managing the exercise data.
#              It includes functions to create, update, delete and get exercise data.
#=====================================================================
#

# # Import necessary modules and packages
from flask import current_app as app
from bson.objectid import ObjectId
from bson import json_util
import json
from datetime import datetime

def create_exercise(data):
    """
    Create a new exercise in the database.
    :param data: JSON string containing exercise data.
    :return: The ID of the created exercise.
    """

    # Convert JSON string to dictionary
    #data = json.loads(data)
    mongo = app.extensions['pymongo']
    exercises = mongo.db.exercise
    result = exercises.insert_one(data)
    return str(result.inserted_id)

def crearte_many_exercise(data):
    """
    Create multiple exercises in the database.
    :param data: JSON string containing exercise data.
    :return: The IDs of the created exercises.
    """
    # Convert JSON string to dictionary
    #data = json.loads(data)
    # Convert the data to a list of dictionaries if it's not already
    if not isinstance(data, list):
        data = [data]

    mongo = app.extensions['pymongo']
    exercises = mongo.db.exercise
    result = exercises.insert_many(data)
    return str(result.inserted_ids)

def get_exercise_by_id(exercise_id):
    """
    Get an exercise by its ID.
    :param exercise_id: The ID of the exercise.
    :return: The exercise data as a dictionary.
    """

    mongo = app.extensions['pymongo']
    return mongo.db.exercise.find_one({"_id": ObjectId(exercise_id)})

def get_exercise_by_name(name):
    """
    Get an exercise by its name.
    :param name: The name of the exercise.
    :return: The exercise data as a dictionary.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.exercise.find_one({"name": name})

def get_exercise_by_type(type):
    """
    Get an exercise by its type.
    :param type: The type of the exercise.
    :return: The exercise data as a dictionary.
    """

    mongo = app.extensions['pymongo']
    return mongo.db.exercise.find_one({"type": type})

def get_exercise_by_user(user_name):
    """
    Get all exercises by user name.
    :param user_name: The name of the user.
    :return: A list of exercises as dictionaries.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.exercise.find({"userName": user_name})

def get_exercise_by_health_user(user_id):
    """
    Get all exercises by health user ID.
    :param user_id: The ID of the health user.
    :return: A list of exercises as dictionaries.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.exercise.find({"user": ObjectId(user_id)})

def get_exercise_by_user_and_type(user_name, type):
    """
    Get all exercises by user name and type.
    :param user_name: The name of the user.
    :param type: The type of the exercise.
    :return: A list of exercises as dictionaries.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.exercise.find({"userName": user_name, "type": type})

def get_exercise_by_user_and_name(user_name, name):
    """
    Get an exercise by user name and name.
    :param user_name: The name of the user.
    :param name: The name of the exercise.
    :return: The exercise data as a dictionary.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.exercise.find({"userName": user_name, "name": name})

def get_exercise_by_user_and_name_and_type(user_name, name, type):
    """
    Get an exercise by user name, name, and type.
    :param user_name: The name of the user.
    :param name: The name of the exercise.
    :param type: The type of the exercise.
    :return: The exercise data as a dictionary.
    """

    mongo = app.extensions['pymongo']
    return mongo.db.exercise.find({"userName": user_name, "name": name, "type": type})

def update_exercise(exercise_id, data):
    """
    Update an exercise by its ID.
    :param exercise_id: The ID of the exercise.
    :param data: The updated exercise data as a dictionary.
    :return: True if the update was successful, False otherwise.
    """
    # Convert JSON string to dictionary
    data = json.loads(data)
    mongo = app.extensions['pymongo']
    result = mongo.db.exercise.update_one({"_id": ObjectId(exercise_id)}, {"$set": data})
    return result.modified_count > 0

def update_exercise_by_name(name, data):
    """
    Update an exercise by its name.
    :param name: The name of the exercise.
    :param data: The updated exercise data as a dictionary.
    :return: True if the update was successful, False otherwise.
    """
    # Convert JSON string to dictionary
    data = json.loads(data)
    mongo = app.extensions['pymongo']
    result = mongo.db.exercise.update_one({"name": name}, {"$set": data})
    return result.modified_count > 0

def delete_exercise(exercise_id):
    """
    Delete an exercise by its ID.
    :param exercise_id: The ID of the exercise.
    :return: True if the deletion was successful, False otherwise.
    """
    
    mongo = app.extensions['pymongo']
    result = mongo.db.exercise.delete_one({"_id": ObjectId(exercise_id)})
    return result.deleted_count > 0

def delete_exercise_by_name(name):
    """
    Delete an exercise by its name.
    :param name: The name of the exercise.
    :return: True if the deletion was successful, False otherwise.
    """

    mongo = app.extensions['pymongo']
    result = mongo.db.exercise.delete_one({"name": name})
    return result.deleted_count > 0

def delete_exercise_by_user(user_name):
    """
    Delete all exercises of a user by their name.
    :param user_name: The name of the user.
    :return: True if the deletion was successful, False otherwise.
    """
    mongo = app.extensions['pymongo']
    result = mongo.db.exercise.delete_many({"userName": user_name})
    return result.deleted_count > 0

#this function deletes all exercises of a user with a specific name
def delete_exercise_by_user_and_name(user_name, name):
    """
    Delete all exercises of a user by their name and exercise name.
    :param user_name: The name of the user.
    :param name: The name of the exercise.
    :return: True if the deletion was successful, False otherwise.
    """ 
    mongo = app.extensions['pymongo']
    result = mongo.db.exercise.delete_many({"userName": user_name, "name": name})
    return result.deleted_count > 0

def delete_exercise_by_user_and_name_and_type(user_name, name, type):
    """
    Delete all exercises of a user by their name, exercise name, and type.
    :param user_name: The name of the user.
    :param name: The name of the exercise.
    :param type: The type of the exercise.
    :return: True if the deletion was successful, False otherwise.
    """
    mongo = app.extensions['pymongo']
    result = mongo.db.exercise.delete_many({"userName": user_name, "name": name, "type": type})
    return result.deleted_count > 0

def get_exercise_id_by_user_and_name_and_type(user_name, name, type):
    """
    Get the ID of an exercise by user name, exercise name, and type.
    :param user_name: The name of the user.
    :param name: The name of the exercise.
    :param type: The type of the exercise.
    :return: The ID of the exercise as a string, or None if not found.
    """
    mongo = app.extensions['pymongo']
    result = mongo.db.exercise.find_one({"userName": user_name, "name": name, "type": type})
    if result:
        return str(result['_id'])
    else:
        return None

