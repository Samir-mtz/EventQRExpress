class Evento():

    def __init__(self, id, nombre, fecha, horario, asistentes, tipo, lugar, id_usuario, id_salon) -> None:
        self.id = id
        self.nombre = nombre
        self.fecha = fecha
        self.horario = horario
        self.asistentes = asistentes
        self.tipo = tipo
        self.lugar = lugar
        self.id_usuario = id_usuario
        self.id_salon = id_salon
        
    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'fecha': self.fecha,
            'horario': self.horario,
            'asistentes': self.asistentes,
            'tipo': self.tipo,
            'lugar': self.lugar,
            'id_usuario': self.id_usuario,
            'id_salon': self.id_salon
        }
