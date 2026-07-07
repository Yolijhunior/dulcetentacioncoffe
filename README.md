# Sistema de Gestión de Pedidos - Dulce Tentación Café

### Aplicación de Toma de Órdenes & Control de Cocina en Tiempo Real

<p align="left">
  <img src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/expo-%23000020.svg?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

Este proyecto es una aplicación móvil nativa desarrollada con **React Native** y **Expo**, estructurada bajo la metodología de **Clean Architecture**. Desacopla de manera limpia las entidades del dominio, el manejo del estado global y la capa visual para un entorno de restaurante de alta demanda.

---

##  Tecnologías y Herramientas Utilizadas

- **Framework:** Expo (SDK Avanzado) administrado mediante Metro Bundler.
- **Estilos y Temas:** Paleta personalizada centralizada en un archivo global (`theme.ts`) con tipografía y radios de borde dinámicos.
- **Lenguaje:** TypeScript (Tipado e interfaces estrictas para contratos de modelos y acciones del reductor).

---

## Arquitectura del Proyecto (Clean Architecture)

El código fuente está organizado siguiendo principios de diseño modular para garantizar escalabilidad, mantenibilidad y una revisión académica impecable:

- **src/**: Raíz de la lógica del aplicativo.
  - **domain/**: Capa de Dominio (Reglas e Interfaces Esenciales de Negocio)
    - `order.ts`: Definición de tipos estructurados (`Order`, `StatusType`, `PriorityType`, `ServiceType`).
  - **infrastructure/**: Capa de Infraestructura (Persistencia y Estado Global)
    - `AppContext.tsx`: Proveedor de datos centralizado global.
    - `AppReducer.ts`: Máquina de estados limpia para acciones `ADD_ORDER`, `UPDATE_STATUS`, `DELETE_ORDER` y `NAVIGATE`.
  - **presentation/**: Capa de Presentación (Interfaz de Usuario)
    - **components/**: Componentes Reutilizables y Modulares
      - `CustomInput.tsx`: Input estilizado con validación en tiempo real y soporte para estados deshabilitados.
      - `OrderCard.tsx`: Tarjeta interactiva de pedido con indicadores visuales por prioridad.
      - `StatusChip.tsx`: Etiqueta dinámica enlazada directamente al estado del pedido.
    - **screens/**: Pantallas o Vistas del Sistema
      - `WelcomeScreen.tsx`: Pantalla de bienvenida interactiva de la cafetería.
      - `HomeScreen.tsx`: Panel principal de monitoreo de comandas y control de estados.
      - `CreateScreen.tsx`: Formulario de registro de nuevas órdenes con selectores colorimétricos dinámicos.
      - `DetailScreen.tsx`: Vista detallada y edición segura de especificaciones del pedido.
  - **shared/**: Utilidades Comunes Globales
    - `theme.ts`: Token de colores institucionales enlazado dinámicamente al negocio (Verde para Salón, Azul para Delivery, Morado para Llevar).
    - `validations.ts`: Motores de validación sincrónica para prevención de datos vacíos.

---

## Características Implementadas y Reglas de Negocio

### 1. Sistema Colorimétrico Dinámico por Servicio

- Se implementó un mapeo visual dinámico e intuitivo dentro del formulario de registro. Al presionar el tipo de servicio, el botón se ilumina automáticamente con su color de identidad correspondiente (Verde Esmeralda para Consumo Local, Azul Eléctrico para Delivery de rapidez, Morado Pastel para Takeout) mejorando la velocidad operativa en caja.

### 2. Validaciones Rigurosas en el Formulario

- El sistema de envío cuenta con lógica de validación instantánea que previene campos en blanco o formatos erróneos. Adicionalmente, se incorporó la propiedad de lectura condicional en inputs clave (`editable={false}`) para asegurar la consistencia del flujo de navegación.

### 3. Escalabilidad Mediante Reducer y Context

- Toda la manipulación de arreglos de órdenes de comida (agregar, actualizar estado a Cocina/Finalizado o eliminar pedidos) se ejecuta centralizadamente en un solo flujo predictivo unidireccional, evitando efectos secundarios o renderizados innecesarios en la app.

---

##  Instrucciones de Instalación y Ejecución

Sigue estos pasos para clonar y levantar el entorno de desarrollo local:

### Prerrequisitos

- Tener instalado **Node.js** (versión LTS).
- Aplicación **Expo Go** en tu dispositivo físico o emulador Android Studio / Xcode en marcha.

### Clonar el repositorio
git clone https://github.com/Yolijhunior/dulcetentacioncoffe.git

### 1. Instalar dependencias

Abre una terminal en la carpeta raíz del proyecto y ejecuta:
npm install

### 2. Iniciar el servidor Metro de Expo

Lanza el empaquetador Metro bundler mediante el comando:
npx expo start

### 3. Despliegue

- **Celular Físico:** Escanea el código QR que genera la consola desde tu cámara (iOS) o la app Expo Go (Android).
- **Emulador:** Presiona la tecla `a` para Android o `i` para el simulador de iOS directamente en la terminal.

### 4. Integrantes del Grupo:
- VALDIVIEZO ATERO JHUNIOR
- ZURITA RIMAICUNA ABNER
