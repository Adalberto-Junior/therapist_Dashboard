import json
from flask import current_app as app
from bson.objectid import ObjectId
from bson import json_util

def create_user(data):
    mongo = app.extensions['pymongo']
    users = mongo.db.user
    result = users.insert_one(data)
    return str(result.inserted_id)

def get_user_by_email(email):
    mongo = app.extensions['pymongo']
    return mongo.db.user.find_one({"email": email})

def get_user_by_id(user_id):
    mongo = app.extensions['pymongo']
    return mongo.db.user.find_one({"_id": ObjectId(user_id)})

def get_user_by_username(username):
    mongo = app.extensions['pymongo']
    return mongo.db.user.find_one({"username": username})

def updateUser(user_id, data):
    mongo = app.extensions['pymongo']
    result = mongo.db.user.update_one({"_id": ObjectId(user_id)}, {"$set": data})
    return result.modified_count > 0

def updateUserByEmail(email, data):
    mongo = app.extensions['pymongo']
    result = mongo.db.user.update_one({"email": email}, {"$set": data})
    return result.modified_count > 0

def deleteUser(user_id):
    mongo = app.extensions['pymongo']
    result = mongo.db.user.delete_one({"_id": ObjectId(user_id)})
    return result.deleted_count > 0

def deleteUserByEmail(email):
    mongo = app.extensions['pymongo']
    result = mongo.db.user.delete_one({"email": email})
    return result.deleted_count > 0

def get_all_users():
    mongo = app.extensions['pymongo']
    return mongo.db.user.find()

def get_all_users_json():
    mongo = app.extensions['pymongo']
    users = mongo.db.user.find()
    return json.loads(json_util.dumps(users))

def get_userId(email):
    mongo = app.extensions['pymongo']
    user = mongo.db.user.find_one({"email": email})
    if user:
        return str(user['_id'])
    else:
        return None