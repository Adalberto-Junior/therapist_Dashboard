#============================================================================================
#============================================================================================
# Project:       Assistant to speech Therapy
# File:          creatDocument.py
# Created by:    Adalberto Jr
# Created date:  30/04/2025
# Version:       1.0
# Python:        3.10
# Local:         Universidade de Aveiro
# Description: This module is responsible for creating a document to send the database. 
#              This document is created in JSON format and is sent to the database.
# ===========================================================================================
#============================================================================================ 

import json
from bson.objectid import ObjectId
from pymongo import errors
class CreatDocumentToDB:

    def __init__(self):
        self.data = {}

    def ensure_objectid(self,value):
        if isinstance(value, ObjectId):
            return value
        try:
            return ObjectId(value)
        except errors.InvalidId:
            return None  # ou raise ValueError("ID inválido")

    def userDocument(self, name, email, password,profession, date_of_birth):
        """
        Create a document for the user: therapist.
        :param name: The name of the user.
        :param email: The email of the user.
        :param password: The password of the user.
        :param profession: The profession of the user.
        :param date_of_birth: The date of birth of the user.
        :return: JSON string of the document.
        """
        # password must be hashed
        self.data.clear()
        self.data = {
                    "name": name,
                    "email": email,
                    "password": password,       # password must be hashed
                    "profession": profession,   # profession is the type of therapist: speech therapist, psychologist, etc
                    "date_of_birth": date_of_birth, # date_of_birth is the date of birth of the user
                }
        data = json.dumps(self.data)
        return self.data
    
    
    def curentUserDocument(self,userId, name, email,profession,):
        """
        Create a document for the user: therapist.
        :param name: The name of the user.
        :param email: The email of the user.
        :param profession: The profession of the user.
        :return: JSON string of the document.
        """
        self.data.clear()
        self.data = {
                     'userId': userId,
                    "name": name,
                    "email": email,
                    "profession": profession,   # profession is the type of therapist: speech therapist, psychologist, etc
                }
        data = json.dumps(self.data)
        return self.data
    
    
    def schedulingDocument(self, title, date, time, local, description, guest, type, user):
        """
        Create a document for the scheduling.
        :param title: The title of the scheduling.
        :param date: The date of the scheduling.
        :param time: The time of the scheduling.
        :param local: The local of the scheduling.
        :param description: The description of the scheduling.
        :param guest: The guest of the scheduling.
        :param type: The type of the scheduling.
        :param user: The user of the scheduling.
        :return: JSON string of the document.
        """
        self.data.clear()
        self.data = {
                    "title": title,
                    "date": date,
                    "time": time,
                    "local": local,
                    "description": description,
                    "guest": guest,                 # guest is the name of the therapist or other guest
                    "type": type,                   # type is the type of therapy: remote or presential?
                    "user": self.ensure_objectid(user)                    # user is the id of the user
                }
        return self.data
    
    def exerciseDocument(self, type, name, description, steps, userName, user,typeOfProcessing):
        """
        Create a document for the exercise.
        :param type: The type of the exercise.
        :param name: The name of the exercise.
        :param description: The description of the exercise.
        :param typeOfProcessing: the type of processing of exercise.
        :param steps: The steps of the exercise.
        :param userName: The name of the user.
        :param user: The user id.
        :return: JSON string of the document.
        """
        self.data.clear()
        self.data = {
                    "type": type,                                    # type is the type of exercise: speech, reading, writing, etc
                    "name": name,
                    "description": description,
                    "typeOfProcessing":typeOfProcessing,
                    "steps": steps,                      # steps is a list of dictionaries
                    "userName": userName,                # userName is the name of the user
                    "user": self.ensure_objectid(user),                        # user is the id of the user
                }
        return self.data
    
    def noteDocument(self, note, priority, date,therapist):
        """
        Create a document for the exercise.
        :param note: The note to keep.
        :param priority: The priority of the note.
        :param date: The date of create the note.
        :param therapist: the therapist Id.
        :return: JSON string of the document.
        """
        self.data.clear()
        self.data = {
                    "note": note,                            
                    "priority": priority,
                    "date": date,
                    "therapist": self.ensure_objectid(therapist),
                }
        return self.data
    
    #NOTE:APagar isso depois. Não é importante
    
    def stepSentence_WordDocument(self, step, description, word = None, sentence = None):
        self.data.clear()
        if word:
            self.data = {
                    "step": step,                                    # step is a number
                    "description": description,                     # description is the step to be done
                    "word": word                                    # can be a word, a sentence or a paragraph
                }
        elif sentence:
            self.data = {
                    "step": step,                                    # step is a number
                    "description": description,                      # description is the step to be done
                    "sentence": sentence                             # can be a word, a sentence or a paragraph
                }
        return json.dumps(self.data)
    
    
    def stepReadingDocument(self, step, description, title, text):
        self.data.clear()
        self.data = {
                    "step": step,                                    # step is a number
                    "description": description,                     # description is the step to be done
                    "title": title,                  
                    "text": text                    
            }
        return json.dumps(self.data)
    
    def stepSpeechDocument(self, step, description, question):
        self.data.clear()
        self.data = {
                    "step": step,                                    # step is a number
                    "description": description,                     # description is the step to be done    
                    "question": question,                           # question is the question to be answered                                   
            }
        return json.dumps(self.data)
    
    def stepDiadochokinesiaDocument(self, step, typeOfConsonant, syllables, description):
        self.data.clear()
        self.data = {
                    "step": step,                                    # step is a number
                    "typeOfConsonant": typeOfConsonant,             # typeOfConsonant is the type of consonant to be used
                    "syllables": syllables,                          # syllables is a list of dictionaries 
                    "description": description                # description is the step to be done         
            }
        return json.dumps(self.data)
    
    def recordingDocument(self, name, time, path,exercise, exerciseStep, user):
        self.data.clear()
        self.data = {
                    "name": name,               # name is the name of the Audio file
                    "path": path,
                    "time": time,
                    "exercise": exercise,         # exercise is the id of the exercise
                    "exerciseStep": exerciseStep, # exerciseStep is the id of the exercise step
                    "user": user,                 # user is the id of the user
                    }
        return json.dumps(self.data)
    
    def resultDocument(self, static_result, no_static_result, date, recording,step):
        self.data.clear()
        self.data = {
                    "static_result": static_result,               # result is a list of dictionaries
                    "no_static_result": no_static_result,               # result is a list of dictionaries
                    "date": date,                   # date is the date produced the result
                    "recording": recording,          # recording is the id of the recording
                    "step": step
                    }
        return json.dumps(self.data)
    
    def resultFildDocument(self,key, value, unit):
        self.data.clear()
        self.data = {
                     key: value,                   # key is the name of the field
                    "unidade": unit                # unit is the unit of the value (Hz, dB, etc)
                    }
        return json.dumps(self.data)


    def healthUserDocument(self, name, email, date_of_birth, therapist,observation, medical_condition,health_user_number, cellphone, address):
        """
        Create a document for the health user.
        :param name: The name of the user.
        :param email: The email of the user.
        :param date_of_birth: The date of birth of the user.
        :param therapist: The therapist of the user.
        :param observation: The observation of the user.
        :param medical_condition: The medical condition of the user.
        :param health_user_number: The health user number of the user.
        :param cellphone: The cellphone of the health user.
        :param address: The address of the health user.
        :return: JSON string of the document.
        """
        self.data.clear()
        self.data = {
                    "name": name,
                    "email": email,
                    "date_of_birth": date_of_birth, # date_of_birth is the date of birth of the user
                    "therapist": self.ensure_objectid(therapist), 
                    "observation": observation,   
                    "medical_condition": medical_condition, # medical_condition is the medical condition of the user
                    "health_user_number": health_user_number, # health_user_number is the health user number of the user
                    "cellphone": cellphone, # health_user_cellphone is the cellphone of the health user
                    "address": address, # health_user_address is the address of the health user

                }
        # data = json.dumps(self.data)
        return self.data