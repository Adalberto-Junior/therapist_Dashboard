# Import necessary modules and packages
import base64
from flask import request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from pymongo.cursor import Cursor
import bcrypt
import jwt
import datetime
from . import casaViva_bp
# from models import users as user_model
from models import therapist as therapist_model
from models import users as user_model
from models.creatDocument import *

