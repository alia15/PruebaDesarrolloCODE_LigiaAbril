# PruebaDesarrolloCODE_LigiaAbril

El Profesor
Un Profesor requiere un sistema que le permite crear exámenes de selección múltiple, es
decir el sistema web deberá darle la posibilidad de crear un pequeño examen y
posteriormente generar un Link para que este pueda ser enviado a una persona
posteriormente.
Especificaciones:
- El examen a crear consta de una sola serie de preguntas con un máximo de 5
preguntas.
- Las cantidad de preguntas que se crearán serán las que el profesor haya
establecido en “detalles de examen”, para posteriormente solo agregar las preguntas
y las respuestas.
- Al momento de guardar el examen se genera un código único el cual podrá ser
adjuntado a la URL para poder acceder a él eventualmente
- Ejemplo: http://localhost/examen/78347398
- Cada Examen generado deberá ser guardado en la Base de datos así como el
código del examen para eventualmente ser accedido.
El alumno.
- Se espera que el alumno tenga acceso al URL, el cual al entrar a la URL enviada se
accedera al examen correspondiente dibujando las preguntas y las posibles
respuestas.
Arquitectura requerida
Backend: Nodejs y Express.
Frontend: HTML y Jquery (Se deben consumir los SW del backend a través de Jquery)
SW: ApiRestFull (Cualquier funcionalidad deberá ser accedida a través de un SW rest)
Base de datos: Mysql
CONSIDERACIONES
- No se requiere que el examen generado sea respondido, únicamente se mostrará al
entrar a la URL determinada.
- No se requiere ningún tipo de Autenticación o login
- No se requiere que los URL manejan ningún tipo de Token
- Se deberá subir los cambios al repositorio del cual se descargó este enunciado.
