from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin
# from models.entities.Envio import Envio
import datetime


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
        print ("pass: "+hashed_password+ " "+ password)
        return check_password_hash(hashed_password, password)

    @classmethod
    def generate_password(self, password):
        return generate_password_hash(password, "sha256")