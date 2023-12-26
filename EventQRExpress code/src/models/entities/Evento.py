class Evento():

    def __init__(self, id, nombre, fecha, hora_inicio, hora_fin, asistentes, tipo, lugar, id_usuario, id_salon, invitacion) -> None:
        self.id = id
        self.nombre = nombre
        self.fecha = fecha
        self.hora_inicio = hora_inicio
        self.hora_fin = hora_fin
        self.asistentes = asistentes
        self.tipo = tipo
        self.lugar = lugar
        self.id_usuario = id_usuario
        self.id_salon = id_salon
        self.invitacion = invitacion

