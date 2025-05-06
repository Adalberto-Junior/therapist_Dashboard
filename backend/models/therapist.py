#=========================================================================
# File: therapist.py
# Created by: Adalberto Jr
# Created date: 05/05/2025
# Version: 1.0
# Python: 3.10
# Local: Universidade de Aveiro
# Description: This module contains functions to interact with the therapist collection in MongoDB.
#              It includes functions to create, update, delete and retrieve therapist data.
#              The module uses Flask and PyMongo for database operations.
#=========================================================================


# # Import necessary modules and packages
import json
import sys
from flask import current_app as app
from bson.objectid import ObjectId
from bson import json_util

sys.path.append("..")
from extensions import mongo

def create_therapist(data):
    """
    Create a new therapist in the database.
    :param data: JSON string containing therapist data.
    :return: The ID of the created therapist.
    """

    # mongo = app.extensions['pymongo']
    therapists = mongo.db.therapist
    # therapists = mongo.db.therapist
    result = therapists.insert_one(data)
    return str(result.inserted_id)

def get_therapist_by_email(email):
    """
    Get a therapist by their email address.
    :param email: The email address of the therapist.
    :return: The therapist data as a dictionary.
    """

    # mongo = app.extensions['pymongo']
    return mongo.db.therapist.find_one({"email": email})

def get_therapist_by_id(therapist_id):
    """
    Get a therapist by their ID.
    :param therapist_id: The ID of the therapist.
    :return: The therapist data as a dictionary.
    """

    # mongo = app.extensions['pymongo']
    return mongo.db.therapist.find_one({"_id": ObjectId(therapist_id)})

def get_therapist_by_name(therapistName):
    """
    Get a therapist by their therapistName.
    :param therapistName: The therapistName of the therapist.
    :return: The therapist data as a dictionary.
    """

    # mongo = app.extensions['pymongo']
    return mongo.db.therapist.find_one({"name": therapistName})

def updatetherapist(therapist_id, data):
    """
    Update a therapist by their ID.
    :param therapist_id: The ID of the therapist.
    :param data: The data to update the therapist with.
    :return: True if the update was successful, False otherwise.
    """

    # mongo = app.extensions['pymongo']
    result = mongo.db.therapist.update_one({"_id": ObjectId(therapist_id)}, {"$set": data})
    return result.modified_count > 0

def update_therapist_By_Email(email, data):
    """
    Update a therapist by their email address.
    :param email: The email address of the therapist.
    :param data: The data to update the therapist with.
    :return: True if the update was successful, False otherwise.
    """

    # mongo = app.extensions['pymongo']
    result = mongo.db.therapist.update_one({"email": email}, {"$set": data})
    return result.modified_count > 0

def delete_therapist(therapist_id):
    """
    Delete a therapist by their ID.
    :param therapist_id: The ID of the therapist.
    :return: True if the deletion was successful, False otherwise.
    """

    # mongo = app.extensions['pymongo']
    result = mongo.db.therapist.delete_one({"_id": ObjectId(therapist_id)})
    return result.deleted_count > 0

def delete_therapist_By_Email(email):
    """
    Delete a therapist by their email address.
    :param email: The email address of the therapist.
    :return: True if the deletion was successful, False otherwise.
    """

    # mongo = app.extensions['pymongo']
    result = mongo.db.therapist.delete_one({"email": email})
    return result.deleted_count > 0

def get_all_therapists():
    """
    Get all therapists from the database.
    :return: A cursor to the therapist data.
    """
    # mongo = app.extensions['pymongo']
    return mongo.db.therapist.find()

def get_all_therapists_json():
    """
    Get all therapists from the database and convert to JSON.
    :return: A JSON string containing all therapist data.
    """
    # Get all therapists from the database
    # mongo = app.extensions['pymongo']
    therapists = mongo.db.therapist.find()
    return json.loads(json_util.dumps(therapists))

def get_therapistId(email):
    """
    Get the therapist ID by email address.
    :param email: The email address of the therapist.
    :return: The therapist ID as a string, or None if not found.
    """
    
    # mongo = app.extensions['pymongo']
    therapist = mongo.db.therapist.find_one({"email": email})
    if therapist:
        return str(therapist['_id'])
    else:
        return None