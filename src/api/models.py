from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user_table"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    full_name = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Favorite(db.Model):
    __tablename__ = "favorites_table"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey("user_table.id"))
    user = db.relationship("User", back_populates="favorites")
    shoe_id = db.Column(db.ForeignKey("shoes_table.id"))
    shoe = db.relationship()

    def __repr__(self):
        return f'<Favorite {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Shoe(db.Model):
    __tablename__ = "shoes_tables"
    id = db.Column(db.Integer, primary_key=True)
    shoe_name = db.Column(db.String(120), nullable=False)
    shoe_size = db.Column(db.String(120), nullable=False)
    manufacturer = db.Column(db.String(120), nullable=False)
    shoe_price = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.ForeignKey("user_table.id"))
    user = db.relationship("User", back_populates="shoes")

    def __repr__(self):
        return f'<Shoe {self.email}>'

    def serialize(self):
        return {
            "shoe_name": self.shoe_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }