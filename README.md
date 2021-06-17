## Trabajo Práctico Arquitectura Web 2021

---

<br>

#### ESTUDIANTE
- Qiyin Li


<br>

#### Descripción del negocio
Sistema de gestión de ventas para negocios que trabajan con comisiones en el cuál se podrán cargar vendedores, productos y ventas y luego se calcularán automáticamente las comisiones.

Principales funciones:
- Crear, eliminar y modificar vendedores usuarios
- Crear, eliminar y modificar productos entrenamientos
- Obtener comisiones de un vendedor 
- Reportes mensuales de comisiones

<br>

#### Endpoints
|Método|Endpoint|Body|Status|
|---|---|---|---|
|GET|/users|N/A|Done
|GET|/users/:id|N/A|Done
|POST|/users|{ email, firstName, lastName, document}|Done
|PUT|/users/:id|{ email, firstName, lastName, document}|Done
|DELETE|/users/:id|N/A|Done
|GET|/products|N/A|Done
|GET|/products/:id|N/A|Done
|POST|/products|{ name, description, time }|Done
|PUT|/products/:id|{ name, description, time }|Done
|PATCH|/products/:id|{ name, description, time }|Done
|DELETE|/products/:id|N/A|Done