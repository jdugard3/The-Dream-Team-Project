from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user_table"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    full_name = db.Column(db.String(120), unique=True, nullable=False)
    favorites = db.relationship('Favorite', back_populates='user')
    shoes = db.relationship('Shoe', back_populates='user')
    feedbacks = db.relationship('Feedback', back_populates='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,

            # do not serialize the password, its a security breach
        }
    
class Shipping(db.Model):
    __tablename__ = "shipping_table"
    id = db.Column(db.Integer, primary_key=True)
    shipping_address = db.Column(db.String(120), unique=True, nullable=False)
    billing_address = db.Column(db.String(120), unique=True, nullable=False)
    credit_card_num = db.Column(db.String(16), unique=True, nullable=False)
    credit_card_cvv = db.Column(db.String(3), unique=True, nullable=False)
    credit_card_year = db.Column(db.String(120), unique=True, nullable=False)
    credit_card_month = db.Column(db.String(120), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    user = db.relationship("User", backref="shipping")

    def __repr__(self):
        return f'<ShipInfo {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "shipping_address": self.shipping_address,
            "billing_address": self.billing_address,
            "credit_card_num": self.credit_card_num,
            "credit_card_cvv": self.credit_card_cvv,
            "credit_card_year": self.credit_card_year,
            "credit_card_month": self.credit_card_month,

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
    shoe_name = db.Column(db.String(120), nullable=False)
    shoe_size = db.Column(db.String(120), nullable=False)
    manufacturer = db.Column(db.String(120), nullable=False)
    shoe_price = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    user = db.relationship("User", back_populates="shoes")
    orders = db.relationship("Order", back_populates="shoe")

    def __repr__(self):
        return f'<Shoe {self.shoe_name}>'

    def serialize(self):
        return {
            "shoe_name": self.shoe_name,
            "shoe_size": self.shoe_size,
            "manufacturer": self.manufacturer,
            "shoe_price": self.shoe_price,
        }
    
class Order(db.Model):
    __tablename__ = "orders_table"
    id = db.Column(db.Integer, primary_key=True)
    shoe_id = db.Column(db.Integer, db.ForeignKey("shoes_table.id"))
    shoe = db.relationship("Shoe", back_populates = "orders")
    quantity = db.Column(db.String(120), nullable=False)
    total_price = db.Column(db.String(120), nullable=False)
    order_date = db.Column(db.String(120), nullable=False)

    def __repr__(self):
            return f'<Order {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "quantity": self.quantity,
            "total_price": self.total_price,
            "order_date": self.order_date,
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
            "description": self.description
        }
    
    


