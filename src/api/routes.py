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

@api.route('/orders', methods=['POST'])
def shipping_info():
    shipping_address = request.json.get("shipping_address")
    billing_address = request.json.get("billing_address")
    credit_card_num = request.json.get("credit_card_num")
    credit_card_cvv = request.json.get("credit_card_cvv")
    credit_card_year = request.json.get("credit_card_year")
    credit_card_month = request.json.get("credit_card_month")

    # Check for missing fields
    if not all([shipping_address, billing_address, credit_card_num, credit_card_cvv, credit_card_year, credit_card_month]):
        return jsonify({'msg': 'Missing one or more info fields. Please review your info.'}), 400

    # Create a new shipping instance
    shipping = Shipping(
        shipping_address=shipping_address,
        billing_address=billing_address,
        credit_card_num=credit_card_num,
        credit_card_cvv=credit_card_cvv,
        credit_card_year=credit_card_year,
        credit_card_month=credit_card_month
    )

    # Add to the database
    db.session.add(shipping)
    db.session.commit()

    response = {'msg': f'Your info was added!'}

    return jsonify(response), 201
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

@api.route('/users', methods=['GET'])
def get_all_users():
    users=User.query.all()
    serialize_users = []
    for user in users:
        serialize_users.append(user.serialize())
    return jsonify({"msg": "Here is the list of users", "users": serialize_users}), 200

@api.route('/user', methods=['GET'])
@jwt_required()
def get_one_user():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id = user_id).first()
    if user is None:
        return jsonify({"msg": "user not found"}), 404
    return jsonify({"msg": "Here is your user", "user": user.serialize()}), 200

@api.route('/users/login', methods=['POST'])
def handle_login():
    email=request.json.get("email",None)
    password=request.json.get("password",None)
    if email is None or password is None:
        return jsonify({"msg": "No email or password entered"}), 400
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify({"msg": "User not found"}), 404
    if user.password != password:
        return jsonify({"msg": "Password does not match"}), 401
    
    access_token = create_access_token(
        identity=user.id
    )
    return jsonify(access_token=access_token), 201
