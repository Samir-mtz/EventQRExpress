class UsuariosConfirmados():

    def __init__(self, id, nombre, id_confirmacion, asiento) -> None:
        self.id = id
        self.nombre = nombre
        self.id_confirmacion = id_confirmacion
        self.asiento = asiento

    def to_dict(self):
            return {
                'id': self.id,
                'nombre': self.nombre,
                'id_confirmacion': self.id_confirmacion,
                'asiento': self.asiento
            }