#########################################################################################
####################################    Librerias   #####################################
#########################################################################################
import tempfile
from flask import Flask, render_template, request, redirect, url_for, flash, g
from flask_mysqldb import MySQL
from flask_wtf.csrf import CSRFProtect
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
import qrcode
from config import config
from flask_mail import Mail, Message
from models.token import generate_confirmation_token, confirm_token
from flask import Flask, render_template, request, jsonify
import shutil
import os
import re
import socket
from datetime import datetime
import base64
from io import BytesIO
import base64


# Clases
# Models:
from models.ModelUser import ModelUser
from models.ModelSalon import ModelSalon
from models.ModelEvento import ModelEvento
from models.ModelUsuariosConfirmados import ModelUsuariosConfirmados
from models.ModelConfirmaciones import ModelConfirmaciones

# Entities:
from models.entities.User import User
from models.entities.Confirmaciones import Confirmaciones

host = socket.gethostbyname(socket.gethostname())
app = Flask(__name__)
csrf = CSRFProtect()
db = MySQL(app)
#########################################################################################
############################ Configuracion de servicio e-mail CAMBIAR ###################
#########################################################################################
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'eventqrxpress@gmail.com'
app.config['MAIL_PASSWORD'] = "aebe rqbb fgau zgxj"
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)
login_manager_app = LoginManager(app)

#########################################################################################
####################################### Funciones #######################################
#########################################################################################

# Nos sirve para ver que usario esta logeado
@login_manager_app.user_loader
def load_user(id):
    return ModelUser.get_by_id(db, id)

#########################################################################################
############################ Funciones de routeo de direcciones #########################
#########################################################################################

# Ruta raíz
@app.route('/')
def index():
    return render_template('landingPage.html')
    # return render_template('test.html')

# Descargar imagen
@app.route('/guardarImagen', methods=['POST'])
def guardar_archivo():
    user = ModelUser.consulta_email(db, current_user.email)
    try:
        data_url = request.json['imgUrl']
        base64_data = data_url.split(',')[1]
        # Obtén el nombre y id del usuario (carpeta donde se almacenara)
        nombreArchivo = request.json.get('fileName', '')
        idUsuario = str(user.id)
        # Ruta donde se guardará la iamgen
        carpeta_especifica = os.path.join(app.root_path, 'static', 'img', 'eventos', idUsuario)
        if not os.path.exists(carpeta_especifica):
            os.makedirs(carpeta_especifica)
        # Guardar el archivo en la carpeta específica con el nombre
        with open(os.path.join(carpeta_especifica, nombreArchivo), 'wb') as f:
            f.write(base64.b64decode(base64_data))
        return jsonify({'message': 'Archivo guardado correctamente'})
    except Exception as e:
        print(f"Error al guardar el archivo: {e}")
        return jsonify({'error': f'Error al guardar el archivo: {e}'}), 500

# Descargar imagen invitacion
@app.route('/guardarImagenInvitacion', methods=['POST'])
def guardar_archivo_invitacion():
    # user = ModelUser.consulta_email(db, current_user.email)
    try:
        data_url = request.json['imgUrl']
        base64_data = data_url.split(',')[1]
        # Obtén el nombre y id del usuario (carpeta donde se almacenara)
        nombreArchivo = request.json.get('fileName', '')
        idUsuario = nombreArchivo.split('_')[0]
        # Ruta donde se guardará la iamgen
        carpeta_especifica = os.path.join(app.root_path, 'static', 'img', 'eventos', idUsuario)
        if not os.path.exists(carpeta_especifica):
            os.makedirs(carpeta_especifica)
        # Guardar el archivo en la carpeta específica con el nombre
        with open(os.path.join(carpeta_especifica, nombreArchivo), 'wb') as f:
            f.write(base64.b64decode(base64_data))
        return jsonify({'message': 'Archivo guardado correctamente'})
    except Exception as e:
        print(f"Error al guardar el archivo: {e}")
        return jsonify({'error': f'Error al guardar el archivo: {e}'}), 500


#########################################################################################
############################ Funciones de consulta  #####################################
######################################################################################### 
@app.route('/capacidadSalones/<capacidad>')
def jsonroutedestino(capacidad):
    return jsonify(ModelSalon.consultarSalon(db, capacidad))


@app.route('/datosEvento/<id>')
def jsondatos(id):
    return jsonify(ModelEvento.datosEvento(db, id))

@app.route('/confirmados/<id>')
def jsondatosCdonfirmados(id):
    return jsonify(ModelConfirmaciones.consultAll(db, id))

@app.route('/invitadosAsistentes/<id>')
def jsoninvitadosAsistentes(id):
    return jsonify(ModelUsuariosConfirmados.consultAll(db, id))

@app.route('/direccion/<ciudad>')
def consultarDireccion(ciudad):
    return jsonify(ModelSalon.consultarDireccion(db, ciudad))
#########################################################################################
############################ Enviar  Correo  ############################################
######################################################################################### 
@app.route('/enviarCorreo/<id>')
def enviarCorreo(id):
    confirmacion = ModelConfirmaciones.get_by_id(db, id)
    token = generate_confirmation_token(confirmacion.email) 
    # Envio de correo
    confirm_url = url_for(
        'confirm_email_seleccion', token=token, _external=True)
    template = render_template(
        'correoLinkInvitado.html', confirm_url=confirm_url)
    subject = "Seleccion de asientos - Eventqrxpress"

    msg = Message(
        subject,
        recipients=[''+confirmacion.email],
        html=template,
        sender="eventqrxpress@gmail.com"
    )
    mail.send(msg)
    # login_user(execution) # Marco sus datos como logeado para que vea verificacion
    # logout_user()
    # return render_template('validacionCorreo.html', nombre=user.nombre, email=user.email)##########Cambiar
    return redirect(url_for('index'))

#########################################################################################
############################ Funciones CRUD  ############################################
######################################################################################### 
@app.route('/deleteConfirmacion/<id>')
def deleteConfirmacion(id):
    ModelConfirmaciones.delete(db, id)
    return redirect(url_for('homeCliente'))

@app.route('/deleteInvitado/<id>')
def deleteConfirmacionUsuario(id):
    ModelUsuariosConfirmados.delete(db, id)
    return redirect(url_for('homeCliente'))

#########################################################################################
##################################### Usuario Anfitrion ###################################
#########################################################################################

# Inicio de sesion
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_active == False:
        # Mandamos formulario
        if request.method == 'POST':
            email = request.form['email']
            password = request.form['password']
            user = User(1, email = email, password = password)
            logged_user = ModelUser.login(db, user)
            # print(logged_user.email)
            # ¿Existe?
            if logged_user != None:
                #Coincide la contraseña?
                if logged_user.password:
                    login_user(logged_user) #iniciamos sesion con ese usario
                    confirmed_user = ModelUser.consulta_email(
                        db, logged_user.email)
                    if confirmed_user.confirmed:  # En caso de no ser confirmado reenvia un correo para confirmar
                        if confirmed_user.tipo == 'usuario':
                            return redirect(url_for('homeCliente'))
                        elif confirmed_user.tipo == 'admin':
                            return redirect(url_for('admin'))
                        else:
                            return redirect(url_for('index'))
                    else:
                        if confirmed_user.tipo == 'usuario':
                            logout_user()
                            return redirect(url_for('resend_confirmation', email=email))
                        else:
                            flash("Su usuario ha sido deshabilitado")
                            return render_template('ingresar.html')
                else:
                    flash("Usuario y/o contraseña incorrectos.")
                    return redirect(url_for('login'))
            else:
                flash("Usuario y/o contraseña incorrectos.")
                return render_template('formularioLoginRegister.html')
        else:  # Se pide por get
            return render_template('formularioLoginRegister.html')
    else:
        return redirect(url_for('homeCliente')) ##Cambiar al inicio de usuario

# Cerrar sesion
@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/seleccionarAsiento/<token>')
def seleccionarAsiento(token):
    email = confirm_token(token)
    usuario = ModelConfirmaciones.consulta_email(db, email)
    evento = ModelEvento.datosEvento(db, usuario.id_evento)
    ruta_imagen = os.path.join('..\static', 'img', 'eventos', str(evento['id_usuario']), f"{evento['id_usuario']}_{evento['id']}.png")
    imagen = [] 
    imagen.append({"src": ruta_imagen, "alt": "Invitacion"})
    # print(usuario.nombre)
    return render_template('registroAsistentesInvitado.html', usuario=usuario, evento=evento, imagen=imagen)

# Home principal de usuario
@app.route('/homeCliente')
@login_required
def homeCliente():
    user = ModelUser.consulta_email(db, current_user.email)
    nombre_carpeta = str(user.id)
    # print(user.tipo)
    if user.tipo == 'usuario':
        ruta_carpeta = os.path.join('src\static', 'img', 'eventos', nombre_carpeta)
        imagenes = []
        # Verificar si la carpeta existe
        # print(os.getcwd())
        if os.path.exists(ruta_carpeta):
            # print("Entre")
            for archivo in os.listdir(ruta_carpeta):
                if archivo.endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp')):
                    if not re.match(r'\d+_\d+_\d+\.\w+', archivo):
                        ruta_imagen = os.path.join('..\static', 'img', 'eventos', nombre_carpeta, archivo)
                        # print(ruta_imagen)

                        nombre_evento = os.path.splitext(archivo)[0]  # Nombre del archivo sin extensión
                        imagenes.append({"src": ruta_imagen, "alt": nombre_evento, "nombre_evento": nombre_evento})
        # print(imagenes)
        # print(ModelEvento.lastId(db))
        if(ModelEvento.lastId(db) != None):
            evento = ModelEvento.lastId(db) + 1
        else:
            evento = 1
        # evento = ModelEvento.lastId(db) + 1

        # list_confirmaciones = ModelConfirmaciones.consultAll(db)
        # lista_confirmados = ModelUsuariosConfirmados.consultAll(db, )

        return render_template('anfitrion.html', imagenes=imagenes, id=user.id, idEvento=evento)
    elif user.tipo == 'admin':
        return redirect(url_for('admin'))
    else:
        return redirect(url_for('index'))

@app.route('/ConfirmacionEvento/<id>')
def confirmacionInvitacion(id):
    evento = ModelEvento.datosEvento(db, id)
    # print(evento)
    # print(evento['id_usuario'])
    user = ModelUser.get_by_id(db, int(evento['id_usuario']))
    return render_template('confirmacionInvitado.html', nombre=user.nombre, tipo=evento['tipo'], id=id, id_usuario=evento['id_usuario'])

@app.route('/RegistroInvitado/<id>')
def registroInvitado(id):
    evento = ModelEvento.datosEvento(db, id)
    user = ModelUser.get_by_id(db, evento['id_usuario'])
    # email = confirm_token(token)
    # usuario = ModelConfirmaciones.consulta_email(db, email)
    # evento = ModelEvento.datosEvento(db, usuario.id_evento)
    ruta_imagen = os.path.join('..\static', 'img', 'eventos', str(evento['id_usuario']), f"{evento['id_usuario']}_{evento['id']}.png")
    imagen = [] 
    imagen.append({"src": ruta_imagen, "alt": "Invitacion"})
    return render_template('formularioRegistroInvitado.html', imagen=imagen, nombre=user.nombre, tipo=evento['tipo'], id=id, nombre_evento=evento['nombre'])

# Registro de una nueva cuenta
@app.route('/registroInvitado', methods=['POST'])
def registerInvitado():
    if request.method == 'POST':
        if current_user.is_active == True:
            logout_user()
        # ¿El correo no esta registrado?
        if ModelConfirmaciones.check_email_evento(db, request.form['email'], request.form['id_evento']) == False:
            user = Confirmaciones(id=1, email= request.form['email'],
                        password = "",
                        nombre = request.form['nombre'],
                        asistentes = request.form['asistentes'],
                        id_evento = request.form['id_evento'],
                        confirmed=False
                        )
            execution = ModelConfirmaciones.register(db, user)# Registralo en la BD
            
            # print("Registrado")
            if execution != None:  # Se registro con exito entonces tengo sus datos
                token = generate_confirmation_token(user.email)
                # Envio de correo
                confirm_url = url_for(
                    'confirm_email_invitado', token=token, _external=True)
                template = render_template(
                    'correoConfirmacionInvitado.html', confirm_url=confirm_url)
                subject = "Activación de cuenta - Eventqrxpress"

                msg = Message(
                    subject,
                    recipients=[''+request.form['email']],
                    html=template,
                    sender="eventqrxpress@gmail.com"
                )
                mail.send(msg)
                # login_user(execution) # Marco sus datos como logeado para que vea verificacion
                logout_user()
                # return render_template('validacionCorreo.html', nombre=user.nombre, email=user.email)##########Cambiar
                return redirect(url_for('index'))
            else:
                flash("Algo salió mal, intenta de nuevo")
                # return render_template('formularioLoginRegister.html')
                return redirect(url_for('index'))
        else:
            flash("El correo ingresado ya ha sido registrado")
            # return render_template('formularioLoginRegister.html')
            return redirect(url_for(f"registroInvitado/{request.form['id_evento']}", id=request.form['id_evento']))



# Registro de una nueva cuenta
@app.route('/registro', methods=['POST'])
def register():
    if request.method == 'POST':
        if current_user.is_active == True:
            logout_user()
        # ¿El correo no esta registrado?
        if ModelUser.check_email(db, request.form['email']) == False:
            user = User(1, email= request.form['email'],
                        password = request.form['password'],
                        nombre = request.form['nombre'],
                        telefono = request.form['telefono']
                        )
            execution = ModelUser.register(db, user)  # Registralo en la BD
            # print("Registrado")
            if execution != None:  # Se registro con exito entonces tengo sus datos
                token = generate_confirmation_token(user.email)
                # Envio de correo
                confirm_url = url_for(
                    'confirm_email', token=token, _external=True)
                template = render_template(
                    'correoValidaciones.html', confirm_url=confirm_url)
                subject = "Activación de cuenta - Eventqrxpress"

                msg = Message(
                    subject,
                    recipients=[''+request.form['email']],
                    html=template,
                    sender="eventqrxpress@gmail.com"
                )
                mail.send(msg)
                # login_user(execution) # Marco sus datos como logeado para que vea verificacion
                logout_user()
                # return render_template('validacionCorreo.html', nombre=user.nombre, email=user.email)##########Cambiar
                return redirect(url_for('login'))
            else:
                flash("Algo salió mal, intenta de nuevo")
                # return render_template('formularioLoginRegister.html')
                return redirect(url_for('login'))
        else:
            flash("El correo ingresado ya ha sido registrado")
            # return render_template('formularioLoginRegister.html')
            return redirect(url_for('login'))

# Envio de confirmacion de correo
@app.route('/confirm/<token>')
# @login_required
def confirm_email(token):
    try:
        email = confirm_token(token)  # Regresa el email!
    except:
        # En caso de cuenta creada pero no confirmada
        flash('Algo salió mal. Por favor intenta de nuevo')
        return redirect(url_for('login'))
    # print(f"El email es: {email}")
    user = ModelUser.consulta_email(db, email)
    if user != None:
        if user.confirmed:
            flash('Tu cuenta ya está confirmada. Por favor inicia sesión.', 'success')
            return redirect(url_for('login'))
        else:
            # print('llego')
            ModelUser.confirm_user(db, email)
            flash('Gracias por confirmar tu cuenta. Por favor inicia sesión.', 'success')
            return redirect(url_for('login'))
    else:  # Codigo expiro
        flash('Algo salió mal. Por favor intenta de nuevo')
        return redirect(url_for('login'))
#Confirmar email Invitado
@app.route('/confirmInvitado/<token>')
# @login_required
def confirm_email_invitado(token):
    try:
        email = confirm_token(token)  # Regresa el email!
    except:
        # En caso de cuenta creada pero no confirmada
        flash('Algo salió mal. Por favor intenta de nuevo')
        return redirect(url_for('login'))
    user = ModelConfirmaciones.consulta_email(db, email)
    if user != None:
        if user.confirmed:
            flash('Tu cuenta ya está confirmada. Por favor inicia sesión.', 'success')
            return render_template('invitadoConfirmado.html')
        else:
            # print('llego')
            ModelConfirmaciones.confirm_user(db, email)
            flash('Gracias por confirmar tu cuenta. Por favor inicia sesión.', 'success')
            return render_template('invitadoConfirmado.html')
    else:  # Codigo expiro
        flash('Algo salió mal. Por favor intenta de nuevo')
        return redirect(url_for('login'))


#Ir a seleccion de asiento
@app.route('/confirmAsientos/<token>')
# @login_required
def confirm_email_seleccion(token):
    try:
        email = confirm_token(token)  # Regresa el email!
    except:
        # En caso de cuenta creada pero no confirmada
        flash('Algo salió mal. Por favor intenta de nuevo')
        return redirect(url_for('index'))
    # print(f"El email es: {email}")
    user = ModelConfirmaciones.consulta_email(db, email)
    # print("///////////")
    # print(user.confirmed)
    if user != None:
        if user.confirmed:
            flash('Tu cuenta ya está confirmada. Por favor inicia sesión.', 'success')
            token = generate_confirmation_token(email) 
            return redirect(url_for('seleccionarAsiento', token=token))
        else:
            # print('llego')
            ModelConfirmaciones.confirm_user(db, email)
            flash('Gracias por confirmar tu cuenta. Por favor inicia sesión.', 'success')
            return redirect(url_for('index'))
    else:  # Codigo expiro
        flash('Algo salió mal. Por favor intenta de nuevo')
        return redirect(url_for('index'))


# Reenvío de correo
@app.route('/resend/<email>')
def resend_confirmation(email):
    # hash_email = confirm_token(email)
    token = generate_confirmation_token(email)
    # Envio de correo
    confirm_url = url_for('confirm_email', token=token, _external=True)
    template = render_template(
        'correoValidaciones.html', confirm_url=confirm_url)
    subject = "Activación de cuenta - Eventqrxpress"

    msg = Message(
        subject,
        recipients=[''+email],  # Cambiar al correo de usuario
        html=template,
        sender="eventqrxpress@gmail.com"
    )
    mail.send(msg)

    flash('Tu cuenta sigue sin confirmar, hemos enviado un nuevo correo de confirmación.')
    return redirect(url_for('login'))


# No llego ningun correo
# @app.route('/resendEmail/<email>?<nombre>')
@app.route('/resendEmail', methods=['GET', 'POST'])
def resend_email():

    # if ModelUser.check_email(db, request.form['email']) == True: # ¿El correo esta registrado?
    try:
        email = request.form['email']
        nombre = request.form['nombre']
        token = generate_confirmation_token(email)

        # Envio de correo
        confirm_url = url_for('confirm_email', token=token, _external=True)
        template = render_template(
            'correoValidaciones.html', confirm_url=confirm_url)
        subject = "Activación de cuenta - Eventqrxpress"

        msg = Message(
            subject,
            # Cambiar al correo de usuario
            recipients=[''+request.form['email']],
            html=template,
            sender="eventqrxpress@gmail.com"
        )
        mail.send(msg)

        flash('Se ha enviado un nuevo correo de confirmación.')
        return render_template('validacionCorreo.html', nombre=nombre, email=email)
    except:  # Intenta ingresar con un correo no registrado
        flash('Error. Usuario no registrado')
        return redirect(url_for('register'))

@app.route('/recuperar', methods = ['GET', 'POST'])
def recuperar():
    if request.method == 'POST':
        try:
            email = request.form['email']
            verificar = ModelUser.check_email(db, email)
            confirmado = ModelUser.consulta_email(db, email)
            if confirmado != None and confirmado.confirmed_on != None:
                if verificar == True:
                    token = generate_confirmation_token(email)
                    confirm_url = url_for('confirm_email_restablecer', token=token, _external=True)
                    template = render_template('correoRecuperar.html', confirm_url=confirm_url) #CAMBIAR AL HMTL PARA PONER CONTRASENA
                    subject = "Recuperación de cuenta - Eventqrxpress"
                    msg = Message(subject, recipients=[email], html=template, sender="eventqrxpress@gmail.com")
                    mail.send(msg)
                    return render_template('formularioRecuperar.html')
                else:
                    flash('El usuario ingresado no está registrado en el sistema')
                    return render_template('formularioRecuperar.html')
            else:
                if verificar == True:
                    flash('Se requiere de la activación previa de tu cuenta para poder recuperar tu contraseña.')
                    return render_template('formularioRecuperar.html')
                else:
                    flash('El usuario ingresado no está registrado en el sistema')
                    return render_template('formularioRecuperar.html')
        except:
            flash(f'Error al verificar datos')
            return render_template('formularioRecuperar.html')
    else:
        return render_template('formularioRecuperar.html')

# Envio de confirmacion de correo
@app.route('/confirmRestablecer/<token>')
def confirm_email_restablecer(token):
    try:
        email = confirm_token(token)
    except:
        # En caso de cuenta creada pero no confirmada
        flash('Algo salió mal. Por favor intenta de nuevo')
        return redirect(url_for('login'))

    user = ModelUser.consulta_email(db, email)
    if user != None:
        return render_template('formularioCambiarContrasena.html', usuario = user)  # En caso de cuenta creada pero no confirmada
    else:  # Codigo expiro
        return render_template('error404.html')  # En caso de cuenta creada pero no confirmada

@app.route('/resendEmailRecuperacion', methods=['GET', 'POST'])
def resend_email_recuperacion():
    try:
        email = request.form['email']
        token = generate_confirmation_token(email)
        confirm_url = url_for('confirm_email_restablecer', token=token, _external=True)
        template = render_template('correoRecuperarContrasena.html', confirm_url=confirm_url)
        subject = "Recuperación de cuenta - Eventqrexpress"
        msg = Message(subject, recipients=[email], html=template, sender="eventqrxpress@gmail.com")
        mail.send(msg)
        flash('Se ha enviado un nuevo correo de recuperación de cuenta.')
        return render_template('validacionCorreoRecuperar.html', email=email)
    except:  # Intenta ingresar con un correo no registrado
        flash('Ha ocurrido un error en el proceso, inténtalo de nuevo más tarde')
        return redirect(url_for('login'))

@app.route('/contrasenaRestablecido', methods = ['POST'])
def contrasenaRestablecido():
    try:
        id_usuario = request.form['id']
        contrasena = request.form['password']
        confirmed_on = request.form['confirmed']
        if confirmed_on == 'None':
            ModelUser.update_contrasena_repartidor(db, id_usuario, contrasena)
        else:
            ModelUser.update_contrasena(db, id_usuario, contrasena)
        return redirect(url_for('login'))
    except:
        flash('Algo salió mal. Por favor intenta de nuevo')
        return redirect(url_for('login'))
######################################################################################################################

@app.route('/registrarEvento', methods=['POST'])
def registrarEvento():
    if request.method == 'POST':
        #consulta id_usuario:
        usuario = ModelUser.consulta_email(db, current_user.email)
        #consulta id_salon:
        ciudad = request.form['ciudad']
        id_deSalon= ModelSalon.consultarId(db, ciudad)
        #ruta

        execution = ModelEvento.register(db, nombre = request.form['nombre'], fecha = request.form['fecha'], horario = request.form['horario'],
        asistentes=request.form['asistentes'], tipo=request.form['tipo'], lugar=request.form['lugar'],
        id_usuario=usuario.id, id_salon=id_deSalon)  # Registralo en la BD
        # print("Registrado")
        if execution != None:  # Se registro con exito entonces tengo sus datos
            return redirect(url_for('homeCliente'))
        else:
            # flash("Algo salió mal, intenta de nuevo")
            # return render_template('formularioLoginRegister.html')
            return redirect(url_for('homeCliente'))

@app.route('/registrarAsistente/', methods=['POST'])
def registrarAsistente():
    if request.method == 'POST':
        registros = request.json 
        for registro in registros['Registros']:
            # print(registro)
            ModelUsuariosConfirmados.register(db,nombre=registro['nombre'], id_confirmacion=registro['id_confirmacion'], asiento=registro['asiento'])

        # hash_email = confirm_token(email)
        # token = generate_confirmation_token(email)
        confirmacion = ModelConfirmaciones.get_by_id(db, registro['id_confirmacion'])
        evento = ModelEvento.datosEvento(db, confirmacion.id_evento)
        email = confirmacion.email
        carpeta = f"{evento['id_usuario']}\{evento['id_usuario']}_{evento['id']}_{confirmacion.id}.png"
        carpeta_especifica = os.path.join(app.root_path, 'static', 'img', 'eventos', carpeta)
        # Envio de correo
        # print("///////////////////////////////////////////////////////////////////////////////////////////")
        # print(carpeta_especifica)
        img_path = generar_qr_temporal(f"http://127.0.0.1:5000/{carpeta_especifica}")

        # Obtener el contenido HTML del template
        url = f"http://127.0.0.1/{carpeta_especifica}"
        template = render_template('correoQRInvitacion.html', url=url)

        # Adjuntar la imagen .png y el contenido HTML al mensaje de correo
        with app.open_resource(img_path) as img_file:
            img_data = img_file.read()
            msg = Message("Invitacion - Eventqrxpress", recipients=[email], sender="eventqrxpress@gmail.com")
            msg.attach("imagen.png", "image/png", img_data)
            msg.html = template  # Agregar el contenido HTML al mensaje

        # Enviar el correo
        mail.send(msg)

        mensaje = {'status': 'success', 'message': 'Operación exitosa'}
        return jsonify(mensaje)
        
def generar_qr_temporal(link):
    # Crear un código QR y guardar temporalmente en una ubicación única
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(link)
    qr.make(fit=True)

    # Crear un archivo temporal para la imagen .png
    with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_file:
        img = qr.make_image(fill_color="black", back_color="white")
        img.save(temp_file.name)
        return temp_file.name

# Reenvío de correo
@app.route('/resendRepartidor/<email>')
def resend_confirmation_repartidor(email):
    # hash_email = confirm_token(email)
    token = generate_confirmation_token(email)
    # Envio de correo
    confirm_url = url_for('confirm_email_restablecer', token=token, _external=True)
    template = render_template('correoValidacionesRepartidor.html', confirm_url=confirm_url)
    subject = "Activación de cuenta - Eventqrxpress"

    msg = Message(subject, recipients=[email], html=template, sender="eventqrxpress@gmail.com")
    mail.send(msg)

    flash('Tu cuenta sigue sin confirmar, hemos enviado un nuevo correo de cambio de contraseña.')
    return render_template('ingresar.html')

@app.route('/user/datos')
def datosCliente():
    cliente = ModelUser.infoRepartidor(db, current_user.email)
    return render_template('infoCliente.html', cliente=cliente)
    
@app.route('/user/tarjetas', methods=['GET', 'POST'])
@login_required
def userTarjetas():
    if request.method == 'POST':
        try:
            dato = request.form['dato_consulta']
            if dato == '':
                list_tarjetas = ModelTarjeta.consultAll(db, current_user.id)
                return render_template('tablaTarjetas.html', tarjetas = list_tarjetas)
            else:
                list_tarjetas = ModelTarjeta.consult_to_search(db, dato)
                flash("Resultados de búsqueda para '"+dato+"'")
                return render_template('tablaTarjetas.html', tarjetas = list_tarjetas)
        except:
            return render_template('tablaTarjetas.html', tarjetas = [])
    else:
        try:
            list_tarjetas = ModelTarjeta.consultAll(db, current_user.id)
            return render_template('tablaTarjetas.html', tarjetas = list_tarjetas)
        except:
            flash("Ha ocurrido un error al consultar tarjetas")
            return render_template('tablaTarjetas.html', tarjetas = [])


@app.route('/user/agregarTarjeta', methods=['GET', 'POST'])
@login_required
def agregarTarjeta():
    if request.method == 'POST':
        nombre = request.form['inputNombre']
        numtarjeta = request.form['inputNumero']
        month = request.form['mes']
        year = request.form['year']
        if len(month) == 1:
            expiracion =  '0'+ month + '-' + year
        else:
            expiracion = month + '-' + year
        cvv = request.form['inputCCV']
        tarjeta = Tarjeta(numtarjeta, expiracion, nombre, current_user.id, cvv)
        ModelTarjeta.register(db, tarjeta)
        flash(f"Tarjeta con terminacion {numtarjeta[15:19]} agregada con éxito")
        return render_template('AgregarTarjeta.html')
    else:
        return render_template('AgregarTarjeta.html')


@app.route('/user/tarjetas/actualizar', methods = ['GET', 'POST'])
def tarjetasActualizar():
    try:
        id_recibido = request.form['id']
        current = ModelTarjeta.consult_by_id(db, id_recibido)
        return render_template('EditarTarjeta.html', tarjeta=current)
    except:
        return render_template('EditarTarjeta.html', tarjeta={})

@app.route('/user/tarjetas/actualizado', methods=['GET', 'POST'])
def tarjetasActualizado():
    id_recibido = request.form['id']
    nombre = request.form['nombre']
    numtarjeta = request.form['numtarjeta']
    month = request.form['mes']
    year = request.form['year']
    expiracion = month + '-' + year
    cvv = request.form['cvv']
    
    try:
        ModelTarjeta.update(db, id_recibido, nombre, numtarjeta, expiracion, cvv)
        flash(f"Tarjeta con terminacion {numtarjeta[15:19]} actualizada con éxito")
        return redirect(url_for('userTarjetas'))
    except:
        flash("Ha ocurrido un error al actualizar valores de tarjeta")
        return redirect(url_for('userTarjetas'))


@app.route('/user/tarjetas/eliminar', methods=['GET', 'POST'])
def tarjetasEliminar():
    id_recibido = request.form['id']
    try:
        current = ModelTarjeta.consult_by_id(db, id_recibido)
        print(current)
        ModelTarjeta.delete(db, id_recibido)
        flash(f"Tarjeta con terminacion {current.numtarjeta[15:19]} eliminada con éxito")
        return redirect(url_for('userTarjetas'))
    except:
        flash("Ha ocurrido un error al eliminar tarjeta")
        return redirect(url_for('userTarjetas'))

@app.route('/user/formularioEnvio', methods=['GET', 'POST'])    
@login_required
def formularioEnvio():
    user = ModelUser.consulta_email(db, current_user.email)
    # print(user.tipo)
    if user.tipo == 'admin':
        return redirect(url_for('admin'))
    elif user.tipo == 'repartidor':
        return redirect(url_for('homeRepartidor'))
    if user.tipo == 'usuario':    
        if request.method == 'POST':
            
            destino = request.form['destino']
            origen = request.form['origen']
            tamano = request.form['tamano']
            fragil = request.form['fragil']
            nombre = request.form['nombre']
            email = request.form['email']
            telefono = request.form['telefono']
            costo = request.form['costo']
            estado = 'POR DEPOSITARSE EN LOCKER POR EL CLIENTE'
            idusuario = current_user.id
            datos = Envio(origen,estado, destino, tamano, fragil, nombre, email, telefono, costo, idusuario)
            ModelEnvio.register(db, datos)
            datosRemitente = ModelUser.consult_cliente_by_id(db, str(idusuario))

            nombreTarjeta = request.form['inputNombre']
            if nombreTarjeta != "":
                numtarjeta = request.form['inputNumero']
                expiracion = request.form['mes'] + "-" + request.form['year']
                cvv = request.form['inputCCV']
                tarjeta = Tarjeta(numtarjeta, expiracion, nombre, current_user.id, cvv)
                ModelTarjeta.register(db, tarjeta)
            datos = ModelEnvio.consultLast(db)
            now = datetime.now()
            fecha = str(now.day) + "/" + str(now.month) + "/" + str(now.year)
            return render_template('PagoCorrecto.html', datos=datos, fecha=fecha, remitente = datosRemitente)
        
        ###Funcionalidad del mapbox
        lockers = ModelMapbox.consultaCoordenadas(db)
        shutil.copy("static/js/origen.js", "static/js/mapbox2.js")
        destFile = r"static/js/mapbox2.js"
        with open(destFile, 'a', encoding="utf-8") as f:

            f.write("\nmap.on('load', () => {\n\
            // make an initial directions request that\n\
            // starts and ends at the same location\n\
            map.addSource('places', {\n\
                'type': 'geojson',\n\t\
                'data': {\n\t\t\
                    'type': 'FeatureCollection',\n\t\t\t\
                    'features': [")
            for i in range(len(lockers)):
                f.write(f"""
                        {{
                        'type': 'Feature',
                        'properties': {{
                            'description':
                                '<strong>{lockers[i][0]}</strong><p>{lockers[i][1]}</p>',
                            'icon': 'post'
                        }},
                        'geometry': {{
                            'type': 'Point',
                            'coordinates': [{lockers[i][2]}, {lockers[i][3]}]
                        }}
                    }}
                    """)
                if i!=len(lockers):
                    f.write(",\n\t\t\t\t\t\t\t")
            
            f.write("\
                                ]\n\t\t\t\
                            }\n\t\t\
                        });\n\t\
                        map.addLayer({\n\t\
                            'id': 'places',\n\t\t\
                            'type': 'symbol',\n\t\t\
                            'source': 'places',\n\t\t\
                            'layout': {\n\t\t\
                                'icon-image': ['get', 'icon'],\n\t\t\t\
                                'icon-size': 0.25,\n\t\t\t\
                                'icon-allow-overlap': true\n\t\t\t\
                            }\n\t\t\
                        });\n\
                    });\n\
            ")

            f.write("\nlet coordinatesPoints = new Map();")
            for i in range(len(lockers)):
                f.write(f"""
                    \ncoordinatesPoints.set('{lockers[i][0]}',[{lockers[i][2]}, {lockers[i][3]}])
                """)
            f.write("\nfunction convertMyRoute(inicio, fin){\n\
                        getRoute(coordinatesPoints.get(inicio), coordinatesPoints.get(fin))\n\
                    }")
        shutil.copy("static/js/mapbox2.js", "static/js/mapboxfinal.js")
        ##Fin funcionalidad Map Box
        ##Cargamos tarjetas
        listTarjetas = ModelTarjeta.consultAll(db, current_user.id)
        if listTarjetas != None:
            return render_template('formulariosPaquete.html', tarjetas=listTarjetas)
        return render_template('formulariosPaquete.html', tarjetas=[])
    else:
        return redirect(url_for('index'))

@app.route('/user/formularioPago', methods=['GET', 'POST'])
@login_required
def formularioPago():
    if request.method == 'POST':
        origen = request.form['origen']
        destino = request.form['destino']
        tamano = request.form['tamano']
        fragil = request.form['fragil']
        nombre = request.form['nombre']
        email = request.form['email']
        telefono = request.form['telefono']
        costo = request.form['costo']
        estado = "POR DEPOSITARSE EN LOCKER POR EL CLIENTE"
        idusuario = current_user.id
        datos = Envio(origen,estado ,destino, tamano, fragil, nombre, email, telefono, costo, idusuario)
        ModelEnvio.register(db, datos)
        return render_template('PagoExitoso.html')
    listTarjetas = ModelTarjeta.consultAll(db, current_user.id)

    return render_template('formularioPago.html', tarjetas=listTarjetas)


@app.route('/user/ordenGenerada', methods=['GET', 'POST'])
@login_required
def ordenGenerada():
    last_delivery = ModelEnvio.consultLast(db)
    sender = ModelUser.consulta_telefono(db, current_user.id)
    # print(last_delivery)
    # print(sender)
    return render_template('OrdenGenerada.html', datos=last_delivery, sender=sender)


@app.route('/user/pagoExitoso')
@login_required
def pagoExitoso():
    return render_template('PagoExitoso.html')


@app.route('/user/pagoFracasado')
@login_required
def pagoFracasado():
    return render_template('PagoFracasado.html')


@app.route('/user/rastrear', methods=['GET', 'POST'])
def userRastrear():
    if request.method =='POST':
        if login_user(current_user) == False:
            id = request.form['Buscar']
            envio = ModelEnvio.rastreoEnvio(db, id)
            if envio == None:
                return render_template('errorRastrear.html', envio=envio)

            elif envio.estado == "POR DEPOSITARSE EN LOCKER POR EL CLIENTE":
                return render_template('estatus_1.html', envio=envio)
            elif envio.estado == "EN ESPERA DEL REPARTIDOR":
                return render_template('estatus_2.html', envio=envio)

            elif envio.estado == "EN CAMINO":
                return render_template('estatus_3.html', envio=envio)

            elif envio.estado == "ENTREGADO EN LOCKER DESTINO":
                return render_template('estatus_4.html', envio=envio)
            elif envio.estado == "ALMACEN":
                return render_template('estatus_4_2.html', envio=envio)
            elif envio.estado == "EN ALMACEN":
                return render_template('estatus_5_4.html', envio=envio)

            elif envio.estado == "RECOGIDO":
                return render_template('estatus_5.html', envio=envio)
            else:
                return render_template('errorRastrear.html', envio=envio)
        else:
            # nombre = current_user.nombre
            id = request.form['Buscar']
            envio = ModelEnvio.rastreoEnvio(db, id)
            if envio == None:
                return render_template('errorRastrear.html', envio=envio)
            elif envio.estado == "POR DEPOSITARSE EN LOCKER POR EL CLIENTE":
                return render_template('estatusCliente_1.html', envio=envio)
            elif envio.estado == "EN ESPERA DEL REPARTIDOR":
                return render_template('estatusCliente_2.html', envio=envio)
            elif envio.estado == "EN CAMINO":
                return render_template('estatusCliente_3.html', envio=envio)
            elif envio.estado == "ENTREGADO EN LOCKER DESTINO":
                return render_template('estatusCliente_4.html', envio=envio)

            elif envio.estado == "RECOGIDO":
                return render_template('estatusCliente_5.html', envio=envio)
            elif envio.estado == "ALMACEN":
                return render_template('estatusCliente_4_2.html', envio=envio)
            elif envio.estado == "EN ALMACEN":
                return render_template('estatusCliente_5_4.html', envio=envio)
            else:
                return render_template('errorRastrearCliente.html')
    else:
        return render_template('rastrear.html')


@app.route('/user/historial', methods = ['GET', 'POST'])
@login_required
def userHistorial():
    if request.method == 'POST':
        try:
            currentUser = ModelUser.consulta_email(db, current_user.email)
            id_usuario = str(currentUser.id)
            dato_consulta = request.form['dato_consulta']
            if dato_consulta == '':
                enviosUser = ModelEnvio.consult_all_by_user(db, id_usuario)
                return render_template('historialEnvios.html', envios = enviosUser)
            else:
                enviosUser = ModelEnvio.consult_to_search_paquete(db, id_usuario, dato_consulta)
                flash(f"Resultados de búsqueda para '{dato_consulta}'")
                return render_template('historialEnvios.html', envios = enviosUser)
        except:
            return render_template('historialEnvios.html', envios = [])
    else:
        try:
            currentUser = ModelUser.consulta_email(db, current_user.email)
            print(currentUser.id)
            enviosUser = ModelEnvio.consult_all_by_user(db, currentUser.id)
            return render_template('historialEnvios.html', envios = enviosUser)
        except:
            flash("Ha ocurrido un error al realizar la búsqueda")
            return render_template('historialEnvios.html', envios = [])

#########################################################################################
################################## Usuario administrador ################################
#########################################################################################
# Ruta raíz
@app.route('/admin')
@login_required
def admin():
    user = ModelUser.consulta_email(db, current_user.email)
    if user.tipo == 'admin':
        return render_template('administrador.html')
    else:
        return redirect(url_for('homeCliente'))

# Administracion de lockers
@app.route('/admin/lockers', methods = ['GET', 'POST'])
def lockers():
    if request.method == 'GET': # Por get
        try:
            list_lockers = ModelLocker.consultAll(db)
            return render_template('TablaLockers.html', lockers=list_lockers)
        except:
            flash("Ha ocurrido un error al consultar sucursales")
            return render_template('TablaLockers.html', lockers=[])
    if request.method == 'POST': # Por post
        try:
            dato = request.form['dato_consulta']
            if dato == '':
                list_lockers = ModelLocker.consultAll(db)
                return render_template('TablaLockers.html', lockers=list_lockers)
            else:
                list_lockers = ModelLocker.consult_to_search(db, dato)
                flash("Resultados de búsqueda para '"+dato+"'")
                return render_template('TablaLockers.html', lockers=list_lockers)
        except:
            return render_template('TablaLockers.html', lockers=[])
        
@app.route('/admin/lockers/agregar')
def lockersAgregar():
    return render_template('agregarLockers.html')

@app.route('/admin/lockers/agregado', methods=['POST'])
def lockersAgregado():
    ubicacion = request.form['Ubicacion']
    direccion = request.form['Direccion']
    cantidad = request.form['Cantidad']
    latitud = request.form['Latitud']
    longitud = request.form['Longitud']
    cantidadS = 5 * int(cantidad)
    cantidadM = 6 * int(cantidad)
    cantidadL = 3 * int(cantidad)
    disponibilidad = cantidadS + cantidadM + cantidadL

    try:
        ModelLocker.register(db, ubicacion, direccion, cantidadS, cantidadM, cantidadL, disponibilidad, latitud, longitud)
        flash("Sucursal con ubicación '" + ubicacion + "' agregado con éxito")
        return redirect(url_for('lockers'))
    except:
        flash("Ha ocurrido un error al agregar sucursal")
        return redirect(url_for('lockers'))

@app.route('/admin/lockers/modificar-estado', methods=['GET', 'POST'])
def lockersModificarEstado():
    try:
        id_recibido = request.form['id']
        estado_recibido = int(request.form['confirmed'])
        estado_recibido = 1 - estado_recibido
        ModelLocker.modificar_estado(db, id_recibido, estado_recibido)
        currentLocker = ModelLocker.consult_by_id(db, id_recibido)
        flash(f"Estado de sucursal {currentLocker.ubicacion} actualizada con éxito")
        return redirect(url_for('lockers'))
    except:
        flash("Ha ocurrido un error al actualizar el estado sucursal")
        return redirect(url_for('lockers'))

@app.route('/admin/lockers/actualizar', methods=['GET','POST'])
def lockersActualizar():
    try:
        id_locker = request.form['id']
        current = ModelLocker.consult_by_id(db, id_locker)
        cantidad = str(current.cantidadS/5)
        i=0
        nolockers = ''
        while cantidad[i] != '.' and i < len(cantidad):
            nolockers += cantidad[i]
            i+=1
        return render_template('EditarLockers.html', locker=current, cantidad=nolockers)
    except:
        return render_template('EditarLockers.html', locker={}, cantidad='')

@app.route('/admin/lockers/actualizado', methods=['POST'])
def lockersActualizado():
    id_recibido = request.form['id']
    direccion = request.form['Direccion']
    cantidad = request.form['Cantidad']
    latitud = request.form['Latitud']
    longitud = request.form['Longitud']
    cantidadS = 5 * int(cantidad)
    cantidadM = 6 * int(cantidad)
    cantidadL = 3 * int(cantidad)
    try:
        ModelLocker.update(db, id_recibido, direccion, cantidadS, cantidadM, cantidadL, latitud, longitud)
        currentLokcer = ModelLocker.consult_by_id(db, id_recibido)
        flash(f"Sucursal con ubicación '{currentLokcer.ubicacion}' actualizada con éxito")
        return redirect(url_for('lockers'))
    except:
        flash("Ha ocurrido un error al actualizar valores del sucursal")
        return redirect(url_for('lockers'))
    
@app.route('/admin/lockers/eliminar', methods=['POST'])
def lockersEliminar():
    try:
        id_recibido = request.form['id']
        currentLokcer = ModelLocker.consult_by_id(db, id_recibido)
        ModelLocker.delete(db, id_recibido)
        flash(f"Sucursal {currentLokcer.ubicacion} eliminada con éxito. Se tienen 72h para desalojar los lockers.")
        return redirect(url_for('lockers'))
    except:
        flash("Ha ocurrido un error al eliminar sucursal")
        return redirect(url_for('lockers'))



# Administracion de repartidores
@app.route('/admin/repartidores', methods = ['GET', 'POST'])
def repartidores():
    if request.method == 'GET':
        try:
            list_repartdores = ModelUser.consultRepartidoresAll(db)
            return render_template('tablaRepartidores.html', repartidores=list_repartdores)
        except:
            flash("Ha ocurrido un error al consultar reprtidores")
            return render_template('tablaRepartidores.html', repartidores=[])
    if request.method == 'POST': # Por post
        try:
            dato = request.form['dato_consulta']
            if dato == '':
                list_repartdores = ModelUser.consultRepartidoresAll(db)
                return render_template('tablaRepartidores.html', repartidores=list_repartdores)
            else:
                list_repartdores = ModelUser.consult_to_search_repartidor(db, dato)
                flash("Resultados de búsqueda para '"+dato+"'")
                return render_template('tablaRepartidores.html', repartidores=list_repartdores)
        except:
            return render_template('tablaRepartidores.html', repartidores=[])
    
@app.route('/admin/repartidores/agregar')
def repartidoresAgregar():
    return render_template('agregarRepartidor.html')

@app.route('/admin/repartidores/agregado', methods=['POST'])
def repartidoresAgregado():
    try:
        email = request.form['email']
        password = request.form['password']
        nombre = request.form['nombre']
        telefono = request.form['telefono']
        direccion = request.form['direccion']
        sucursal =request.form['sucursal']  
        
        if ModelUser.check_email(db, email) == False:
            execution = ModelUser.registerRepartidor(db, email, password, nombre, telefono, direccion, sucursal)  # Registralo en la BD
            if execution != None:  # Se registro con exito entonces tengo sus datos
                token = generate_confirmation_token(email)
                
                confirm_url = url_for('confirm_email_restablecer', token=token, _external=True)
                template = render_template('correoValidacionesRepartidor.html', confirm_url=confirm_url)
                subject = "Activación de cuenta - Eventqrxpress"
                
                msg = Message(subject, recipients=[email], html=template, sender="eventqrxpress@gmail.com")
                
                mail.send(msg)        
                
                flash("Repartidor "+ nombre +" agregado con exito y en espera de activación")
                return redirect(url_for('repartidores'))
            else:
                flash("Algo salió mal, intenta de nuevo")
                return redirect(url_for('repartidores'))
        else:
            flash("Ese email ya esta registrado")
            return render_template('agregarRepartidor.html')
    except:
        flash("Algo salió mal, intenta de nuevo")
        return redirect(url_for('repartidores'))

@app.route('/admin/repartidores/modificar-estado', methods=['POST'])
def repartidoresModificarEstado():    
        try:
            id_recibido = request.form['id']
            currentRepartidor = ModelUser.consult_repartidor_by_id(db, id_recibido)
            if currentRepartidor.confirmed_on == None:
                flash(f"No es posible modificar estado del repartidor {currentRepartidor.nombre}. La cuenta no ha sido activada")
                return redirect(url_for('repartidores'))
            else:
                estado_recibido = int(request.form['confirmed'])
                estado_recibido = 1 - estado_recibido
                ModelUser.modificar_estado(db, id_recibido, estado_recibido)
                flash(f"Estado de repartidor {currentRepartidor.nombre} actualizado con éxito")
                return redirect(url_for('repartidores'))
        except:
            flash("Ha ocurrido un error al actualizar el estado repartidor")
            return redirect(url_for('repartidores'))

@app.route('/admin/repartidores/editar', methods=['GET','POST'])
def repartidoresActualizar():
    try:
        id_repartidor = request.form['id']
        current = ModelUser.consult_repartidor_by_id(db, id_repartidor)
        return render_template('editarRepartidor.html', repartidor = current)
    except:
        flash("Ha ocurrido un error al obtener datos del repartidor")
        return render_template('editarRepartidor.html', repartidor = {})

@app.route('/admin/repartidores/actualizado', methods=['GET', 'POST'])
def repartidoresActualizado():
    try:
        id_recibido = request.form['id']
        nombre = request.form['Nombre']
        email = request.form['Email']
        telefono = request.form['Telefono']
        direccion = request.form['Direccion']
        sucursal = request.form['sucursal']
        ModelUser.update_repartidor(db, id_recibido,nombre, email, telefono, direccion, sucursal)
        flash(f"Repartidor {nombre} actualizado con éxito")
        return redirect(url_for('repartidores'))
    except:
        flash("Ha ocurrido un error al actualizar valores del repartidor")
        return redirect(url_for('repartidores'))

@app.route('/admin/repartidores/eliminar', methods=['GET', 'POST'])
def repartidoresEliminar():
    try:
        id_recibido = request.form['id']
        currentRepartidor = ModelUser.consult_repartidor_by_id(db, id_recibido)
        ModelUser.delete(db, id_recibido)
        flash(f"Repartidor {currentRepartidor.nombre} eliminado con éxito")
        return redirect(url_for('repartidores'))
    except:
        flash("Ha ocurrido un error al eliminar al repartidor")
        return redirect(url_for('repartidores'))

# Administracion de clientes
@app.route('/admin/clientes', methods = ['GET', 'POST'])
def clientes():
    if request.method == 'GET':
        try:
            list_clientes = ModelUser.consultClientesAll(db)
            return render_template('tablaClientes.html', clientes=list_clientes)
        except:
            flash("Ha ocurrido un error al consultar clientes")
            return render_template('tablaClientes.html', clientes=[])
    if request.method == 'POST': # Por post
        try:
            dato = request.form['dato_consulta']
            if dato == '':
                list_clientes = ModelUser.consultClientesAll(db)
                return render_template('tablaClientes.html', clientes=list_clientes)
            else:
                list_clientes = ModelUser.consult_to_search_cliente(db, dato)
                flash("Resultados de búsqueda para '"+dato+"'")
                return render_template('tablaClientes.html', clientes=list_clientes)
        except:
            return render_template('tablaClientes.html', clientes=[])

@app.route('/admin/clientes/visualizar', methods=['GET','POST'])
def clientesVisualizar():    
    try:
        id_recibido = request.form['id']
        current = ModelUser.consult_cliente_by_id(db,id_recibido)
        if current.confirmed_on == None:
            flash("No se puede visualizar envíos de un usuario inactivo")
            return redirect(url_for('clientes'))
        else:
            dato_consulta = request.form['dato_a_consultar']
            if dato_consulta == '':
                print("Sin dato a consultar")
                currentUser = ModelUser.consult_cliente_by_id(db, id_recibido)
                list_of_paquetes = ModelEnvio.consult_all_by_user(db, id_recibido)
                print(list_of_paquetes)
                return render_template('visualizarCliente.html', paquetes = list_of_paquetes, usuario = currentUser)
            else:
                print("Con dato a consultar")
                currentUser = ModelUser.consult_cliente_by_id(db, id_recibido)
                list_of_paquetes = ModelEnvio.consult_to_search_paquete(db, id_recibido, dato_consulta)
                flash("Resultados de búsqueda para '"+dato_consulta+"'")
                return render_template('visualizarCliente.html', paquetes = list_of_paquetes, usuario = currentUser)
    except:
        flash("Ha ocurrido un error al obtener el hisorial del cliente")
        return render_template('visualizarCliente.html', paquetes = [], usuario = {})

@app.route('/admin/clientes/actualizar', methods=['GET','POST'])
def clientesActualizar():
    try:
        id_recibido = request.form['id']
        current = ModelUser.consult_cliente_by_id(db, id_recibido)
        if current.confirmed_on == None:
            flash("No se puede editar a un usuario inactivo")
            return redirect(url_for('clientes'))
        else:
            return render_template('editarUsuarios.html', cliente = current)
    except:
        flash("Ha ocurrido un error al obtener datos del cliente")
        return render_template('editarUsuarios.html', cliente = current)

@app.route('/admin/clientes/actualizado', methods=['GET', 'POST'])
def clientesActualizado():
    try:
        id_recibido = request.form['id']
        nombre = request.form['Nombre']
        email = request.form['Email']
        telefono = request.form['Telefono']
        direccion = request.form['Direccion']
        ModelUser.update_cliente(db, id_recibido,nombre, email, telefono, direccion)
        flash(f"Usuario {nombre} actualizado con éxito")
        return redirect(url_for('clientes'))
    except:
        flash("Ha ocurrido un error al actualizar valores del cliente")
        return redirect(url_for('clientes'))

@app.route('/admin/clientes/eliminar', methods=['GET','POST'])
def clientesEliminar():
    try:
        id_recibido = request.form['id']
        currentUser = ModelUser.consult_cliente_by_id(db, id_recibido)
        if currentUser.confirmed_on == None:
            flash("No se puede deshabilitar a un usuario inactivo")
            return redirect(url_for('clientes'))
        else:
            ModelUser.modificar_estado(db, id_recibido, '0')
            flash(f"Usuario {currentUser.nombre} deshabilitado con éxito")
            return redirect(url_for('clientes'))
    except:
        flash("Ha ocurrido un error al deshabilitar al cliente")
        return redirect(url_for('clientes'))


#########################################################################################
################################## Usuario repartidor ###################################
#########################################################################################
@app.route('/repartidor')
@login_required
def homeRepartidor():
    user = ModelUser.consulta_email(db, current_user.email)
    if user.tipo == 'repartidor':
        return render_template('bienvenidaRepartidor.html')
    else:
        return redirect(url_for('home'))


@app.route('/repartidor/datos')
def datosRepartidor():
    repartidor = ModelUser.infoRepartidor(db, current_user.email)

    return render_template('infoRepartidor.html', repartidor=repartidor)


@app.route('/repartidor/pendientes', methods=['GET', 'POST'])
def listaDePaquetes():
    fly = 0
    if request.method == 'POST' and request.form['estado'] != 'ELEGIR ESTADO':
        estado = request.form['estado']
        usuario = ModelUser.get_by_id(db,current_user.id)

        if estado=="EN ESPERA DEL REPARTIDOR":
            flash("Resultados para 'Paquetes por recolectar'")
            list_paquetes = ModelRepartidor.paquetesRecolectar(db, usuario.sucursal)
        elif estado=="EN CAMINO":
            flash("Resultados para 'Paquetes por entregar'")
            list_paquetes = ModelRepartidor.paquetesEntregar(db, usuario.sucursal)
        fly = 1
    else:
        usuario = ModelUser.get_by_id(db,current_user.id)
        list_paquetes = ModelRepartidor.paquetesAll(db, usuario.sucursal)
    # print(list_paquetes)
    if list_paquetes != None:
        # flash("Resultados")
        return render_template('pendientesRepartidor.html', paquetes=list_paquetes, fly=fly)
    else:
        return render_template('pendientesRepartidor.html', paquetes=[], fly=fly)


@app.route('/repartidor/rutaEnvio')
def rutaEnvio():
    repartidor = ModelUser.infoRepartidor(db, current_user.email)
    return render_template('RutaEnvio.html', repartidor=repartidor)

@app.route('/repartidor/modificar-estado', methods=['GET', 'POST'])
def repartidorModificarEstado():
    try:
        id_recibido = request.form['id']
        estado = ModelEnvio.consultaEstado(db, id_recibido)
        if estado == "EN ESPERA DEL REPARTIDOR":
            new_estado = "EN CAMINO"
        elif estado == "EN CAMINO":
            new_estado = "ENTREGADO EN LOCKER DESTINO"
        ModelEnvio.ChangeStatus(db, id_recibido, new_estado)
        flash(f"Estado de paquete con ID: {id_recibido} modificado a '{new_estado}' con éxito")
        return redirect(url_for('listaDePaquetes'))
    except:
        flash("Ha ocurrido un error al actualizar el estado del paquete")
        return redirect(url_for('listaDePaquetes'))

#############################################################################################################
############################# Funciones de redireccionamineto despues de un error ###########################
#############################################################################################################

# En caso de que no este logeado y quiera entrar al sistema redirige al login
def status_401(error):
    flash('Para acceder, por favor inicia sesión.')
    return redirect(url_for('login'))


# En caso de que el usuario acceda a una pagina no definida
def status_404(error):
    # return "<h1>Página no encontrada</h1>", 404
    return render_template('error404.html')


# This forces the app to start at '/'

if __name__ == '__main__':
    app.config.from_object(config['development'])
    csrf.init_app(app)
    app.register_error_handler(401, status_401)
    app.register_error_handler(404, status_404)
    # Obtener la dirección IP local
    # app.run()
    # app.run(host=host, port=5000)
    app.run()
