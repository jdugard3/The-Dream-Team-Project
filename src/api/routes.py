"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorite, Shoe, Order, Feedback, Shipping
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

@api.route('/feedback', methods=['POST'])
def generate_feedback():
    email = request.json.get("email", None)
    description = request.json.get("description", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        response = {
            'msg': 'User not found.'
        }
        return jsonify(response), 403
    
    if description is None or description.strip() == "":
        response = {
            'msg': 'Feedback description cannot be empty.'
        }
        return jsonify(response), 400

    feedback = Feedback(description=description, email=email)
    db.session.add(feedback)
    db.session.commit()

    response = {
        'msg': f'Thank you, {user.email} for your feedback!'
    }
    return jsonify(response), 200

# get all users & get 1 user routes 
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    serialized_users = []
    for user in users: 
        serialized_users.append(user.serialize())
    return jsonify({"msg": "Here is the list of users", "users": serialized_users}), 200

@api.route('/users/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    user = User.query.filter_by(id = user_id).first()
    if user is None: 
        return jsonify({"msg": "user not found"}), 404 
    
    return jsonify({"msg": "Here is your user", "user": user.serialize()}), 200 


@api.route('/orders', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity() 

    shipping_address = request.json.get("shipping_address", None)
    billing_address = request.json.get("billing_address", None)
    credit_card_num = request.json.get("credit_card_num", None)
    credit_card_cvv = request.json.get("credit_card_cvv", None)
    credit_card_month = request.json.get("credit_card_month", None)
    credit_card_year = request.json.get("credit_card_year", None)

    user = User.query.filter_by(id = user_id).first()

    if user_id is None:
        response = {
            'msg': 'Please sign in to purchase'
        }
        return jsonify(response), 400
    
    shipping = Shipping(
        shipping_address = shipping_address,
        billing_address = billing_address, 
        credit_card_num = credit_card_num,
        credit_card_cvv = credit_card_cvv, 
        credit_card_month = credit_card_month,
        credit_card_year = credit_card_year
    )

    db.session.add(shipping)
    db.session.commit()
    
    response = {
        'msg': "Your purchase is complete!"
    }
    return jsonify(response), 200
