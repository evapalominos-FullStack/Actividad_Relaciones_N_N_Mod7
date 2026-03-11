🎬 Proyecto Cine DB - Relaciones Many-to-Many

Aplicación web con Node.js, Express, Sequelize y PostgreSQL 
que gestiona Películas y Actores mediante una tabla intermedia, 
incluyendo operaciones transaccionales.

🛠️ Requisitos previos
Node.js instalado.
PostgreSQL corriendo localmente.
Base de datos creada (nombre sugerido: m7).

🚀 Instalación y Configuración
Instalar dependencias:
npm install express sequelize pg pg-hstore cors dotenv
Configurar variables de entorno:
Crea un archivo .env en la raíz con el siguiente formato:
env
PORT=3000
DB_NAME=m7
DB_USER=tu_usuario
DB_PASS=tu_password
DB_HOST=localhost
DB_PORT=5432


Iniciar el servidor:
node server.js

📋 Endpoints de la API
GET /peliculas: Lista todas las películas con sus actores asociados.
GET /actores: Lista todos los actores con sus películas.
POST /peliculas: Crea una nueva película.
POST /actores: Crea un nuevo actor.
POST /asignar-actor: Operación Transaccional que vincula un actor a una película en la tabla intermedia.

💻 Uso del Frontend
Abrir archivo index.html en cualquier navegador. 
Desde la interfaz podrás:
Crear una película y obtener su ID.
Crear un actor y obtener su ID.
Ingresar ambos IDs en el formulario de vinculación para ejecutar la transacción.
Actualizar la lista para ver la relación N-N reflejada.
==================================================
DESARROLLO DE APLICACIONES FULL STACK JAVASCRIPT TRAINEE V2.0

   ASTRID EVA PALOMINOS ESPINOZA
