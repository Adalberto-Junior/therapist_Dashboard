from flask import current_app as app
from bson.objectid import ObjectId
from bson import json_util
import json
from datetime import datetime

def get_result_by_id(result_id):
    """
    Get a result by its ID.
    :param result_id: The ID of the result.
    :return: The result data as a dictionary.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find_one({"_id": ObjectId(result_id)})

def get_result_by_user(user_id):
    """
    Get all results for a specific user.
    :param user_id: The ID of the user.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"user": ObjectId(user_id)})

def get_result_by_exercise(exercise_id):
    """
    Get all results for a specific exercise.
    :param exercise_id: The ID of the exercise.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"exercise":ObjectId(exercise_id)})

def get_result_by_exercise_and_user(exercise_id, user_id):
    """
    Get all results for a specific exercise and user.
    :param exercise_id: The ID of the exercise.
    :param user_id: The ID of the user.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"exercise": ObjectId(exercise_id), "user": ObjectId(user_id)})

def get_result_by_recording(recording_id):
    """
    Get all results for a specific recording.
    :param recording_id: The ID of the recording.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"recording": ObjectId(recording_id)})

def get_result_by_recording_and_user(recording_id, user_id):
    """
    Get all results for a specific recording and user.
    :param recording_id: The ID of the recording.
    :param user_id: The ID of the user.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"recording": ObjectId(recording_id), "user": ObjectId(user_id)})

def get_result_by_recording_and_step(recording_id, step):
    """
    Get all results for a specific recording and step.
    :param recording_id: The ID of the recording.
    :param step: The step number.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"recording": ObjectId(recording_id), "step": step})

def get_result_by_recording_and_step_and_user(recording_id, step, user_id):
    """
    Get all results for a specific recording, step, and user.
    :param recording_id: The ID of the recording.
    :param step: The step number.
    :param user_id: The ID of the user.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"recording": ObjectId(recording_id), "step": step, "user": ObjectId(user_id)})

def get_result_by_user_and_step(user_id, step):
    """
    Get all results for a specific user and step.
    :param user_id: The ID of the user.
    :param step: The step number.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"user": ObjectId(user_id), "step": step})

def get_result_by_user_and_date(user_id, date):
    """
    Get all results for a specific user and date.
    :param user_id: The ID of the user.
    :param date: The date of the results.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"user": ObjectId(user_id), "date": date})

def get_result_by_user_and_date_and_step(user_id, date, step):
    """
    Get all results for a specific user, date, and step.
    :param user_id: The ID of the user.
    :param date: The date of the results.
    :param step: The step number.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"user": ObjectId(user_id), "date": date, "step": step})

def get_result_by_recording_and_date(recording_id, date):
    """
    Get all results for a specific recording and date.
    :param recording_id: The ID of the recording.
    :param date: The date of the results.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"recording": ObjectId(recording_id), "date": date})

def get_result_by_recording_and_date_and_step(recording_id, date, step):
    """
    Get all results for a specific recording, date, and step.
    :param recording_id: The ID of the recording.
    :param date: The date of the results.
    :param step: The step number.
    :return: A cursor to the results.
    """
    mongo = app.extensions['pymongo']
    return mongo.db.results.find({"recording": ObjectId(recording_id), "date": date, "step": step})

def delete_result(result_id):
    """
    Delete a result by its ID.
    :param result_id: The ID of the result.
    :return: True if the deletion was successful, False otherwise.
    """
    mongo = app.extensions['pymongo']
    result = mongo.db.results.delete_one({"_id": ObjectId(result_id)})
    return result.deleted_count > 0

def delete_result_by_user(user_id):
    """
    Delete all results for a specific user.
    :param user_id: The ID of the user.
    :return: True if the deletion was successful, False otherwise.
    """

    mongo = app.extensions['pymongo']
    result = mongo.db.results.delete_many({"user": ObjectId(user_id)})
    return result.deleted_count > 0

def delete_result_by_user_and_date(user_id, date):
    """
    Delete all results for a specific user and date.
    :param user_id: The ID of the user.
    :param date: The date of the results.
    :return: True if the deletion was successful, False otherwise.
    """
    mongo = app.extensions['pymongo']
    result = mongo.db.results.delete_many({"user": ObjectId(user_id), "date": date})
    return result.deleted_count > 0

def delete_result_by_recording_user_and_date(recording_id, user_id, date):
    """
    Delete all results for a specific recording, user, and date.
    :param recording_id: The ID of the recording.
    :param user_id: The ID of the user.
    :param date: The date of the results.
    :return: True if the deletion was successful, False otherwise.
    """
    mongo = app.extensions['pymongo']
    result = mongo.db.results.delete_many({"recording": ObjectId(recording_id), "user": ObjectId(user_id), "date": date})
    return result.deleted_count > 0

def delete_result_by_recording_user_date_and_step(recording_id, user_id, date, step):
    """
    Delete all results for a specific recording, user, date, and step.
    :param recording_id: The ID of the recording.
    :param user_id: The ID of the user.
    :param date: The date of the results.
    :param step: The step number.
    :return: True if the deletion was successful, False otherwise.
    """
    mongo = app.extensions['pymongo']
    result = mongo.db.results.delete_many({"recording": ObjectId(recording_id), "user": ObjectId(user_id), "date": date, "step": step})
    return result.deleted_count > 0


def get_resultId_by_recording_user_date_and_step(recording_id, user_id, date, step):
    """
    Get the result ID for a specific recording, user, date, and step.
    :param recording_id: The ID of the recording.
    :param user_id: The ID of the user.
    :param date: The date of the results.
    :param step: The step number.
    :return: The result ID as a string if found, None otherwise.
    """
    mongo = app.extensions['pymongo']
    result = mongo.db.results.find_one({"recording": ObjectId(recording_id), "user": ObjectId(user_id), "date": date, "step": step})
    if result:
        return str(result['_id'])
    else:
        return None
