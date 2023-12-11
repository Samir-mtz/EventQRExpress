from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin
# from models.entities.Envio import Envio
import datetime
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin
import datetime
# Update: werkzeug ya no tiene soporte para sha#, por ello usamos passlib
from passlib.hash import sha256_crypt


# class User(UserMixin):

#     def __init__(self, id, nombre="", email="", telefono="", password=False, confirmed=0, tipo="", confirmed_on=None) -> None:
#         self.id = id
#         self.nombre = nombre
#         self.email = email
#         self.telefono = telefono
#         self.password = password
#         self.confirmed = confirmed
#         self.tipo = tipo
#         self.confirmed_on = confirmed_on

#     @classmethod
#     def check_password(self, hashed_password, password):
#         print ("pass: "+hashed_password+ " "+ password)
#         return check_password_hash(hashed_password, password)

#     @classmethod
#     def generate_password(self, password):
#         return generate_password_hash(password, "sha256")


class User(UserMixin):

    def __init__(self, id, nombre="", email="", telefono="", password=False, confirmed=0, tipo="", confirmed_on=None) -> None:
        self.id = id
        self.nombre = nombre
        self.email = email
        self.telefono = telefono
        self.password = password
        self.confirmed = confirmed
        self.tipo = tipo
        self.confirmed_on = confirmed_on

    @classmethod
    def check_password(self, hashed_password, password):
        # print ("pass: "+generate_password_hash("root123", "sha256"))
        # verify the hashed password against the plain password
        # print("Verified:", sha256_crypt.verify(password, hashed))
        return sha256_crypt.verify(password, hashed_password)
        # return check_password_hash(hashed_password, password)

    @classmethod
    def generate_password(self, password):
        # hash the password using sha256_crypt with 5000 rounds and a random salt
        # print("Hashed:", hashed)
        return sha256_crypt.using(rounds=5000).hash(password)
        # return generate_password_hash(password, 'sha1')

    def serialize(self):
        return {
            "email": self.email,
            "password": self.password,
            "nombre": self.nombre,
            "telefono": self.telefono,
        }
