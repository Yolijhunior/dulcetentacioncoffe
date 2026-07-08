# Sistema de Gestión de Pedidos - Dulce Tentación Café

### Aplicación de Toma de Órdenes & Control de Cocina en Tiempo Real

<p align="left">`
  <img src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/expo-%23000020.svg?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

Este proyecto es una aplicación móvil nativa desarrollada con **React Native** y **Expo**, estructurada bajo la metodología de **Clean Architecture**. Desacopla de manera limpia las entidades del dominio, el manejo del estado global y la capa visual para un entorno de restaurante de alta demanda.

## 🎯 Core de Negocio Elegido
El núcleo operativo se centra en la **automatización de comandas gastronómicas**, clasificando las órdenes en tiempo real según su modalidad de consumo (`Salón`, `Delivery`, `Para Llevar`) y su nivel de urgencia en cocina (`BAJA`, `MEDIA`, `ALTA`). Esto elimina los errores manuales de traspaso de información y optimiza los tiempos de preparación en el restaurante.

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
    - `AppContext.tsx`: Provider de datos centralizado global.
    - `AppReducer.ts`: Máquina de estados limpia para acciones `ADD_ORDER`, `UPDATE_STATUS`, `DELETE_ORDER` y `Maps`.
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


## Modo de Probar el Flujo CRUD

Para evaluar la persistencia reactiva en memoria y las operaciones fundamentales del sistema, realice los siguientes pasos dentro de la interfaz:

1. **CREATE (Crear):** Desde la pantalla de inicio, presione el botón flotante de agregar. Complete el formulario con los datos del cliente, elija una modalidad de servicio (observe cómo el botón de Delivery cambia a azul y renderiza el texto correctamente) y asigne prioridad. Presione "Enviar a Cocina".
2. **READ (Leer / Listar):** El sistema lo redirigirá al panel principal (HomeScreen), donde visualizará la nueva orden listada dinámicamente con toda la información y estilo correspondiente.
3. **UPDATE (Actualizar Estado):** Toque la tarjeta del pedido recién creado. Esto abrirá la pantalla de detalles (DetailScreen). Presione sobre los botones del flujo de cocina ("En Proceso" o "Finalizado") para ver cómo cambia la etiqueta de estado de manera reactiva.
4. **DELETE (Eliminar):** Dentro de la misma pantalla de detalle del pedido, localice y presione el botón "Eliminar Orden" (icono de papelera). La orden será removida del almacén global y desaparecerá instantáneamente de la lista del panel principal.

---

##  Instrucciones de Instalación y Ejecución

Sigue estos pasos para clonar y levantar el entorno de desarrollo local:

### Prerrequisitos

- Tener instalado Node.js (versión LTS).
- Tener instalado Java Development Kit (JDK 17).
- Tener instalado Android Studio (con emulador configurado) o Xcode (para macOS).
- Aplicación Expo Go en tu dispositivo físico o emulador en marcha.

### Clonar el repositorio
git clone https://github.com/Yolijhunior/dulcetentacioncoffe.git

### 1. Instalar dependencias

Abre una terminal en la carpeta raíz del proyecto y ejecuta el comando: npm install

### 2. Iniciar y Ejecutar en Entornos Nativos o Expo

Opción A: Despliegue Nativo Directo (Recomendado para evaluación estricta)
Para compilar y lanzar el proyecto en los simuladores nativos del sistema ejecute los siguientes comandos según su plataforma:
Para Android Studio: npx react-native run-android
Para Xcode en macOS: npx react-native run-ios

Opción B: Mediante Expo Bundler
Si prefiere levantar el servidor de desarrollo multiplataforma Metro lance el comando: npx expo start

### 3. Despliegue

- Celular Físico: Escanea el código QR que genera la consola desde tu cámara (iOS) o la app Expo Go (Android).
- Emulador: Presiona la tecla a para Android o i para el simulador de iOS directamente en la terminal.

### 4. Integrantes del Grupo 13:
- VALDIVIEZO ATERO JHUNIOR
- ZURITA RIMAICUNA ABNER
