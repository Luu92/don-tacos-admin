# 🌮 Don Taco's Food - Panel Administrativo

Sistema administrativo desarrollado con **Angular 22** para la gestión de pedidos, alimentos, categorías y promociones de la taquería **Don Taco's Food**.

Este proyecto forma parte de un ecosistema compuesto por una aplicación móvil para comensales (Flutter), un backend basado en Spring Boot y este panel administrativo utilizado por el personal de la taquería.

---

## 📖 Descripción

El objetivo del sistema es facilitar la administración diaria de la taquería mediante una interfaz intuitiva que permita:

- Consultar pedidos en tiempo real.
- Gestionar el estado de las órdenes.
- Administrar la carta de alimentos.
- Gestionar promociones.
- Consultar indicadores operativos.
- Preparar la integración con un backend basado en microservicios.

Actualmente el proyecto utiliza datos simulados (mock) mientras se desarrolla el backend.

---

## 🛠 Tecnologías

- Angular 22
- TypeScript
- HTML5
- CSS3
- Angular Signals
- Angular Router
- Reactive Forms

---

## 📁 Arquitectura

```text
src/
│
├── core/
│
├── features/
│   ├── auth/
│   ├── pedidos/
│   ├── alimentos/
│   ├── categorias/
│   ├── promociones/
│   └── dashboard/
│
├── layout/
│
├── shared/
│
└── assets/
```

La arquitectura está basada en **Feature First**, permitiendo que cada módulo evolucione de forma independiente.

---

## 🚀 Funcionalidades implementadas

### Autenticación

- Login administrativo.
- Validación simulada.
- Persistencia de sesión.
- Protección de rutas.
- Cierre de sesión.

### Panel administrativo

- Sidebar responsive.
- Topbar.
- Navegación protegida.
- Componentes reutilizables.

### Gestión de pedidos

- Visualización de pedidos.
- Cambio de estados.
- Promoción 2x1 para tacos al pastor.
- Comentarios del cliente.
- Dirección de entrega.
- Simulación de llegada de nuevos pedidos.
- Notificación visual y sonora.

---

## 🚧 Funcionalidades en desarrollo

- Dashboard operativo.
- Gestión de alimentos.
- Gestión de categorías.
- Gestión de promociones.
- Detalle completo del pedido.
- Integración con Spring Boot.
- WebSockets para pedidos en tiempo real.
- Autenticación JWT.

---

## 📌 Reglas de negocio implementadas

- Pedido mínimo de alimentos: **$200 MXN**.
- Cargo de servicio: **$20 MXN**.
- Promoción **2x1** exclusiva para tacos al pastor.
- La cantidad mostrada para cocina corresponde a la cantidad real que debe prepararse.
- Gestión del estado del pedido durante todo su ciclo de vida.

---

## 🔄 Flujo principal

```text
Login

↓

Pedidos recibidos

↓

Aceptar pedido

↓

En preparación

↓

Listo

↓

Enviado

↓

Entregado
```

---

## 📱 Ecosistema del proyecto

Este panel administrativo forma parte de un proyecto más amplio compuesto por:

- Aplicación móvil Flutter para clientes.
- Backend desarrollado con Spring Boot.
- Panel administrativo Angular.

Todos los proyectos compartirán el mismo modelo de datos para facilitar su integración.

---

## 👨‍💻 Autor

**Luis Alberto Molina**

Proyecto desarrollado con fines académicos y como propuesta de digitalización para la taquería **Don Taco's Food**.