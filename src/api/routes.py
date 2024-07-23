"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorite, Shoe, Order, Feedback, ShippingAddress,BillingAddress,Card,ShoesOrdered
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import timedelta


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
    expires = timedelta(minutes = 60)
    access_token = create_access_token(identity=user.id, expires_delta=expires)
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
            'msg': 'Email is already associated with an account.'
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


# Get all Shoes 
@api.route('/shoes', methods=['GET'])
def get_all_shoes():
    shoes=Shoe.query.all()
    serialized_shoes = []
    for shoe in shoes: 
        serialized_shoes.append(shoe.serialize())
    return jsonify({"msg": "Here is the list of shoes", "shoes": serialized_shoes}), 200

@api.route('/orders', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity() 
    billing_address = request.json.get("billing_address", None)
    shipping_address = request.json.get("shipping_address", None)
    credit_card_num = request.json.get("credit_card_num", None)
    credit_card_cvv = request.json.get("credit_card_cvv", None)
    credit_card_month = request.json.get("credit_card_month", None)
    credit_card_year = request.json.get("credit_card_year", None)
    order_date=request.json.get("order_date", None)
    shoes=request.json.get("shoes", None)
    issues=[]
    shipping = ShippingAddress.query.filter_by(address=shipping_address).first()
    print(shipping)
    if shipping is None:
        shipping = ShippingAddress(address=shipping_address,user_id=user_id)
        db.session.add(shipping)
        db.session.commit()
        db.session.refresh(shipping)

    billing = BillingAddress.query.filter_by(address=billing_address).first()
    print(billing)
    if billing is None:
        billing = BillingAddress(address=billing_address,user_id=user_id)
        db.session.add(billing)
        db.session.commit()
        db.session.refresh(billing)
    
    card = Card.query.filter_by(num=credit_card_num ).first()
    print(card)
    if card is None:
        card = Card(num=credit_card_num,cvv=credit_card_cvv,month=credit_card_month,year=credit_card_year,user_id=user_id)
        db.session.add(card)
        db.session.commit()
        db.session.refresh(card)
    
    user = User.query.filter_by(id = user_id).first()
    if user is None:
        response = {
            'msg': 'Please sign in to purchase'
        }
        return jsonify(response), 400

    if shoes is None:
        response = {
            'msg': 'No shoes were sent'
        }
        return jsonify(response), 400
    
    order = Order(user_id=user_id,card_id=card.id,billing_address_id=billing.id,shipping_address_id=shipping.id, order_date=order_date)
    db.session.add(order)
    db.session.commit()
    
    print(order)
    total_price=0
    for shoe in shoes:
        print(shoe)
        shoe = Shoe.query.filter_by(id=shoe["id"]).first()
        if shoe is None:
            issues.append("shoe not found")
        else:
            shoe_ordered = ShoesOrdered(order_id=order.id,shoe_id=shoe.id)
            db.session.add(shoe_ordered)
            db.session.commit()
            db.session.refresh(shoe_ordered)
            total_price+=shoe.price

    order.total_price=total_price
    db.session.commit()
    
    
    response = {
        'msg': "Your puchase is complete!",
        "order_details":order.serialize()
    }
    return jsonify(response), 200

@api.route('/orders', methods=['GET'])
@jwt_required()
def get_user_orders():
    orders = Order.query.filter_by(user_id = get_jwt_identity())
    if orders is None: 
        return jsonify({"msg": "orders not found"}), 404 
    serialized_orders=[]
    for order in orders:
        serialized_orders.append(order.serialize())

    
    return jsonify({"msg": "Here are your orders", "orders": serialized_orders}), 200 

