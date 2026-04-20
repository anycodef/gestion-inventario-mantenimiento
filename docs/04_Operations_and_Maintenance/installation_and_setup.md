# Instalación y Configuración (Installation & Setup)

Esta guía provee las instrucciones necesarias para desplegar el sistema (Frontend y Backend) en un entorno local o de desarrollo.

## Prerrequisitos
- **Node.js**: Versión 18.x o superior.
- **Gestor de Paquetes**: `npm` (incluido con Node.js).
- **Base de Datos**: Instancia de MySQL o PostgreSQL en ejecución.

---

## 1. Configuración del Backend

El backend es una API REST construida con Node.js, Express, y TypeScript.

### Pasos:
1. Navega al directorio del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz de `backend`.
   - Agrega las credenciales de base de datos según tu motor preferido:
     ```env
     # Ejemplo genérico
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=secret
     DB_NAME=inventario_db
     PORT=3001
     ```
4. Ejecuta el servidor en modo desarrollo:
   ```bash
   npm start
   ```
   *Nota:* Asegúrate de que las tablas estén creadas en tu base de datos de acuerdo a los modelos.

---

## 2. Configuración del Frontend

El frontend es una aplicación web construida con Next.js y React.

### Pasos:
1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   - Crea un archivo `.env.local` en la raíz de `frontend`.
   - Especifica la URL base de la API del backend:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3001/api
     ```
4. Ejecuta el servidor de desarrollo de Next.js:
   ```bash
   npm run dev
   ```
5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.