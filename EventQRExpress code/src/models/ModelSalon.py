from .entities.Salon import Salon
class ModelSalon():

    @classmethod
    def register(self, db, ubicacion, direccion, cantidadS, cantidadM, cantidadL, disponibilidad, latitud, longitud):
        try:
            cursor = db.connection.cursor()
            sql = f"INSERT INTO lockers (ubicacion, direccion, cantidadS, cantidadM, cantidadL, disponibilidad, latitud, longitud, enviados, recibidos, registrado) VALUES ('{ubicacion}','{direccion}',{cantidadS}, {cantidadM}, {cantidadL},{disponibilidad}, {latitud}, {longitud}, 0, 0, CURDATE())" #Cantidad va dos veces ya que en un inicio la disponibilidad es la misma
            cursor.execute(sql)
            db.connection.commit()
        except Exception as ex:
            raise Exception(ex)
    @classmethod
    def consultarId(self, db, ciudad):
        try:
            cursor = db.connection.cursor()
            sql = f"SELECT id FROM salon where ciudad ='{ciudad}'";
            cursor.execute(sql)
            list_lockers=[]
            while True:
                row = cursor.fetchone()
                if row == None:
                    break
                list_lockers.append(row[0])
            
            # print(dict_lockers)
            if len(list_lockers)>0:
                return list_lockers[0]
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def consultarSalon(self, db, capacidad): #Nota esta consulta es para obtener el registro que contengan la ubicacion que enviamos retorna un objeto de tipo locker
        try:
            cursor = db.connection.cursor()
            sql = f"SELECT ciudad FROM salon where capacidad>='{capacidad}'";
            cursor.execute(sql)
            dict_lockers={}
            list_lockers=[]
            while True:
                row = cursor.fetchone()
                if row == None:
                    break
                list_lockers.append(row[0])
            dict_lockers['salones']=list_lockers
            # print(dict_lockers)
            if len(dict_lockers)>0:
                return dict_lockers
            else:
                return None
        except Exception as ex:
            raise Exception(ex)
    @classmethod
    def consultarDireccion(self, db, ciudad): #Nota esta consulta es para obtener el registro que contengan la ubicacion que enviamos retorna un objeto de tipo locker
        try:
            cursor = db.connection.cursor()
            sql = f"SELECT calle, colonia, ciudad FROM salon where ciudad ='{ciudad}'";
            cursor.execute(sql)
            dict_lockers={}
            list_lockers=[]
            while True:
                row = cursor.fetchone()
                if row == None:
                    break
                list_lockers.append(row[0]+", " + row[1] + ", " + row[2])
            dict_lockers['direccion']=list_lockers
            # print(dict_lockers)
            if len(dict_lockers)>0:
                return dict_lockers
            else:
                return None
        except Exception as ex:
            raise Exception(ex)