"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorite, Shoe, Order
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/token', methods=['POST'])
def generate_token():
    # Receiving the request and converting the body of the request into json format 
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    #query the User table to check if the user exists 
    email = email.lower()
    user = User.query.filter_by(email = email, password = password).first()

    if user is None: 
        response = {
            "msg": "Email or Password does not match."
        }
        return jsonify(response), 401 
    
    access_token = create_access_token(identity=user.id)
    response = {
        "access_token": access_token, 
        "user_id": user.id, 
        "msg": f"Welcome back {user.email}!" 
    }
    return jsonify(response), 200


@api.route('/signup', methods=['POST'])
def register_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    full_name = request.json.get("full_name", None)
    
    # query to check if email already exists
    email = email.lower()
    user = User.query.filter_by(email=email).first()

    if user is not None and user.email == email:
        response = {
            'msg': 'User already exists.'
        }
        return jsonify(response), 403
    
    # if email does not exist, make a record in the database
    # sign the user up

    user = User()
    user.email = email
    user.password = password
    user.full_name = full_name
    db.session.add(user)
    db.session.commit()

    response = {
        'msg': f'Congratulations {user.email}. You have signed up!'
    }
    return jsonify(response), 200