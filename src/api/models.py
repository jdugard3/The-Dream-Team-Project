from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
class User(db.Model):
    __tablename__ = "user_table"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    full_name = db.Column(db.String(120), unique=True, nullable=False)
    favorites = db.relationship('Favorite', back_populates='user')
    feedbacks = db.relationship('Feedback', back_populates='user')
    cards = db.relationship('Card', back_populates='user')
    billing_addresses = db.relationship('BillingAddress', back_populates='user')
    shipping_addresses = db.relationship('ShippingAddress', back_populates='user')
    orders = db.relationship('Order', back_populates='user')
    def __repr__(self):
        return f'<User {self.email}>'
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
        }
class Favorite(db.Model):
    __tablename__ = "favorites_table"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    user = db.relationship("User", back_populates="favorites")
    shoe_id = db.Column(db.Integer, db.ForeignKey("shoes_table.id"))
    shoe = db.relationship("Shoe", backref="favorites")
    def __repr__(self):
        return f'<Favorite {self.user.email}>'
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "shoe_id": self.shoe_id,
        }
class Shoe(db.Model):
    __tablename__ = "shoes_table"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    size = db.Column(db.String(120), nullable=False)
    brand = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    ordered_in = db.relationship('ShoesOrdered', back_populates='shoe')
    def __repr__(self):
        return f'<Shoe {self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "size": self.size,
            "brand": self.brand,
            "price": self.price,
        }
class Order(db.Model):
    __tablename__ = "orders_table"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    card_id = db.Column(db.Integer, db.ForeignKey("card_table.id"))
    billing_address_id = db.Column(db.Integer, db.ForeignKey("billing_address_table.id"))
    shipping_address_id = db.Column(db.Integer, db.ForeignKey("shipping_address_table.id"))
    billing_address = db.relationship("BillingAddress", back_populates="orders")
    shipping_address = db.relationship("ShippingAddress", back_populates="orders")
    card = db.relationship("Card", back_populates="orders")
    user = db.relationship("User", back_populates="orders")
    shoes_ordered = db.relationship('ShoesOrdered', back_populates='order')
    total_price = db.Column(db.Float, nullable=True)
    order_date = db.Column(db.String(120), nullable=True)
    def __repr__(self):
        return f'<Order {self.id}>'
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total_price": self.total_price,
            "order_date": self.order_date,
        }
class ShoesOrdered (db.Model) :
    __tablename__="shoes_ordered"
    id = db.Column(db.Integer, primary_key=True)
    order_id=db.Column("order_id", db.ForeignKey("orders_table.id"))
    shoe_id=db.Column("shoe_id", db.ForeignKey("shoes_table.id"))
    order = db.relationship('Order', back_populates='shoes_ordered')
    shoe=db.relationship('Shoe', back_populates='ordered_in')
    def __repr__(self):
        return f'<ShoesOrdered {self.id}>'
    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "shoe_id": self.shoe_id,
        }
class Feedback(db.Model):
    __tablename__ = "feedback_table"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.String(300), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    user = db.relationship("User", back_populates="feedbacks")
    def __repr__(self):
        return f'<Feedback {self.id}>'
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "description": self.description,
            "user_id": self.user_id,
        }
class ShippingAddress(db.Model):
    __tablename__ = "shipping_address_table"
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(120), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"),nullable=False)
    orders = db.relationship("Order", back_populates="shipping_address")
    user = db.relationship("User", back_populates="shipping_addresses")
    def __repr__(self):
        return f'<ShippingAddress {self.address}>'
    def serialize(self):
        return {
            "id": self.id,
            "address": self.address,
            "user_id": self.user_id,
        }
class BillingAddress(db.Model):
    __tablename__ = "billing_address_table"
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(120), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"),nullable=False)
    orders = db.relationship("Order", back_populates="billing_address")
    user = db.relationship("User", back_populates="billing_addresses")
    def __repr__(self):
        return f'<BillingAddress {self.address}>'
    def serialize(self):
        return {
            "id": self.id,
            "address": self.address,
            "user_id": self.user_id,
        }
class Card(db.Model):
    __tablename__ = "card_table"
    id = db.Column(db.Integer, primary_key=True)
    num = db.Column(db.String(16), unique=True, nullable=False)
    cvv = db.Column(db.String(3), unique=False, nullable=False)
    year = db.Column(db.String(4), unique=False, nullable=False)
    month = db.Column(db.String(2), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"),nullable=False)
    orders = db.relationship("Order", back_populates="card")
    user = db.relationship("User", back_populates="cards")
    def __repr__(self):
        return f'<Card {self.num}>'
    def serialize(self):
        return {
            "id": self.id,
            "num": self.num,
            "cvv": self.cvv,
            "year": self.year,
            "month": self.month,
            "user_id": self.user_id,
        }