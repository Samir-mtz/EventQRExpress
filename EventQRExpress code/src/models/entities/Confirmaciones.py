class Confirmaciones():
    def __init__(self, id, nombre, email, password, confirmed, asistentes, id_evento) -> None:
        self.id = id
        self.nombre = nombre
        self.email = email
        self.confirmed = confirmed
        self.asistentes = asistentes
        self.id_evento = id_evento
        self.password = password

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'email': self.email,
            'password': self.password,
            'confirmed': self.confirmed,
            'asistentes': self.asistentes,
            'id_evento': self.id_evento
        }